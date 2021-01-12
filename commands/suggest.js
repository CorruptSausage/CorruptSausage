const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    description: "for suggestions",
    execute(message, args) {
        if(!args.length) {
            message.reply("Please give the suggestion.");
        }else{
            const channel = message.guild.channels.cache.find(ch => ch.name === 'suggestions');

            if(!channel){
                message.reply("There is no channel with the name 'suggestions'");
            }
    
    
    
            const embed = new MessageEmbed()
            .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
            .setThumbnail(message.author.avatarURL())
            .setColor('#0FF0000')
            .setDescription(args.join(" "))
            .setTimestamp()
    
    
    
    
            channel.send(embed).then(m => {
                m.react("✅")
                m.react("❌")
            })
    
    
            message.reply("Your suggestions has been send!");
        }
        
    }
}