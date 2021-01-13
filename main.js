const Discord = require('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});


const enmap = require('enmap');

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
})

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
        .addField('Bot is running version:', version)
        .setColor('#0FF0000')
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .setFooter('CorruptSausage™')


    client.channels.cache.find(ch => ch.name === 'bot-status').send(startembed);


    client.user.setPresence({
        game: {
            name: 'CorruptSausage'
        },
        status: 'dnd'
    });
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
        .setColor('#097FF00')
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
    } else if (command === 'reload') {
        if (message.author.id === '306113920341377024') {
            client.commands.get('reload').execute(message, args);
        } else {
            message.reply("You don't have access to this command.");
        }



        //Ticket System
    }else if(command === 'ticket-setup'){
        if(message.member.permissions.has('ADMINISTRATOR')){
            let channel = message.mentions.channels.first();

            if(!channel){
                message.reply('Usage: [Channel]');
            }


            let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle('Ticket System')
            .setDescription("React to open a ticket")
            .setFooter('CorruptSausage™')
            .setcolor('#FF0000')
            )

            settings.set(`${message.guild.id}-ticket`, sent.id);

            message.channel.send('Ticket setup done.')
            sent.react('🎫');

        }else{
            message.reply("You don't have access to this command.");
        }
    }else if(command === 'close'){
        if(!message.channel.name.includes("ticket-")) return message.reply('You cannot use that here.')
        message.channel.delete();
    }

    
    client.on('messageReactionAdd', async (reaction, users) => {
        if(user.partial) await user.fetch();
        if(reaction.partial) await reaction.fetch();
        if(reaction.message.partial) await reaction.message.fetch();

        if(user.bot) return;

        let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

        if(!ticketid) return;

        if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
            reaction.users.remove(user);

            reaction.message.guild.channels.create(`Ticket-${user.username}`, {
                permissionOverwrites: [{
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
            {
                id: reaction.message.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
            }
        ],
        type: "text"
            }).then(async channel => {
                channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("Welcome to your ticket").setDescription("Please wait.").setColor('00ff00'))
            })
        }
    });




});


















client.login(process.env.token);