import * as app from './app';

import Config, { config } from './app/config';

(async () => {
  await Config.init();

  await app.init();
  await app.start(config.bot.token);
})();
