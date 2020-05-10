/* eslint-disable no-unused-vars */

import Command from '../command';

import * as CommandManager from '../command-manager';
import { User, Channel, Message, APIMessage, MessageOptions } from 'discord.js';
import { Parameter, ParameterType } from '../parameter';

import * as Language from '../../language';
import { Permission } from '../permission';
import { CommandExecutor } from '../command-executor';

const language = Language.getLocale('ko');

/* eslint-enable no-unused-vars */

function test1 (message: Message) {
  message.channel.send('just test');
}

function test2 (message: Message, path: string) {
  let result = `Cannot find message.${path}`;

  try {
    result = (message as any)[path].toString();
  } catch { }

  message.channel.send(result);
}

function test3 (message: Message, user: User) {
  message.channel.send(`${user.username}'s id is ${user.id}`);
}

export class TestCommand extends Command {
  constructor () {
    super({
      names: ['test', '테스트', 'ㅌㅅㅌ'],
      description: language.format('command.test.description'),
      permission: Permission.OPERATOR
    });

    super.registerExecutor(new CommandExecutor({
      executor: test1,
      shape: [],
      description: 'for test'
    }));
    super.registerExecutor(new CommandExecutor({
      executor: test2,
      shape: [ParameterType.STRING],
      description: 'get message object property'
    }));
    super.registerExecutor(new CommandExecutor({
      executor: test3,
      shape: [ParameterType.USER],
      description: 'input user test'
    }));
  }
}
