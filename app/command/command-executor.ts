/* eslint-disable no-unused-vars */
import { Parameter, ParameterType } from './parameter';
import { Message } from 'discord.js';
/* eslint-enable no-unused-vars */

type Executor = (messageData: Message, ...parameters: any[]) => any;

export class CommandExecutor {
  executor: Executor;
  shape: ParameterType[];
  description: string;

  constructor (params: { executor: Executor, shape: ParameterType[], description: string }) {
    this.executor = params.executor;
    this.shape = params.shape;
    this.description = params.description;
  }

  validateParameter (parameters: Parameter[]) {
    const types = parameters.map((parameter: Parameter) => parameter.type);

    if (types.length === this.shape.length) {
      return types.every((type, i) => type === this.shape[i])
    }

    return false;
  }

  execute (messageData: Message, parameters: Parameter[]): any {
    if (this.validateParameter(parameters)) {
      return this.executor(messageData, ...parameters.map((parameter) => parameter.value));
    }

    return new Error('Cannot execute command becuase parameters do not match');
  }
}
