import { Message } from 'discord.js';
import { helpEmbed } from '~src/bot/utils';

/**
 * if the command is unknown
 */
export const unknown = async (msg: Message<boolean>) => {
  await msg.channel.send({
    content:
      "I'm sorry but i'm not understand what you're trying to say. Try one of this commands",
    embeds: [helpEmbed],
  });
};
