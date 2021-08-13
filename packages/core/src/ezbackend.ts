import path from "path";
import fs from "fs";
import avvio from "avvio";

export type IEzbPlugin = avvio.Plugin<unknown, EzBackend>;

export interface IEzbConfig {
  plugins: Array<string>;
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

  public static async start() {

    //LOAD PLUGINS FROM CONFIG
    //TODO: Allow changing of config path, or default config if none
    const customConfigPath = path.join(process.cwd(), ".ezb/config.ts");

    //TODO: Error handling for wrong format of config.ts

    if (fs.existsSync(customConfigPath)) {
      const customConfigs: IEzbConfig = require(customConfigPath).default;
      customConfigs.plugins.forEach((pluginName) => {
        require(pluginName);
      });
    }

    EzBackend.manager.use((ezb, opts, cb) => {
      const plugins = ezb.plugins;

      plugins.preInit.forEach((plugin) => {
        ezb.use(plugin, opts);
      });

      ezb.use(plugins.init, opts);

      plugins.postInit.forEach((plugin) => {
        ezb.use(plugin, opts);
      });

      plugins.preHandler.forEach((plugin) => {
        ezb.use(plugin, opts);
      });

      ezb.use(plugins.handler, opts);

      plugins.postHandler.forEach((plugin) => {
        ezb.use(plugin, opts);
      });

      plugins.preRun.forEach((plugin) => {
        ezb.use(plugin, opts);
      });

      ezb.use(plugins.run, opts);

      plugins.postRun.forEach((plugin) => {
        ezb.use(plugin, opts);
      });
      cb();
    });

    EzBackend.manager.start();
    await EzBackend.manager.ready();
    return;
  }
}
