/* eslint-disable no-unused-vars */

import Command from '../command';

import * as CommandManager from '../command-manager';
import { User, Channel, Message, APIMessage, MessageOptions } from 'discord.js';
import { Parameter, ParameterType } from '../parameter';

import Language from '../../language';
import { config } from '../../config';
import { Permission } from '../permission';
import { CommandExecutor } from '../command-executor';
const language = Language.getLocale();

/* eslint-enable no-unused-vars */

function setLanguage (message: Message, locale: string) {
  if (Language.existLocale(locale)) {
    Language.setDefaultLocale(locale);

    message.reply('\n' + language.format('command.language.output.success'));
  } else {
    message.reply('\n' + language.format('command.language.output.invalid', locale));
  }
}

function listLanguage (message: Message) {
  const list = Language.getAll().map((language) => language.locale);

  message.reply('\n' + language.format('command.language.output.available', list.join(' ')))
}

export class LanguageCommand extends Command {
  constructor () {
    super({
      names: ['language', '언어'],
      description: language.format('command.language.description.language'),
      permission: Permission.GUEST
    });

    super.registerExecutor(new CommandExecutor({
      executor: listLanguage,
      shape: [],
      description: language.format('command.language.description.list')
    }));
    super.registerExecutor(new CommandExecutor({
      executor: setLanguage,
      shape: [ParameterType.STRING],
      description: language.format('command.language.description.change')
    }));
  }
}

export default LanguageCommand;