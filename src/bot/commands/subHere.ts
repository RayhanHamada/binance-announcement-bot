import { Message } from 'discord.js';
import db from '~src/utils/db';

/**
 * subscribe to current text channel
 */
export const subHere = async (msg: Message<boolean>) => {
  const foundGuild = await db.guild.findFirst({
    where: {
      id: msg.guildId!,
    },
  });

  /**
   * return if already subbed
   */
  if (foundGuild!.channelIds.includes(msg.channelId)) {
    await msg.channel.send(
      'You already made this channel subscribe to the announcement !'
    );

    return;
  }

  /**
   * push channelId if not exists
   */
  await db.guild
    .update({
      where: {
        id: msg.guildId!,
      },
      data: {
        channelIds: {
          push: msg.channelId,
        },
      },
    })
    .then(async (guild) => {
      /**
       * send response
       */
      await msg.channel.send(
        'Got it. Now this channel would receive information later on'
      );
    })
    .catch(() => {
      console.error('somethings wrong');
    });
};
