import bot from './bot';
import { botToken } from './constants';

bot.login(botToken).then(() => {
  console.log(`start bot`);
});
