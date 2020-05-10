import * as app from './app';

import { config } from './app/config';

(async () => {
  await app.init();
  await app.start(config.bot.token);
})();
