import { describe, it, expect } from "@jest/globals";
import { App, PluginScope } from "../src";

describe("Default Behaviour", () => {
  it("Plugins run in order", async () => {
    const app = new App()
    const arr: Array<number> = [];
    app.setPreInit('preInit', async (instance, opts) => {
      arr.push(1);
    })
    app.setInit('init', async (instance, opts) => {
      arr.push(2);
    })
    app.setPostInit('postInit', async (instance, opts) => {
      arr.push(3);
    })
    app.setPreHandler('preHandler', async (instance, opts) => {
      arr.push(4);
    })
    app.setHandler('handler', async (instance, opts) => {
      arr.push(5);
    })
    app.setPostHandler('postHandler', async (instance, opts) => {
      arr.push(6);
    })
    app.setPreRun('preRun', async (instance, opts) => {
      arr.push(7);
    })
    app.setRun('run', async (instance, opts) => {
      arr.push(8);
    })
    app.setPostRun('postRun', async (instance, opts) => {
      arr.push(9);
    })
    await app.start()

    expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("Plugins in sub app run in order", async () => {
    const app = new App()
    const subApp = new App()
    const arr: Array<number> = [];
    app.setInit('init', async (instance, opts) => {
      arr.push(1);
    })
    app.setHandler('handler', async (instance, opts) => {
      arr.push(2);
    })
    app.setRun('run', async (instance, opts) => {
      arr.push(3);
    })
    subApp.setInit('sub_init', async (instance, opts) => {
      arr.push(1.5)
    })
    app.addApp('subApp', subApp)
    await app.start()

    expect(arr).toEqual([1, 1.5, 2, 3]);
  })

  it("Encapsulation allows access to only parents", async () => {
    const app = new App()
    const subApp = new App()
    const subApp2 = new App()

    app.addApp('subApp', subApp)
    app.addApp('subApp2', subApp2)

    app.setInit('init', async (instance, opts) => {
      instance.rootVar = 'rootVar'
    })

    subApp.setInit('init', async (instance, opts) => {
      instance.subApp1Var = 'subApp1Var'
      expect(instance.rootVar).toEqual('rootVar')
      expect(instance.subApp2Var).toEqual(undefined)
    })

    subApp2.setInit('init', async (instance, opts) => {
      instance.subApp2Var = 'subApp2Var'
      expect(instance.rootVar).toEqual('rootVar')
      expect(instance.subApp1Var).toEqual(undefined)
    })

    await app.start()
  })

  it("An app should not be able to have 2 parents", async () => {
    const app1 = new App()
    const app2 = new App()
    const childApp = new App()

    let errored

    app1.addApp(childApp)
    try {
      app2.addApp(childApp)
    } catch (e) {
      expect(e).toMatchSnapshot()
      errored = true
    }

    expect(errored).toBe(true)
  })

  it("addApp syntax must be strictly followed", () => {

    let errored
    const app1 = new App()
    try {
      //@ts-ignore
      app1.addApp("randomString", "randomString", {})
    } catch (e) {
      expect(e).toMatchSnapshot()
      errored = true
    }

    expect(errored).toBe(true)


  })

  it("Encapsulation allows access scope of previous lifecycle hooks", async () => {
    const app = new App()
    const subApp = new App()
    const subApp2 = new App()

    app.setInit('init', async (instance, opts) => {
      instance.rootVar = 'rootVar'
    })

    subApp.setInit('init', async (instance, opts) => {
      instance.subApp1Var = 'subApp1Var'
    })

    subApp.setHandler('handler', async (instance, opts) => {
      expect(instance.rootVar).toEqual('rootVar')
      expect(instance.subApp1Var).toEqual('subApp1Var')
      expect(instance.subApp2Var).toEqual(undefined)
    })

    subApp2.setInit('init', async (instance, opts) => {
      instance.subApp2Var = 'subApp2Var'
    })
    app.addApp('subApp', subApp)
    app.addApp('subApp2', subApp2)
    await app.start()
  })

  it("Using the PARENT scope should allow parents to change encapsulated children variables", async () => {
    const app = new App()
    const subApp = new App()

    subApp.scope = PluginScope.PARENT

    app.addApp(subApp)

    subApp.setInit("Create Variable", async (instance, opts) => {
      instance.myChildVar = "Hello"
    })

    app.setHandler("Check access to child var", async (instance, opts) => {
      expect(instance.myChildVar).toBe("Hello")
    })

    await app.start()


  })

  it("Two child apps should not have the same name", async () => {
    const app = new App()
    const child1 = new App()
    const child2 = new App()

    let errored = false

    app.addApp("child", child1)
    try {
      app.addApp("child", child2)
    } catch (e) {
      expect(e).toMatchSnapshot()
      errored = true
    }

    expect(errored).toBe(true)

  })

  it("Should be able to get app by name", async () => {
    const app = new App()
    const child1 = new App()

    app.addApp("child", child1)

    const theChild = app.getApp("child")

    expect(theChild).toBe(child1)

  })

  it("Should be able to add plugins with undefined prototypes, which occurs in compiled JS code", async () => {
    const app = new App()

    const myFunc = async (instance: any, opts: any) => { }

    //@ts-ignore
    myFunc.prototype = undefined

    app.setInit("MyFunc", myFunc)

    await app.start()


  })

  describe("Hooks", () => {
    let app: App
    let flag = false
    beforeAll(async () => {
      app = new App()
      app.setInit("Set Flag", async (instance, opts) => {
        flag = true
      })
    })

    it("Setting a hook twice should throw an error", () => {
      let errored = false
      try {
        app.setInit("Set Flag", async (instance, opts) => {
          flag = true
        })
      } catch (e) {
        expect(e).toMatchSnapshot()
        errored = true
      }

      expect(errored).toBe(true)

    })
    it("Removing a hook by name should work", () => {
      app.removeHook("_init", "Set Flag")

      app.start()

      expect(flag).toBe(false)
    })

    it("Removing a non-existent hook should throw an error", () => {
      let errored = false
      try {
        app.removeHook("_handler", "non-existent")
      } catch (e) {
        expect(e).toMatchSnapshot()
        errored = true
      }

      expect(errored).toBe(true)


    })


  })


  test.todo("Running app.start() twice should return an EzError, not a normal error")
  test('Running app.start() twice should error', async () => {
    const app = new App()
    await app.start()
    let errored = false
    try {
      await app.start()
    } catch (e) {
      errored = true
    }
    expect(errored).toBe(true)
  })

  describe("addApp overloads should function as expected", () => {
    it("Just app", async () => {
      const app = new App()
      const subApp = new App()
      const arr: Array<number> = [];
      app.setInit('init', async (instance, opts) => {
        arr.push(1);
      })
      app.addApp(subApp)
      await app.start()

      expect(arr).toEqual([1]);
    })

    it("Just app and Opts", async () => {
      const opts = { opts: "my custom option" }
      const app = new App()
      const subApp = new App()
      const arr: Array<number> = [];
      app.setInit('init', async (instance, opts) => {
        arr.push(1);
      })
      app.addApp(subApp, opts)
      await app.start()

      expect(arr).toEqual([1]);
      expect(subApp.opts).toEqual(opts)
    })

    it("Just name and app", async () => {
      const app = new App()
      const subApp = new App()
      const arr: Array<number> = [];
      app.setInit('init', async (instance, opts) => {
        arr.push(1);
      })
      app.addApp("subApp", subApp)
      await app.start()

      expect(arr).toEqual([1]);
    })

    it("Name, App and Opts", async () => {
      const opts = { opts: "my custom option" }
      const app = new App()
      const subApp = new App()
      const arr: Array<number> = [];
      app.setInit('init', async (instance, opts) => {
        arr.push(1);
      })
      app.addApp("subApp", subApp, opts)
      await app.start()

      expect(arr).toEqual([1]);
      expect(subApp.opts).toEqual(opts)

    })
  })


});
