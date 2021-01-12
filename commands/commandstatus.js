const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js');

module.exports = {
    name: 'commandstatus',
    description: 'shows status off all commands',
    execute(message, args){
        const embed = new MessageEmbed()

        .setTitle('Commands Status:')
        .setColor('#0FF0000')
        .addField('Kick command', 'Tested. Works: 100%')
        .addField('Ban command', 'Tested. Works: 100%')
        .addField('Rip command', 'Tested. Works: 100%')
        .addField('Ping command', 'Tested. Works: 100%')
        .addField('Commands command', 'Tested. Works: 100%')
        .addField('Announce command', 'Tested. Works: 100%')
        .addField('Clear command', 'Tested. Works: 100%')
        .addField('Poll command', 'Tested. Works: 100%')
        .addField('Mute command', 'Tested. Works: 100%')
        .addField('Unmute command', 'Tested. Works: 100%')
        .addField('Suggest command', 'Tested. Works: 100%')
        .addField('giverole command', 'Tested. Works: 100%')
        .addField('removerole command', 'Tested. Works: 100%')
        .setImage('https://i.imgur.com/h6fepnJ.png')
        .setTimestamp()
        .setFooter('CorruptSausage™')
        
        message.channel.send(embed);


    }


}