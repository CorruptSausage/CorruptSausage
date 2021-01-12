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
            .addField('You can also add the bot to your server.', '[Invite Link](https://discord.com/oauth2/authorize?client_id=797171868988866580&scope=bot&permissions=8)')
            .setFooter('CorruptSausage™')
            .setImage('https://i.imgur.com/h6fepnJ.png')
            .setColor('#0FF0000')

        message.reply(embed);



    }


}