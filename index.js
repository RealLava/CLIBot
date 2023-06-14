// clibot
const serverHost = process.argv[2];
const readline = require('readline');
const mineflayer = require('mineflayer');
const auth = "offline"

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

let chattroll = false;
const bot = mineflayer.createBot({
  host: serverHost,
  username: "CLI$" + makeid(7),
  auth: auth,
})

const commands = [];
function say(args) {
  const message = args.join(' ');
  bot.chat(message)
}

function executeCommand(command, args) {
  const selectedCommand = commands.find(cmd => cmd.name === command);
  if (selectedCommand) {
    selectedCommand.func(args);
  } else {
    console.log('Command not found.');
  }
}

  // CLIBOT - REGISTER COMMANDS HERE
  commands.push({ name: 'say', func: say });

  for (const key in executeCommand) {
    if (executeCommand.hasOwnProperty(key) && typeof executeCommand[key] === 'function') {
      commands.push(key);
    }
  }

  const commandNames = commands.map(cmd => cmd.name);
  const formattedCommands = commandNames.join(', ');

  bot.once('spawn', () => {
    bot.chat("/c on")
    console.log('\x1b[32m%s\x1b[0m', "Commands: " + formattedCommands);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    function handleUserInput() {
      rl.question('> ', (input) => {
        const [command, ...args] = input.trim().split(' ');
        executeCommand(command, args);
        handleUserInput();
      });
    }
    
    handleUserInput();
  });

  const prefix = "$";
  bot.on('login', () => {
    console.log('\x1b[31m%s\x1b[0m', 'CliBot is running.');
    console.log('\x1b[31m%s\x1b[0m', `Host: ${serverHost}, Auth: ${auth}, Username: ${bot.username}`);
    bot.chat(`/broadcastraw &a&lCliBot is running. Prefix: ${prefix}`);
  })

  bot.on('login', () => {
    bot.chat(`/vanish`);
  })

  let prefixed = false;
  let commanded = false;
  let intervalId;
  bot.on('chat', (username, message) => {
      if (username === bot.username) return;
      else if (prefixed === false) {
          bot.chat("/prefix &a&l[CLI]");
          prefixed = true;
      } else if (commanded === false) {
          bot.chat("/c on");
          commanded = true;
      } else if (chattroll === true) {
          bot.chat(`[${username}] ${message}`);
      } else if (message.includes(`/deop ${bot.username}`)) {
        bot.chat(`/op @s[type=player]`);
      } else if (message.includes(`$cmds`)) {
        bot.chat(`&c&lCLIBOT - Commands > `);
        bot.chat(`&c&lCLIBOT - spam, killall, players, randomname, clearchat, skydiveall, unspam`);
      } else if (message.includes(`$spam`)) {
        intervalId = setInterval(spam, 335);
      } else if (message.includes(`$unspam`)) {
        clearInterval(intervalId);
      }
  });  

  bot.on('chat', (username, message) => {
    if (prefixed === false) {
      bot.chat("/prefix &a&l[CLI]");
      prefixed = true;
  } else if (commanded === false) {
      bot.chat("/c on");
      commanded = true;
  }
  }); 

bot.on('kicked', console.log)
bot.on('error', console.log)
