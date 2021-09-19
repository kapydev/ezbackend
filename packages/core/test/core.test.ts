import { describe, it, expect } from "@jest/globals";
import exp from "constants";
import { App } from "../src";

interface Root {
  rootVar: string
}

interface SubApp {
  subApp1Var: string
}

interface SubApp2 {
  subApp2Var: string
}

interface NullOpts {

}
describe("Default Behaviour", () => {
  it("Plugins run in order", async () => {
    const app = new App()
    const arr = [];
    app.setInit('init', async (instance, opts) => {
      arr.push(1);
    })
    app.setHandler('handler', async (instance, opts) => {
      arr.push(2);
    })
    app.setRun('run', async (instance, opts) => {
      arr.push(3);
    })
    await app.start()

    expect(arr).toEqual([1, 2, 3]);
  });

  it("Plugins in sub app run in order", async () => {
    const app = new App()
    const subApp = new App()
    const arr = [];
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


});
