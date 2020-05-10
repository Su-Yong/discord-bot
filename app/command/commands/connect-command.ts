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

function connect (message: Message) {
  message.channel.send('니얼졸ㅋㅋ');
}

export class ConnectCommand extends Command {
  constructor () {
    super({
      names: ['connect', '연결', 'ㅇㄱ'],
      description: language.format('command.connect.description'),
      permission: Permission.MEMBER
    });

    super.registerExecutor(new CommandExecutor({
      executor: connect,
      shape: [],
      description: 'connect'
    }));
  }
}
