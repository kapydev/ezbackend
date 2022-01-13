import { createProgram, createParser, SchemaGenerator, createFormatter, SubNodeParser, BaseType, Context, ReferenceType, Config } from "ts-json-schema-generator"
import { EzError, ezWarning } from "@ezbackend/utils";
import fs from 'fs'
import path from 'path'
import dedent from "dedent-js";
import { JSONSchema7Definition, JSONSchema7Type } from "json-schema";
import Ajv from 'ajv'


// TODO: If we can share the AST with ts-node-dev we can probably save alot on the restart time
// TODO: Maybe reorganise all constants to a standard location. Not sure if it will be better or just more confusing
const DEFAULT_ENTRY_POINT = path.join('src/index.ts')
const DEFAULT_TSCONFIG_PATH = path.join('tsconfig.json')
const DEFAULT_SCHEMA_DIR = path.join('schemas')

function getEntryPoint() {
  return process.env.ENTRY_POINT_PATH || DEFAULT_ENTRY_POINT
}

function getTsConfigPath() {
  return process.env.TS_CONFIG_PATH || DEFAULT_TSCONFIG_PATH
}

function getSchemaDir() {
  return process.env.SCHEMA_DIR || DEFAULT_SCHEMA_DIR
}

function getSchemaFileName(schemaString: string) {
  return `${schemaString}.json`
}

// URGENT TODO: Make paths and such configurable in app.start() as well
function _createSchemaGenerator(config: Config = {}) {
  const finalConfig = { ...config }
  if (!finalConfig.path) {
    const entryPoint = getEntryPoint()
    if (fs.existsSync(entryPoint)) {
      finalConfig.path = entryPoint
    } else {
      // TODO: More complete warning message
      ezWarning(`TS entrypoint not explicitly defined, and ${DEFAULT_ENTRY_POINT} does not exist, types being searched from tsconfig instead`)
    }
  }

  if (!finalConfig.tsconfig) {
    const tsConfigPath = getTsConfigPath()
    if (fs.existsSync(tsConfigPath)) {
      finalConfig.tsconfig = tsConfigPath
    } else {
      // TODO: More complete warning message
      ezWarning(`tsconfig not explicitly defined, and ${DEFAULT_TSCONFIG_PATH} does not exist, using ts-json-schema-generator default tsconfig`)
    }
  }

  const program = createProgram(finalConfig)

  const parser = createParser(program, finalConfig, (internalParser) => {
    // In case we need custom parsing functionality
  })

  const formatter = createFormatter(finalConfig)

  const generator = new SchemaGenerator(program, parser, formatter, finalConfig)

  return generator
}



// Memoization here may result in unexpected user behaviour during testing when code under test changes.
// TODO: Reflect this behaviour in documentation
export function createSchemaGenerator(config: Config = {}) {

  const configClone = { ...config }
  const configKey = JSON.stringify(configClone) // This relies on config being JSON parsable

  if (createSchemaGenerator.cache === undefined) {
    createSchemaGenerator.cache = {}
    createSchemaGenerator.cache[configKey] = _createSchemaGenerator(configClone)
  }

  if (!createSchemaGenerator.cache[configKey]) {
    // TODO: Better error message
    throw new EzError(
      "Multiple ts-json-schema-generator configs detected",
      dedent`You can only use a single ts-json-schema-generator config, meaning a single entrypoint, single tsconfig, etc`)
  }

  return createSchemaGenerator.cache[configKey] as SchemaGenerator
}

createSchemaGenerator.cache = undefined as { [key: string]: SchemaGenerator } | undefined

createSchemaGenerator.clear = () => {
  createSchemaGenerator.cache = undefined
}

export function saveSchema(schema: JSONSchema7Definition, type: string) {
  const schemaString = JSON.stringify(schema, null, 2)
  const outputDir = getSchemaDir()
  const outputPath = path.join(outputDir, getSchemaFileName(type))
  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(outputPath, schemaString)

}

function getSchemaDynamic(schemaName: string) {
  let jsonSchema
  const schemaGenerator = createSchemaGenerator()
  try {
    jsonSchema = schemaGenerator.createSchema(schemaName).definitions?.[schemaName]
    if (jsonSchema) saveSchema(jsonSchema, schemaName)
  } catch (e: any) {
    if (e.type) {
      ezWarning(`Unable to auto generate docs for type ${e.type}. Ensure it is a class and exported from the main entrypoint ${getEntryPoint()}`)
    } else {
      throw e
    }
  }
  return jsonSchema
}

function getSchemaStatic(schemaName: string) {
  const schemaDir = getSchemaDir()
  try {
    const schemaFilePath = path.join(schemaDir, getSchemaFileName(schemaName))
    // TODO: Consider the safety of this function, I think schemas are read using `eval` by fastify for improved performance
    // A possible path to hack this is file upload to the schema directory by tricking the system (Somehow) and then putting arbitrary code for execution here
    // Using ajv to meta validate the schema may be able to overcome this, because it `evals` the meta-json-schema to check if the unsafe schema is safe. However to be fully sure will have to double check the ajv source code
    const jsonSchemaString = fs.readFileSync(schemaFilePath, {encoding:'utf-8'})
    const jsonSchema = JSON.parse(jsonSchemaString)
    const ajv = new Ajv()
    if (ajv.validateSchema(jsonSchema)) {
      return jsonSchema
    } else {
      return undefined
    }
  } catch {
    ezWarning(`Could not find static json schema for type ${schemaName}`)
    return undefined
  }
}

// URGENT TODO: Allow setting NODE_ENV in app.start()
export function getSchemaOrUndefined(schema: Function) {
  if (typeof schema !== 'function' || schema?.name === undefined) {
    return undefined
  }

  const schemaName = schema.name

  if (process.env.NODE_ENV === 'production') {
    return getSchemaStatic(schemaName)
  } else {
    return getSchemaDynamic(schemaName) ?? getSchemaStatic(schemaName)
  }
}