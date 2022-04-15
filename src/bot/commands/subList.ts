import { Message, MessageEmbed } from 'discord.js';
import db from '~src/utils/db';

/**
 * list all subbed channel
 */
export const subList = async (msg: Message<boolean>) => {
  const guild = await db.guild.findFirst({
    where: {
      id: msg.guildId!,
    },
  });

  const allowedChannelIds = guild!.channelIds;

  /**
   * transform channel ids into names
   */
  const allowedChannelNames = await Promise.all(
    allowedChannelIds.map(async (id) => msg.guild!.channels.cache.get(id)!.name)
  );

  const channelIdsDescription = allowedChannelNames.reduce(
    (p, c) => `${p}\n- ${c}`,
    allowedChannelNames.length === 0 ? 'Seems empty right now...' : '- '
  );

  const listEmbed = new MessageEmbed({
    title: 'List of channel subscribing',
    description: channelIdsDescription,
  });

  await msg.channel.send({
    embeds: [listEmbed],
  });
};
