import { Command } from 'commander';
import { EzBackend} from './ezbackend';

export { EzBackend} from './ezbackend'
export type {IEzbConfig, IEzbPlugin, IEzbPlugins} from './ezbackend'

const program = new Command()

program.command('start')
.description("Start the ezbackend locally")
.action((options) => EzBackend.start())

program.parse(process.argv)


