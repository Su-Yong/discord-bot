/* eslint-disable no-unused-vars */

import { HelpCommand } from './commands/help-command';
import { TestCommand } from './commands/test-command';
import { ConnectCommand } from './commands/connect-command';
import Command from './command';

/* eslint-enable no-unused-vars */

const commands = [
  new HelpCommand(),
  new TestCommand(),
  new ConnectCommand()
];

function exist (name: string): boolean {
  return commands.some(
    (command) => command.names.some(
      (commandName: string) => commandName === name
    )
  );
}

function get (name: string): Command {
  return commands.filter(command => command.names.some((e: string) => e === name))[0];
}

function getAll (): Command[] {
  return commands;
}

export {
  exist,
  get,
  getAll
};
