const readline = require('readline');
const executeCommand = require("./executeCommand")


function spawn(bot, formattedCommands, commands) {
    bot.once('spawn', () => {
        console.log('\x1b[1m\x1b[34m%s\x1b[0m', "Commands: " + formattedCommands);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        
        function handleUserInput() {
          rl.question('\x1b[1m\x1b[37m> \x1b[0m', '> ', (input) => {
            const [command, ...args] = input.trim().split(' ');
            executeCommand(bot, commands, command, args);
            handleUserInput();
          });
        }
    
        handleUserInput();
      });
}

module.exports = spawn;