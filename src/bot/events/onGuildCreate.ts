import { Awaitable, Guild, TextChannel } from 'discord.js';
import db from '../../utils/db';

type OnGuildCreate = (client: Guild) => Awaitable<void>;

export const onGuildCreate: OnGuildCreate = async (guild) => {
  const { id } = guild;

  /**
   * get default text channel
   */
  const defaultTextChannel = guild.channels.cache.find(
    (c) =>
      c.type === 'GUILD_TEXT' &&
      c.permissionsFor(guild.me!).has('SEND_MESSAGES')
  ) as TextChannel;

  /**
   * check for existing channel
   */
  const foundGuild = await db.guild.findFirst({
    where: {
      id,
    },
  });

  /**
   * do greetings
   */
  if (foundGuild) {
    /**
     * get allowed channels for guild
     */
    const channelIds = foundGuild.channelIds;

    /**
     * send greeting to default allowed text channel if no allowedChannel exists
     */
    if (channelIds.length === 0) {
      await defaultTextChannel.send({
        content:
          'Hi, thanks for inviting me again. For me to start announcing, please type "$subhere" to your prefered channel',
      });

      return;
    }

    /**
     * show greetings for each allowed channels
     */
    channelIds.forEach(async (id) => {
      const channel = guild.channels.cache.get(id) as TextChannel;

      if (!channel) return;

      await channel.sendTyping();
      await channel.send(
        'Hello again. From now on i will send announcement in this channel. type "$unsubhere" to prevent me from sending notification to this channel'
      );
    });

    return;
  }

  /**
   * if not exists create one
   */
  await db.guild.create({
    data: {
      id,
      channelIds: [],
    },
  });

  await defaultTextChannel.send({
    content:
      'Hi, thanks for inviting me. For me to start announcing, please type "$subhere" to your prefered channel',
  });
};
