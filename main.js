const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'c!';

const fs = require('fs');

const version = '0.8.4.3';

const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);


    client.commands.set(command.name, command);
}


client.on('ready', msg => {
    console.log(`${client.user.username} Is online!`);
    console.log(`Bot is running version: ${version}`);

    memberCounter(client);

    const startembed = new Discord.MessageEmbed()
        .setTitle('Bot is online!')
        .setDescription('Bot is currently online and responding to commands.')
        .setColor('#0FF0000')
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .setFooter('CorruptSausage™')


    client.channels.cache.find(ch => ch.name === 'bot-status').send(startembed);


    client.user.setPresence({ game: { name: 'CorruptSausage' }, status: 'dnd' });
    client.user.setActivity('CorruptSausage', 'Bruh');


});

client.on('disconnect', msg => {
    console.log(`${client.user.username} Is currently offline!`)



    client.guild.channels.cache.find(ch => ch.name === 'bot-status').send();
});




client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    const role = member.guild.roles.cache.find(role => role.name === 'Community');

    const welcomeEmbed = new Discord.MessageEmbed()
    .setTitle('New Member!')
    .setColor('#0FF0000')
    .setDescription(`${member} Just joined the server!`)
    .setTimestamp()
    .setThumbnail(member.user.avatarURL())

    if (!channel) return;

    channel.send(welcomeEmbed);
    member.roles.add(role);
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');

    const leaveEmbed = new Discord.MessageEmbed()
    .setTitle('Member left!')
    .setColor('#0FF0000')
    .setDescription(`${member} Just left the server!`)
    .setTimestamp()
    .setThumbnail(member.user.avatarURL())

    if (!channel) return;

    channel.send(leaveEmbed);
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();



    //Ping command
    if (command === 'status') {
        client.commands.get('status').execute(message, args);

        //Rip command    
    } else if (command === 'rip') {
        client.commands.get('rip').execute(message, args);
        //Kick command    
    } else if (command === 'kick') {
        if (message.member.permissions.has('KICK_MEMBERS')) {
            client.commands.get('kick').execute(message, args);
        } else {
            message.channel.send("You don't have access to this command.");
        }
        //clear chat command    
    } else if (command === 'clear') {
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
            client.commands.get('clear').execute(message, args);
        } else {
            message.channel.send("You don't have access to this command.");
        }
        //ban command    
    } else if (command === 'ban') {
        if (message.member.permissions.has('BAN_MEMBERS')) {
            client.commands.get('ban').execute(message, args);
        } else {
            message.channel.send("You don't have access to this command.");
        }
        //Commands command, Show all commands    
    } else if (command === 'commands') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.delete();
            client.commands.get('commands').execute(message, args);
        } else {
            message.channel.send("You don't have access to this command.");
        }
        //Announcement command    
    } else if (command === 'announce') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.delete();
            client.commands.get('announce').execute(message, args);
        } else {
            message.member.send("You don't have access to this command.");
        }
        //Commandstatus command, Show status off all commands    
    } else if (command === 'commandstatus') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.delete();
            client.commands.get('commandstatus').execute(message, args);
        } else {
            message.reply("You don't have access to this command.");
        }
        //Poll command    
    } else if (command === 'poll') {
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
            message.delete();
            let pollchannel = message.mentions.channels.first();
            let pollDescription = args.slice(1).join(' ');

            if (!pollchannel) {
                message.channel.send('**You forgot to tag a channel** Usage: c!poll [channel] [message]');
            } else if (!pollDescription) {
                message.channel.send('**You forgot to put a message** Usage: c!poll [channel] [message]');
            } else {
                const pollembed = new Discord.MessageEmbed()
                    .setTitle('New Poll!')
                    .setDescription(pollDescription)
                    .setColor('#0FF0000')
                let msgEmbed = await pollchannel.send(pollembed);
                await msgEmbed.react('👍')
                await msgEmbed.react('👎')

                message.reply('Poll has been send!');

            }

        } else {
            message.reply("You don't have access to this command.");
        }
        //Developer command
    } else if (command === 'developer') {
        message.delete();
        client.commands.get('developer').execute(message, args);
        //Mute command
    } else if (command === 'mute') {
        if (message.member.permissions.has('DEAFEN_MEMBERS')) {
            client.commands.get('mute').execute(message, args);
        } else {
            message.reply("You don't have access to this command.");
        }
    } else if (command === 'unmute') {
        if (message.member.permissions.has('DEAFEN_MEMBERS')) {
            client.commands.get('unmute').execute(message, args);
        } else {
            message.reply("You don't have access to this command.");
        }
        //Suggestion command
    } else if (command === 'suggest') {
        message.delete();
        client.commands.get('suggest').execute(message, args);
    } else if (command === 'giverole') {
        if (message.member.permissions.has('MANAGE_ROLES')) {
            message.delete();
            client.commands.get('giverole').execute(message, args);
        } else {
            message.reply("You don't have access to this command.");
        }

    } else if (command === 'removerole') {
        if (message.member.permissions.has('MANAGE_ROLES')) {
            message.delete();
            client.commands.get('removerole').execute(message, args);
        } else {
            message.reply("You don't have access to this command.");
        }
    }




});


















client.login(process.env.token);