import bot from './bot';
import { botToken } from './constants';

/**
 * trigger task for every hour at X:00
 */
// const executeTaskCron = parseCronExpression('0 0 * * * *');

/**
 * trigger collection reset every 23:50
 */
// const resetDBCron = parseCronExpression('0 50 23 * * *');

bot.login(botToken).then(() => {});
