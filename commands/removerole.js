const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'removerole',
    description: 'removes a role from the player',
    execute(message, args) {

        if (!args[0] || !args[1]) return message.channel.send("Incorrect Usage! Usage: [Member] [Role]").then(m => m.delete({ timeout: 10000 }))

        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

            const doensthaveRole = !member.roles.cache.has(roleName.id);

            if (doensthaveRole) return message.channel.send('The user doesnt have this role.').then(m => m.delete({ timeout: 5000 }));

            const embed = new MessageEmbed()
                .setTitle(`Role Removed: ${roleName.name}`)
                .setDescription(`${message.author} has removed the role ${roleName} from ${member.user}`)
                .setColor('#FF0000')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter(new Date().toLocaleString())

            return member.roles.remove(roleName).then(() => message.channel.send(embed));
        } catch (e) {
            return message.channel.send('ERROR').then(m => m.delete({ timeout: 10000 })).then(() => console.log(e))
        }


    }


}