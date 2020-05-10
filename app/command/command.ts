/* eslint-disable no-unused-vars */

import { User, Channel, Message } from 'discord.js';
import { Parameter } from './parameter';

import * as Language from '../language';
import { Permission } from './permission';
import { CommandExecutor } from './command-executor';

const language = Language.getLocale();

/* eslint-enable no-unused-vars */

class Command {
  names: string[];
  description: string;
  permission: Permission;
  executors: CommandExecutor[] = [];

  constructor (
    params: {
      names: string[],
      description: string,
      permission: Permission
    }
  ) {
    this.names = params.names;
    this.description = params.description;
    this.permission = params.permission;
  }

  registerExecutor (executor: CommandExecutor) {
    this.executors.push(executor);
  }

  async execute (message: Message, parameters: Parameter[]) {
    this.executors.forEach((executor, index) => {
      if (executor.validateParameter(parameters)) {
        executor.execute(message, parameters);
      }
    });
  }
}

export default Command;
