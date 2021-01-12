const { DiscordAPIError, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: 'announce',
    description: "",
    execute(message, args) {


        let announcemessage = message.content.match(/(?<=announce ).*$/)[0];
        let finalmessage = announcemessage.toLowerCase();




        message.channel.send(finalmessage);

    }
}
