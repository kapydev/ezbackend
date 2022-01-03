import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { EzBackend, EzModel, EzBackendOpts, Type, RecursivePartial, diskEngine } from '../../src'
// TODO: Write types for upstream repo and submit PR
// @ts-ignore
import formAutoContent from 'form-auto-content'
import fs from 'fs'
import path from 'path'

const rootDir = path.join(__dirname, '../../../../')

const defaultConfig: RecursivePartial<EzBackendOpts> = {
  backend: {
    fastify: {
      logger: false
    },
    typeorm: {
      database: ":memory:"
    }
  }
}

let app: EzBackend

beforeEach(async () => {
  app = new EzBackend()
})

afterEach(async () => {
  await app.close()

  const tmpPath = path.join(rootDir, './tmp')

  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true })
  }

  // @ts-ignore
  app = undefined
})

describe("Basic Storage Tests", () => {

  it("Should be able to upload a file", async () => {
    const sampleModel = new EzModel("SampleModel", {
      avatar: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })

    await app.start(defaultConfig)

    const imageFilePath = path.join(rootDir, 'favicon.png')

    const form = formAutoContent({
      avatar: fs.createReadStream(imageFilePath)
    })

    const result = await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    expect(result.json().avatar).toEqual(expect.objectContaining({
      destination: expect.any(String),
      fieldname: expect.any(String),
      path: expect.any(String),
      mimetype: expect.any(String),
      size: expect.any(Number),
      encoding: expect.any(String)

    }))
  })

  it("Type casting should work as expected", async () => {
    const sampleModel = new EzModel("SampleModel", {
      name: Type.VARCHAR,
      age: Type.INT,
      isPaidUser: Type.BOOL,
      avatar: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })

    await app.start(defaultConfig)

    const imageFilePath = path.join(rootDir, 'favicon.png')

    const form = formAutoContent({
      name: "Robert",
      age: "23",
      isPaidUser: "true",
      avatar: fs.createReadStream(imageFilePath)
    })

    const result = await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    expect(result.json()).toMatchObject({
      name: "Robert",
      age: 23,
      isPaidUser: true,
    })
  })
  it("Should be able to get a model with the file metadata", async () => {
    const sampleModel = new EzModel("SampleModel", {
      name: Type.VARCHAR,
      age: Type.INT,
      isPaidUser: Type.BOOL,
      avatar: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })

    await app.start(defaultConfig)

    const imageFilePath = path.join(rootDir, 'favicon.png')

    const form = formAutoContent({
      name: "Robert",
      age: "23",
      isPaidUser: "true",
      avatar: fs.createReadStream(imageFilePath)
    })

    // Send the data
    await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    const result = await app.inject({
      method: 'GET',
      url: '/sample-model/1'
    })


    expect(result.json()).toMatchObject({
      name: "Robert",
      age: 23,
      isPaidUser: true,
    })

    expect(result.json().avatar).toEqual(expect.objectContaining({
      destination: expect.any(String),
      fieldname: expect.any(String),
      path: expect.any(String),
      mimetype: expect.any(String),
      size: expect.any(Number),
      encoding: expect.any(String)

    }))


  })
  it("Should be able to download a file", async () => {
    const sampleModel = new EzModel("SampleModel", {
      name: Type.VARCHAR,
      age: Type.INT,
      isPaidUser: Type.BOOL,
      avatar: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })

    await app.start(defaultConfig)

    const imageFilePath = path.join(rootDir, 'favicon.png')

    const form = formAutoContent({
      name: "Robert",
      age: "23",
      isPaidUser: "true",
      avatar: fs.createReadStream(imageFilePath)
    })

    // Send the data
    await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    const result = await app.inject({
      method: 'GET',
      url: '/sample-model/1/file/avatar'
    })

    const data = fs.readFileSync(imageFilePath)
    // NOTE: Don't make the tested file too large for this, the test may then fail on low memory CI integrations
    expect(result.rawPayload).toEqual(data)
  })

  describe("It should be fully configurable", () => {

    let customEngineUsed: boolean

    const customEngine = diskEngine({
      destination: 'tmp/uploads',
      filename: (req, file, cb) => {
        customEngineUsed = true
        return cb(null, file.originalname)
      }
    })
    it("Global Options level", async () => {
      customEngineUsed = false

      const sampleModel = new EzModel("SampleModel", {
        avatar: Type.FILE
      })

      app.addApp(sampleModel, { prefix: 'sample-model' })

      await app.start({
        ...defaultConfig,
        backend: {
          ...defaultConfig.backend,
          storage: {
            engine: customEngine
          }
        },
      })

      const imageFilePath = path.join(rootDir, 'favicon.png')

      const form = formAutoContent({
        avatar: fs.createReadStream(imageFilePath)
      })

      await app.inject({
        method: 'POST',
        url: '/sample-model/multipart',
        ...form
      })
      

      expect(customEngineUsed).toBe(true)
    })

    it("Router Options Level", async () => {
      customEngineUsed = false

      const sampleModel = new EzModel("SampleModel", {
        avatar: Type.FILE
      }, {
        routerOpts: {
          storage: {
            engine: customEngine
          }
        }
      })

      app.addApp(sampleModel, { prefix: 'sample-model' })

      await app.start(defaultConfig)

      const imageFilePath = path.join(rootDir, 'favicon.png')

      const form = formAutoContent({
        avatar: fs.createReadStream(imageFilePath)
      })

      await app.inject({
        method: 'POST',
        url: '/sample-model/multipart',
        ...form
      })

      expect(customEngineUsed).toBe(true)

    })

    it("Default Options should work as intended", async () => {
      customEngineUsed = false

      const sampleModel = new EzModel("SampleModel", {
        avatar: Type.FILE
      })

      app.addApp(sampleModel, { prefix: 'sample-model' })

      await app.start(defaultConfig)

      const imageFilePath = path.join(rootDir, 'favicon.png')

      const form = formAutoContent({
        avatar: fs.createReadStream(imageFilePath)
      })

      await app.inject({
        method: 'POST',
        url: '/sample-model/multipart',
        ...form
      })

      expect(customEngineUsed).toBe(false)
    })
  })
  it("Should throw an error if the file exceeds the maximum allowed size", async () => {
    const sampleModel = new EzModel("SampleModel", {
      avatar: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })

    await app.start({
      ...defaultConfig,
      backend: {
        ...defaultConfig.backend,
        storage: {
          multipartOpts: {
            limits: {
              fileSize: 1024
            }
          }
        }
      },
    })


    const form = formAutoContent({
      avatar: Buffer.alloc(1025)
    })

    const result = await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    expect(result.statusCode).toBe(413)
  })
  it.todo("Should throw an error if the file is not the correct mimetype")

  it("Should allow multiple uploads", async () => {
    const sampleModel = new EzModel("SampleModel", {
      avatar: Type.FILE,
      logo: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })

    await app.start(defaultConfig)

    const imageFilePath = path.join(rootDir, 'favicon.png')

    const form = formAutoContent({
      avatar: fs.createReadStream(imageFilePath),
      logo: fs.createReadStream(imageFilePath)
    })

    const result = await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    expect(result.json().avatar).toEqual(expect.objectContaining({
      destination: expect.any(String),
      fieldname: expect.any(String),
      path: expect.any(String),
      mimetype: expect.any(String),
      size: expect.any(Number),
      encoding: expect.any(String)

    }))

    expect(result.json().logo).toEqual(expect.objectContaining({
      destination: expect.any(String),
      fieldname: expect.any(String),
      path: expect.any(String),
      mimetype: expect.any(String),
      size: expect.any(Number),
      encoding: expect.any(String)

    }))
  })

  it.todo("Should allow for gzip compression")

  it("Should be able to manage compulsory file uploads", async () => {
    const sampleModel = new EzModel("SampleModel", {
      avatar: Type.FILE,
      logo: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })

    await app.start(defaultConfig)

    const imageFilePath = path.join(rootDir, 'favicon.png')

    const form = formAutoContent({
      avatar: fs.createReadStream(imageFilePath),
    })

    const result = await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    expect(result.json()).toMatchObject({
      statusCode: 400,
      error: 'Bad Request',
      message: "data should have required property 'logo'"
    })
  })

  it("Should be able to manage nested data", async () => {
    const sampleModel = new EzModel("SampleModel", {
      avatar: Type.FILE,
      logo: Type.FILE,
      nestedModel: {
        type: Type.ONE_TO_MANY,
        target: "NestedModel",
        inverseSide: "sampleModel"
      }
    })

    const nestedModel = new EzModel("NestedModel", {
      sampleModel: {
        type: Type.MANY_TO_ONE,
        target: "SampleModel",
        inverseSide: "nestedModel"
      },
      secondaryProfilePic: Type.FILE
    })

    app.addApp(sampleModel, { prefix: 'sample-model' })
    app.addApp(nestedModel, { prefix: 'nested-model' })

    await app.start(defaultConfig)

    const imageFilePath = path.join(rootDir, 'favicon.png')

    const form = formAutoContent({
      avatar: fs.createReadStream(imageFilePath),
      logo: fs.createReadStream(imageFilePath),
    })

    const result = await app.inject({
      method: 'POST',
      url: '/sample-model/multipart',
      ...form
    })

    expect(result.json().avatar).toEqual(expect.objectContaining({
      destination: expect.any(String),
      fieldname: expect.any(String),
      path: expect.any(String),
      mimetype: expect.any(String),
      size: expect.any(Number),
      encoding: expect.any(String)

    }))

    expect(result.json().logo).toEqual(expect.objectContaining({
      destination: expect.any(String),
      fieldname: expect.any(String),
      path: expect.any(String),
      mimetype: expect.any(String),
      size: expect.any(Number),
      encoding: expect.any(String)

    }))
  })

  it.todo("Should use streams instead of storing in RAM")

  it.todo("Router option precedence should merge with global options")
})