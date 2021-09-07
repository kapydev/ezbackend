import { Repository } from "typeorm";
import { RouteOptions } from "fastify";
import { EzBackend } from "@ezbackend/core";
import { defaultGenerators } from "./default-generators"


interface IAPIGeneratorOpts {
    prefix: string;
}

type IGenerator = (repo: Repository<unknown>) => RouteOptions | Array<RouteOptions>;

interface IGenerators {
    [index: string]: IGenerator;
}

export class APIGenerator {
    repo: Repository<unknown>;
    opts: IAPIGeneratorOpts;
    generators: IGenerators

    private static generators: IGenerators = defaultGenerators;
    
    public static readonly defaultGenerators: IGenerators = defaultGenerators


    public static setGenerator(generatorName: string, generator: IGenerator) {
        APIGenerator.generators[generatorName] = generator;
    }

    public static getGenerators() {
        return APIGenerator.generators;
    }

    constructor(repo: Repository<unknown>, opts: IAPIGeneratorOpts) {
        this.repo = repo;
        this.opts = opts;
        this.generators = APIGenerator.getGenerators();
    }

    public generateRoutes() {
        const ezb = EzBackend.app();
        let that = this;

        Object.entries(this.generators).forEach(([, generator]) => {
            ezb.server.register(
                (server, opts, cb) => {
                    const routes: Array<RouteOptions> = [].concat(generator(this.repo))
                    routes.forEach((route) =>
                        server.route(route)
                    )
                    cb();
                },
                {
                    prefix: that.opts.prefix,
                }
            );
        });
    }
}



