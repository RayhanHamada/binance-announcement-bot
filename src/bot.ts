import { ChannelTypes, createApp } from 'discordoo';
import { botToken } from './constants';

const client = createApp(botToken).build();

client.on('ready', async (context) => {
  // write on ready

  let textChannel = await context.client.channels.cache.get('text-channel');

  if (!textChannel) return;

  if (textChannel.type === ChannelTypes.GUILD_TEXT) {
  }
});

client.start().then((client) => {
  console.log(`client has started`);
});
