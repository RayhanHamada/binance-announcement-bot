import db from '@utils/db';
import { Awaitable, Message, MessageEmbed } from 'discord.js';

type OnMessageCreate = (message: Message<boolean>) => Awaitable<void>;

export const onMessageCreate: OnMessageCreate = async (msg) => {
  if (msg.author.bot || msg.author.username === 'binance-announcement-bot')
    return;

  /**
   * TODO: add conditions to allow only certain user can invoke the command
   */

  /**
   * treat everything that prefixed with "$" as a command
   */
  if (/^\$/.test(msg.content)) {
    const commandList = ['subhere', 'unsubhere', 'help', 'sublist'];
    const cmd = msg.content.slice(1).toLowerCase();

    const helpEmbed = new MessageEmbed({
      title: 'Command Help',
      description: `
        $help       => get help (like this),
        $subhere    => subscribe to the announcement on this channel,
        $unsubhere  => unsubscribe to the announcement on this channel,
        $sublist    => list all channel that subscribe to the announcement
        `,
    });

    /**
     * send help for unknown command
     */
    if (!commandList.includes(cmd)) {
      await msg.channel.send({
        content:
          "I'm sorry but i'm not understand what you're trying to say. Try one of this commands",
        embeds: [helpEmbed],
      });

      return;
    }

    if (cmd === 'help') {
      await msg.channel.send({
        embeds: [helpEmbed],
      });
    } else if (cmd === 'subhere') {
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
    } else if (cmd === 'unsubhere') {
      const foundGuild = await db.guild.findFirst({
        where: {
          id: msg.guildId!,
        },
      });

      /**
       * return if channel not subscribing
       */
      if (!foundGuild!.channelIds.includes(msg.channelId)) {
        await msg.channel.send(
          'This channel not subscribing to the announcement'
        );

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
    } else if (cmd === 'sublist') {
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
        allowedChannelIds.map(
          async (id) => msg.guild!.channels.cache.get(id)!.name
        )
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
    }
  }
};
