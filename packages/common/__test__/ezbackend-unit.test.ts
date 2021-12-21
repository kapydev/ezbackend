import { EzBackend } from "../src"

const defaultConfig = {
  port: 3001,
  backend: {
    fastify: {
      logger: false
    },
    typeorm: {
      database: ':memory:'
    }
  }
}
describe("EzBackend Unit tests", () => {
  test.todo("Logger should be pretty printing in the correct format")

  test.todo("There should be a warning if a user tries to define entities outside of the EzModel")

  test("Close command should gracefully stop the server", async () => {
    const app = new EzBackend()

    await app.start(defaultConfig)

    await app.close()
  })
})
