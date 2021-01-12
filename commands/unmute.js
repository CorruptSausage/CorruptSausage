module.exports = {
    name: 'unmute',
    description: "This unmutes a member",
    execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            message.reply(`Has just unmuted <@${memberTarget.user.id}>`);
        } else {
            message.channel.send('Error while unmuting, Please tag a user.');
        }
    }
}