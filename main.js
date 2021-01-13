const path = require('path');

const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'c!';

const fs = require('fs');

const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);


    client.commands.set(command.name, command);
}


client.on('ready', msg => {
    console.log(`${client.user.username} Is online!`);

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir =>{
        const files = fs.readdirSync(path.join(__dirname, dir))
        for(const file of files){
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if(stat.isDirectory()){
                readCommands(path.join(dir, file))
            }else if(file !== baseFile){
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }

            
        }
    }
    readCommands('commands')

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

    if (!channel) return;

    channel.send(`${member} Welcome to the server!`);
    member.roles.add('797483035754758175');
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');

    if (!channel) return;

    channel.send(`${member} Just left the server.`);
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
            message.channel.send('You cant, But atleast u tried.');
        }
        //clear chat command    
    } else if (command === 'clear') {
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
            client.commands.get('clear').execute(message, args);
        } else {
            message.channel.send('No permissions!');
        }
        //ban command    
    } else if (command === 'ban') {
        if (message.member.permissions.has('BAN_MEMBERS')) {
            client.commands.get('ban').execute(message, args);
        } else {
            message.channel.send('You cant, But atleast u tried.');
        }
        //Commands command, Show all commands    
    } else if (command === 'commands') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.delete();
            client.commands.get('commands').execute(message, args);
        } else {
            message.channel.send('No access!');
        }
        //Announcement command    
    } else if (command === 'announce') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.delete();
            client.commands.get('announce').execute(message, args);
        } else {
            message.member.send('No permissions!');
        }
        //Commandstatus command, Show status off all commands    
    } else if (command === 'commandstatus') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.delete();
            client.commands.get('commandstatus').execute(message, args);
        } else {
            message.reply("**You need to have the Adminstrator permissions to use this command.");
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
            message.reply('You dont have permissions for this');
        }
        //Developer command
    } else if (command === 'developer') {
        client.commands.get('developer').execute(message, args);
        //Mute command
    } else if (command === 'mute') {
        if (message.member.permissions.has('DEAFEN_MEMBERS')) {
            client.commands.get('mute').execute(message, args);
        } else {
            message.reply('You dont have permissions for this.');
        }
    } else if (command === 'unmute') {
        if (message.member.permissions.has('DEAFEN_MEMBERS')) {
            client.commands.get('unmute').execute(message, args);
        } else {
            message.reply("You dont have permissions for this.");
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
            message.reply('No permissions!');
        }

    } else if (command === 'removerole') {
        if (message.member.permissions.has('MANAGE_ROLES')) {
            message.delete();
            client.commands.get('removerole').execute(message, args);
        } else {
            message.reply('No permissions!');
        }
    } 
    


});


















client.login(process.env.token);