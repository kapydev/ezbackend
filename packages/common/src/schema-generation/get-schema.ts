import { createProgram, createParser, SchemaGenerator, createFormatter, SubNodeParser, BaseType, Context, ReferenceType, Config } from "ts-json-schema-generator"
import { EzError, ezWarning } from "@ezbackend/utils";
import fs from 'fs'
import path from 'path'
import { isEqual } from "lodash";
import dedent from "dedent-js";

// URGENT TODO: Figure out where is the actual tsconfig.json and src/index.ts
const entryPoint = "src/index.ts"

// TODO: If we can share the AST with ts-node-dev we can probably save alot on the restart time

class MyCustomParser implements SubNodeParser {
  supportsNode(node: any): boolean {
    if (node.kind === 211) {
      return true
    }
    return false
  }

  createType(node: any, context: Context, reference?: ReferenceType): BaseType | undefined {
    return undefined
  }
}

// TODO: Maybe reorganise all constants to a standard location. Not sure if it will be better or just more confusing
const DEFAULT_ENTRY_POINT = path.join('src/index.ts')
const DEFAULT_TSCONFIG_PATH = path.join('tsconfig.json')

// URGENT TODO: Make this configurable in app.start() as well
function _createSchemaGenerator(config: Config = {}) {
  const finalConfig = {...config}
  if (!finalConfig.path) {
    const entryPoint = process.env.ENTRY_POINT_PATH || DEFAULT_ENTRY_POINT
    if (fs.existsSync(entryPoint)) {
      finalConfig.path = entryPoint
    } else {
      // TODO: More complete warning message
      ezWarning(`TS entrypoint not explicitly defined, and ${DEFAULT_ENTRY_POINT} does not exist, types being searched from tsconfig instead`)
    }
  }

  if (!finalConfig.tsconfig) {
    const tsConfigPath = process.env.TS_CONFIG_PATH || DEFAULT_TSCONFIG_PATH
    if (fs.existsSync(tsConfigPath)) {
      finalConfig.tsconfig = tsConfigPath
    } else {
      // TODO: More complete warning message
      ezWarning(`tsconfig not explicitly defined, and ${DEFAULT_TSCONFIG_PATH} does not exist, using ts-json-schema-generator default tsconfig`)
    }
  }

  const program = createProgram(finalConfig)

  const parser = createParser(program, finalConfig, (internalParser) => {
    internalParser.addNodeParser(new MyCustomParser())
  })

  const formatter = createFormatter(finalConfig)

  const generator = new SchemaGenerator(program, parser, formatter, finalConfig)

  return generator
}

// Memoization here may result in unexpected user behaviour during testing when code under test changes.
// TODO: Reflect this behaviour in documentation
export const createSchemaGenerator = (config: Config = {}) => {

  const configClone = {...config}

  if (createSchemaGenerator.cache === undefined) {
    createSchemaGenerator.cache = new WeakMap()
    createSchemaGenerator.cache.set(configClone, _createSchemaGenerator(configClone)) // This relies on config being a shallow object
  }

  if (!createSchemaGenerator.cache.has(configClone)) {
    // TODO: Better error message
    throw new EzError(
      "Multiple ts-json-schema-generator configs detected",
      dedent`You can only use a single ts-json-schema-generator config, meaning a single entrypoint, single tsconfig, etc`)
  }

  return createSchemaGenerator.cache.get(configClone) as SchemaGenerator
}

createSchemaGenerator.cache = undefined as WeakMap<Config,SchemaGenerator> | undefined

createSchemaGenerator.clear = () => {
  createSchemaGenerator.cache = undefined
}

export function getSchemaOrUndefined(schema: Function) {
  const schemaGenerator = createSchemaGenerator()
  if (typeof schema !== 'function' || schema?.name === undefined) {
    return undefined
  }
  let jsonSchema
  const type = schema.name
  try {
    jsonSchema = schemaGenerator.createSchema(type).definitions?.[type]
  } catch (e: any) {
    if (e.type) {
      ezWarning(`Unable to auto generate docs for type ${e.type}. Ensure it is a class and exported from the main entrypoint (${entryPoint}).`)
    } else {
      throw e
    }
  }
  return jsonSchema
}