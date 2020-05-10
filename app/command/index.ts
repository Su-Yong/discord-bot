/* eslint-disable no-unused-vars */

import * as CommandManager from './command-manager';
import { analyze } from './command-analyzer';
import { User, Message } from 'discord.js';

/* eslint-enable no-unused-vars */

async function execute (messageObject: Message, message: string): Promise<{ result: any }> {
  return new Promise((resolve, reject) => {
    const { name, parameters } = analyze(message);

    if (CommandManager.exist(name)) {
      const command = CommandManager.get(name);

      command.execute(messageObject, parameters).then((result: any) => resolve(result));
    } else {
      reject(new Error(`Cannot find command: ${name}`));
    }
  });
}

export {
  execute
};
