const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'developer',
    description: 'dev command',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Bot developer')
            .setDescription('This Discord bot is made by CorruptSausage#6813')
            .addField('Development Discord:', '[Click Me](https://discord.gg/gNAGXuAshv)')
            .addField('If you want to get more info about the bot.', 'Join our discord!')
            .setFooter('CorruptSausage™')
            .setImage('https://i.imgur.com/ZzOBcmX.png')
            .setColor('#0FF0000')

        message.reply(embed);



    }


}