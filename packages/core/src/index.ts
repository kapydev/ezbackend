import path from "path";

type IEzbPlugin = () => void;

interface IEzbConfig {
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

  constructor() {
    this.plugins = {
      preInit: [],
      init: () => {},
      postInit: [],
      preHandler: [],
      handler: () => {},
      postHandler: [],
      preRun: [],
      run: () => {},
      postRun: [],
    };
  }

  public static initializeApp() {
    if (!EzBackend.instance) {
      EzBackend.instance = new EzBackend();
    }
  }

  public static app(): EzBackend {
    EzBackend.initializeApp();
    return EzBackend.instance;
  }

  public static start(): void {
    //TODO: Figure out why its not a recursive deadly loop
    const ezb = EzBackend.app();

    //LOAD PLUGINS FROM CONFIG
    //TODO: Allow changing of config path, or default config if none
    const customConfigPath = path.join(process.cwd(), ".ezb/config.ts");

    //TODO: Error handling for wrong format of config.ts
    const customConfigs: IEzbConfig = require(customConfigPath).default;
    customConfigs.plugins.forEach((pluginName) => {
      require(pluginName);
    });

    const plugins = ezb.plugins;

    plugins.preInit.forEach((plugin) => {
      plugin();
    });

    plugins.init();

    plugins.postInit.forEach((plugin) => {
      plugin();
    });

    plugins.preHandler.forEach((plugin) => {
      plugin();
    });

    plugins.handler();

    plugins.postHandler.forEach((plugin) => {
      plugin();
    });

    plugins.preRun.forEach((plugin) => {
      plugin();
    });

    plugins.run();

    plugins.postRun.forEach((plugin) => {
      plugin();
    });
  }
}

EzBackend.start();
