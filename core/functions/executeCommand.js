function executeCommand(bot, commands, command, args) {
    const selectedCommand = commands.find(cmd => cmd.name === command);
    if (selectedCommand) {
      selectedCommand.func(bot, args);
    } else {
      console.log('Command not found.');
    }
}

module.exports = executeCommand;