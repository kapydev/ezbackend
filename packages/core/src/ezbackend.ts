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
