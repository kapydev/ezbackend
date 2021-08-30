import path from "path";
import fs from "fs";
import avvio from "avvio";

//TODO: Make it not unknown
export type IEzbPlugin = avvio.Plugin<unknown, EzBackend>;

export interface IEzbConfig {
  plugins: Array<string>;
  server?: unknown;
  orm?: unknown;
  port?: number;
  connectionURI?: string;
}

export type IEzbPlugins = {
  preInit: Array<IEzbPlugin>;
  init: IEzbPlugin | null;
  postInit: Array<IEzbPlugin>;
  preHandler: Array<IEzbPlugin>;
  handler: IEzbPlugin | null;
  postHandler: Array<IEzbPlugin>;
  preRun: Array<IEzbPlugin>;
  run: IEzbPlugin | null;
  postRun: Array<IEzbPlugin>;
};

export type IEzPlugin<O> = avvio.Plugin<O,EzPlugin<O>>

export type IEzPlugins<O> = {
  preInit: Array<IEzPlugin<O>>;
  init: IEzPlugin<O> | null;
  postInit: Array<IEzPlugin<O>>;
  preHandler: Array<IEzPlugin<O>>;
  handler: IEzPlugin<O> | null;
  postHandler: Array<IEzPlugin<O>>;
  preRun: Array<IEzPlugin<O>>;
  run: IEzPlugin<O> | null;
  postRun: Array<IEzPlugin<O>>;
};

export class EzPlugin<O> {
  manager: avvio.Avvio<EzPlugin<O>>
  plugins: IEzPlugins<O>

  //TODO: Think of why its not throuwing error when the type passed is not exactly an ezbplugin
  constructor() {
    this.plugins = {
      preInit: [],
      init: async (ezb, opts) => {
      },
      postInit: [],
      preHandler: [],
      handler: async (ezb, opts) => {
      },
      postHandler: [],
      preRun: [],
      run: async (ezb, opts) => {
      },
      postRun: [],
    };
    this.manager = avvio(this)
  }

  public async start(opts?:O) {
  
    this.manager.use(async (ezp, opts) => {
      //URGENT TODO: Error handling when plugin doesnt work
      const plugins = ezp.plugins;

      plugins.preInit.forEach((plugin) => {
        ezp.use(plugin, opts);
        
      });

      ezp.use(plugins.init, opts);


      plugins.postInit.forEach((plugin) => {
        ezp.use(plugin, opts);
      });

      plugins.preHandler.forEach((plugin) => {
        ezp.use(plugin, opts);
      });

      ezp.use(plugins.handler, opts);

      plugins.postHandler.forEach((plugin) => {
        ezp.use(plugin, opts);
      });

      plugins.preRun.forEach((plugin) => {
        ezp.use(plugin, opts);
      });

      ezp.use(plugins.run, opts);

      plugins.postRun.forEach((plugin) => {
        ezp.use(plugin, opts);
      });
    },opts);
    this.manager.start();
    await new Promise<void>(resolve => {
      this.manager.ready((err) => {
        if (err) {
          throw err;
        }
        resolve()
      });
    })

    return;

  }
}

const test = new EzPlugin()
test.plugins.handler = async (ezp,opts) => {
  console.log('hello world')
}
test.plugins.preInit.push(async (ezp,opts) => {
  console.log('before world')
})
test.start()

export class EzBackend {
  plugins: IEzbPlugins;
  config: IEzbConfig;

  private static instance: EzBackend;
  private static manager: avvio.Avvio<EzBackend>;

  //TODO: Think of why its not throuwing error when the type passed is not exactly an ezbplugin
  constructor() {
    this.plugins = {
      preInit: [],
      init: (ezb, opts, cb) => {
        cb();
      },
      postInit: [],
      preHandler: [],
      handler: (ezb, opts, cb) => {
        cb();
      },
      postHandler: [],
      preRun: [],
      run: (ezb, opts, cb) => {
        cb();
      },
      postRun: [],
    };
  }

  public static initializeApp() {
    if (!EzBackend.instance) {
      EzBackend.instance = new EzBackend();
      EzBackend.manager = avvio(EzBackend.app());
    }
  }

  public static app(): EzBackend {
    EzBackend.initializeApp();
    return EzBackend.instance;
  }

  public static async start(configPath?: string) {

    const customConfigPath =
      configPath ?? path.resolve(process.cwd(), ".ezb/config.ts");

    if (fs.existsSync(customConfigPath)) {
      const ezb = EzBackend.app()
      //URGENT TODO: Consider consequences of putting config in singleton. Perhaps make it readonly?
      ezb.config = require(customConfigPath).default;
      ezb.config.plugins.forEach((pluginName) => {
        //URGENT TODO: Load plugins by running load function, instead of polluting environment with every import
        //URGENT TODO: Make sure that for a new user, the plugins required are resolved from his directory, not the ezbackend directory
        const loadedPlugin = require(pluginName);
      });
    }

    

    //LOAD PLUGINS FROM CONFIG
    //TODO: Allow changing of config path, or default config if none

    //TODO: Error handling for wrong format of config.ts

    //TODO: Figure out how to pass in options at top level
    EzBackend.manager.use((ezb, opts, cb) => {
      //URGENT TODO: Error handling when plugin doesnt work
      const plugins = ezb.plugins;

      plugins.preInit.forEach((plugin) => {
        ezb.use(plugin, ezb.config);
        
      });

      ezb.use(plugins.init, ezb.config);


      plugins.postInit.forEach((plugin) => {
        ezb.use(plugin, ezb.config);
      });

      plugins.preHandler.forEach((plugin) => {
        ezb.use(plugin, ezb.config);
      });

      ezb.use(plugins.handler, ezb.config);

      plugins.postHandler.forEach((plugin) => {
        ezb.use(plugin, ezb.config);
      });

      plugins.preRun.forEach((plugin) => {
        ezb.use(plugin, ezb.config);
      });

      ezb.use(plugins.run, ezb.config);

      plugins.postRun.forEach((plugin) => {
        ezb.use(plugin, ezb.config);
      });
      cb();
    });
    EzBackend.manager.start();
    await new Promise<void>(resolve => {
      EzBackend.manager.ready((err) => {
        if (err) {
          throw err;
        }
        resolve()
      });
    })

    return;

  }
}
