import { Awaitable, Message } from 'discord.js';
import { help, subHere, subList, unknown, unSubHere } from '~/src/bot/commands';

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
    const fullCommand = msg.content.slice(1).toLowerCase();
    const [cmd, ...params] = fullCommand.split(' ');

    /**
     * send help for unknown command
     */
    if (!commandList.includes(cmd)) {
      unknown(msg);
      return;
    }

    if (cmd === 'help') {
      help(msg);
    } else if (cmd === 'subhere') {
      subHere(msg);
    } else if (cmd === 'unsubhere') {
      unSubHere(msg);
    } else if (cmd === 'sublist') {
      subList(msg);
    }
  }
};
