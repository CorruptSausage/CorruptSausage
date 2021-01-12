const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'commands',
    description: 'Show bot commands',
    execute(message, args) {
        const commandsembed = new MessageEmbed()
            .setTitle('Bot commands:')
            .setColor('#0FF0000')
            .addField('Bot prefix:', 'c!')
            .addField('Clear', 'Clears amount of messages')
            .addField('Kick', 'Kicks a user')
            .addField('Ban', 'Bans a user')
            .addField('Ping', 'Check for bot reaction')
            .addField('Rip', 'Send a RIP photo')
            .addField('Command', 'Shows all bot commands')
            .addField('Announce', 'Announce a message')
            .addField('Poll', 'Creates a poll')
            .addField('Mute', 'Mutes a member')
            .addField('Unmute', 'Unmutes a member')
            .addField('Suggest', 'Suggest something')
            .addField('giverole', 'Gives a user a role')
            .addField('removerole', 'Removes a role from a user')
            .setFooter('CorruptSausageBot™')

        message.channel.send(commandsembed);




    }


}