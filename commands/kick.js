module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.reply("User has been kicked.");
        } else {
            message.channel.send(`Error while trying to kick, Please tag a user.`);
        }
    }
}