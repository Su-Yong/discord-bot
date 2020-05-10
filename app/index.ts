// eslint-disable-next-line no-unused-vars
import { Client, Message } from 'discord.js';

import * as Command from './command';
import { config } from './config';

const client = new Client();

export function init () {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on('message', async (message: Message) => {
    let content = message.content;

    if (content.substring(0, config.command.indicator.length) === config.command.indicator) {
      content = content.substring(config.command.indicator.length, content.length);

      await Command.execute(message, content);
    }
  });
}

export function start (token: string) {
  client.login(token);
};

export default {
  init,
  start
};
