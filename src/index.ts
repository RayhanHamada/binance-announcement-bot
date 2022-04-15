import bot from './bot';
import { botToken } from './constants';

/**
 * trigger task for every hour at X:10
 */
// const executeTaskCron = parseCronExpression('0 10 * * * *');

/**
 * trigger collection reset every 23:50
 */
// const resetDBCron = parseCronExpression('0 50 23 * * *');

bot.login(botToken).then(() => {});
