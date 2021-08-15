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
  entryPoint?: string;
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
    let customConfigs: IEzbConfig | undefined;

    const customConfigPath =
      configPath ?? path.resolve(process.cwd(), ".ezb/config.ts");

    if (fs.existsSync(customConfigPath)) {
      customConfigs = require(customConfigPath).default;
      customConfigs.plugins.forEach((pluginName) => {
        require(pluginName);
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
        ezb.use(plugin, customConfigs);
      });

      ezb.use(plugins.init, customConfigs);

      plugins.postInit.forEach((plugin) => {
        ezb.use(plugin, customConfigs);
      });

      plugins.preHandler.forEach((plugin) => {
        ezb.use(plugin, customConfigs);
      });

      ezb.use(plugins.handler, customConfigs);

      plugins.postHandler.forEach((plugin) => {
        ezb.use(plugin, customConfigs);
      });

      plugins.preRun.forEach((plugin) => {
        ezb.use(plugin, customConfigs);
      });

      ezb.use(plugins.run, customConfigs);

      plugins.postRun.forEach((plugin) => {
        ezb.use(plugin, customConfigs);
      });
      cb();
    });


    EzBackend.manager.start();
    await EzBackend.manager.ready();
    return;
  }
}
