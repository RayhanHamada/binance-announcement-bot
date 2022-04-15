import { MessageEmbed } from 'discord.js';

export const helpEmbed = new MessageEmbed({
  title: 'Command Help',
  description: `
      $help       => get help (like this),
      $subhere    => subscribe to the announcement on this channel,
      $unsubhere  => unsubscribe to the announcement on this channel,
      $sublist    => list all channel that subscribe to the announcement
      `,
});
