const { MessageEmbed, version } = require("discord.js");

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
            const statusEmbed = new MessageEmbed()
            .setTitle('Bot Status:')
            .setColor('#FF0000')
            .addField('Bot Status:', 'Online and responding to commands.')
            .addField('Bot Version:', version)
            .setFooter('CorruptSausage™')

            message.channel.send(statusEmbed);
            timeout.add(message.author.id)
            setTimeout(() => {
                timeout.delete(message.author.id)
            }, 10000)
        }




    }


}