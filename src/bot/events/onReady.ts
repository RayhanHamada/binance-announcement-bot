import { Awaitable, Client } from 'discord.js';

type OnReady = (client: Client<true>) => Awaitable<void>;

export const onReady: OnReady = (bot) => {
  console.log(`bot ready`);
};
