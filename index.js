// clibot
const serverHost = process.argv[2];
const mineflayer = require('mineflayer');
const makeid = require("./core/functions/makeid")
const executeCommand = require("./core/functions/executeCommand")
const spawn = require("./core/functions/onSpawn")
const say = require("./core/functions/cmds/say")
const auth = "offline";

const bot = mineflayer.createBot({
  host: serverHost,
  username: "CLI$" + makeid(7),
  auth: auth,
})

const commands = [];

// CLIBOT - REGISTER COMMANDS HERE
commands.push({ name: 'say', func: say });

for (const key in executeCommand) {
  if (executeCommand.hasOwnProperty(key) && typeof executeCommand[key] === 'function') {
    commands.push(key);
  }
}

const commandNames = commands.map(cmd => cmd.name);
const formattedCommands = commandNames.join(', ');
spawn(bot, formattedCommands, commands)

bot.on('login', () => {
  console.log('\x1b[1m\x1b[34m%s\x1b[0m', 'CliBot is running.');
  console.log('\x1b[1m\x1b[32m%s\x1b[0m', `Host: ${serverHost}, Auth: ${auth}, Username: ${bot.username}`);
});

bot.on('kicked', console.log)
bot.on('error', console.log)
