import { Message } from 'discord.js';
import db from '~src/utils/db';

export const unSubHere = async (msg: Message<boolean>) => {
  const foundGuild = await db.guild.findFirst({
    where: {
      id: msg.guildId!,
    },
  });

  /**
   * return if channel not subscribing
   */
  if (!foundGuild!.channelIds.includes(msg.channelId)) {
    await msg.channel.send('This channel not subscribing to the announcement');

    return;
  }

  /**
   * delete channelId if subscribing
   */
  await db.guild
    .update({
      where: {
        id: msg.guildId!,
      },
      data: {
        channelIds: {
          set: foundGuild?.channelIds.filter((id) => msg.channelId !== id),
        },
      },
    })
    .then(async (guild) => {
      /**
       * send response
       */
      await msg.channel.send(
        'Got it. This channel already unsubbed from the announcement'
      );
      return;
    });
};
