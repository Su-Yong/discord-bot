/* eslint-disable no-unused-vars */

import Command from '../command';

import * as CommandManager from '../command-manager';
import { User, Channel, Message, APIMessage, MessageOptions } from 'discord.js';

import * as Language from '../../language';
import { Parameter, ParameterType } from '../parameter';
import { Permission } from '../permission';
import { CommandExecutor } from '../command-executor';

const language = Language.getLocale();

/* eslint-enable no-unused-vars */

function getHelpString (message: Message, command: Command): string {
  const names = command.names.map((name) => language.format('command.format.usage.name', name)).join(' ');
  const head = language.format('command.format.usage.head', names, command.description)
  const executors = command.executors.map((executor) => {
    const shape = executor.shape.map((element) => `<${element.toString()}>`).join(' ');

    return language.format('command.format.usage.executor', command.names[0], shape, executor.description);
  });
  

  return head + '\n' + executors.join('\n');
}

function helpAll (message: Message) {
  const result = CommandManager.getAll().map((command) => getHelpString(message, command));

  message.reply('\n' + result.join('\n\n'));
}

function help (message: Message, name: string) {
  const result = getHelpString(message, CommandManager.get(name));

  message.reply('\n' + result);
}

export class HelpCommand extends Command {
  constructor () {
    super({
      names: ['help', '도움', '도움말', 'ㄷㅇ', 'ㄷㅇㅁ'],
      description: language.format('command.help.description.help'),
      permission: Permission.GUEST
    });

    super.registerExecutor(new CommandExecutor({
      executor: helpAll,
      shape: [],
      description: language.format('command.help.description.helpall')
    }));
    super.registerExecutor(new CommandExecutor({
      executor: help,
      shape: [ParameterType.STRING],
      description: language.format('command.help.description.helpsome')
    }));
  }
}

export default HelpCommand;
