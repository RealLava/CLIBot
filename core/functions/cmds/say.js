function say(bot, args) {
    const message = args.join(' ');
    bot.chat(message)
}

module.exports = say;