import { Command } from 'commander';
import { init } from './commands/init';

const program = new Command();
program.name('amanadb').description('AmanaDB Orchestration CLI');

program.command('init').description('Bring up the Fabric network').action(init);

program.parse();