const Discord = require('discord.js');
module.exports = {
    name: 'rip',
    description: 'response with rip',
    execute(message, args) {
        const attachment = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
        message.channel.send(attachment);




    }


}