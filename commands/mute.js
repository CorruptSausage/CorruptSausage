
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {

            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.add(muteRole.id);
            message.reply(` Has just muted <@${memberTarget.user.id}>`);

            
        } else {
            message.channel.send('Error while muting, Please tag a user.');
        }
    }
}

