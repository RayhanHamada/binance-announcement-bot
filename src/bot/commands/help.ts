import { Message } from 'discord.js';
import { helpEmbed } from '~src/bot/utils';

export const help = async (msg: Message<boolean>) => {
  await msg.channel.send({
    embeds: [helpEmbed],
  });
};
