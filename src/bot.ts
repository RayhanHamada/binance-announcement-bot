import { createApp } from 'discordoo';
import { botToken } from './constants';

const bot = createApp(botToken).build();

bot.on('ready', async (context) => {
  // write on ready
});

export default bot;
