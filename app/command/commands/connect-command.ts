/* eslint-disable no-unused-vars */

import Command from '../command';

import { Message } from 'discord.js';

import Language from '../../language';
import { Permission } from '../permission';
import { CommandExecutor } from '../command-executor';

const language = Language.getLocale();

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

export default ConnectCommand;