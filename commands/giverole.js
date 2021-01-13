const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'giverole',
    description: 'Gives a player a role',
    execute(message, args) {

        if (!args[0] || !args[1]) return message.channel.send("Incorrect Usage! Usage: [Member] [Role]").then(m => m.delete({ timeout: 10000 }))

        try {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const roleName = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));

            const alreadyHasRole = member.roles.cache.has(roleName.id);

            if (alreadyHasRole) return message.channel.send('User already has that role').then(m => m.delete({ timeout: 5000 }));

            const embed = new MessageEmbed()
                .setTitle(`Role Added: ${roleName.name}`)
                .setDescription(`${message.author} has successfully given the role ${roleName} to ${member.user}`)
                .setColor('#097FF00')
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter(new Date().toLocaleString())

            return member.roles.add(roleName).then(() => message.channel.send(embed));
        } catch (e) {
            return message.channel.send('Thats role doesnt exist.').then(m => m.delete({ timeout: 10000 })).then(() => console.log(e))
        }


    }


}