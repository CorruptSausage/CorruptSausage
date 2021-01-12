module.exports = {
    name: 'status',
    description: 'status command',
    execute(message, args) {
        const timeout = new Set();

        if (timeout.has(message.author.id)) {
            const expirationTime = timeout.get(message.author.id) + 10000; // 10000 is cooldown

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} seconds before using this command again`);
            }
        } else {
            message.channel.send(`Bot is online and responding to commands.`)
            timeout.add(message.author.id)
            setTimeout(() => {
                timeout.delete(message.author.id)
            }, 10000)
        }




    }


}