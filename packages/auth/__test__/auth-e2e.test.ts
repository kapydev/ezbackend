//URGENT TODO: Figure out why github actions is throwing req has 'any' type even though locally there is no issue

import { EzBackend } from "@ezbackend/common";
import { EzUser, EzAuth } from "../src"

import dotenv from 'dotenv'
import setCookie from 'set-cookie-parser'

describe("Plugin Registering", () => {

  dotenv.config()

  let app: EzBackend

  const PORT = 8003

  const defaultConfig = {
    port: PORT,
    backend: {
      fastify: {
        logger: false
      },
      typeorm: {
        database: ':memory:'
      }
    },
    auth: {
      google: {
        googleClientId: process.env.GOOGLE_CLIENT_ID!,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        scope: ['profile'],
      }
    }
  }

  beforeEach(async () => {
    app = new EzBackend()

    app.addApp(new EzAuth())

    const user = new EzUser("User", ['google'])

    user.get('/me', async (req, res) => {
      return { user: req.user }
    })

    app.post('/body-to-session', (req, res) => {
      req.session.set('passport', (req.body as any).data)
      res.send()
    })

    app.addApp(user, { prefix: 'user' })

    //Prevent server from starting
    app.removeHook("_run", "Run Fastify Server")

    await app.start(defaultConfig)

  })

  afterEach(async () => {
    await app.close()
  });

  test("Login Route should redirect to google login", async () => {

    const result = await app.inject({
      method: "GET",
      url: "/user/auth/google/login"
    })

    expect(result.statusCode).toBe(302)

    const redirectLocation = result.headers.location

    expect(typeof redirectLocation).toBe('string')

    const redirectUrl = new URL(redirectLocation as string)

    expect(redirectUrl.searchParams.get('response_type')).toMatchInlineSnapshot(`"code"`)
    //This looks wrong
    expect(redirectUrl.searchParams.get('redirect_uri')).toMatchInlineSnapshot(`"http://localhost:80/user/auth/google/callback"`)
    expect(redirectUrl.searchParams.get('scope')).toMatchInlineSnapshot(`"profile email"`)
  })

  describe("Cookie Desrializing", () => {

    test("If user is not logged in it should not return anything", async () => {

      const result = await app.inject({
        method: "GET",
        url: '/user/me'
      })

      expect(result.json()).toMatchObject({ user: null })
    })

    test.todo("If user session is malformed it should return null")

    test("A proper session should hold the user in req.user", async () => {

      //Seed the database
      await app.inject({
        method: "POST",
        url: '/user',
        payload: {
          googleId: '1',
          googleData: {
            name: "Robert"
          }
        }
      })

      const sessionResult = await app.inject({
        method: "POST",
        url: '/body-to-session',
        payload: {
          data: "google-1"
        }
      })


      const cookies = setCookie.parse(
        sessionResult.headers['set-cookie'] as string,
        {
          decodeValues: true
        }
      )


      const result = await app.inject({
        method: "GET",
        url: '/user/me',
        cookies: {
          session: cookies[0].value
        },

      })

      expect(result.json()).toMatchObject({
        user: {
          id: 1,
          googleId: '1',
          googleData:
            { name: 'Robert' }
        }
      })

    })
  })

})