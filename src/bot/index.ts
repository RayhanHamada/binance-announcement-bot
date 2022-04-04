import { Client, ClientOptions } from 'discord.js';
import { onGuildCreate, onMessageCreate, onReady } from './events';

const options: ClientOptions = {
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: ['GUILDS', 'GUILD_MESSAGES'],
};

const bot = new Client(options);

bot.on('ready', onReady);
bot.on('guildCreate', onGuildCreate);
bot.on('messageCreate', onMessageCreate);

export default bot;
