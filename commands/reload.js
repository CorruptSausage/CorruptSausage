module.exports = {
    name: 'reload',
    description: "reloads a command",
    execute(message, args) {
        
        if(!args[0]){
            message.reply('Please provice a command to reload.');
        }

        const commandName = args[0].toLowerCase();

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)]
            client.commands.delete(commandName)
            const pull = require(`./${commandName}.js`)
            client.commands.set(commandName, pull);
        } catch(e) {
            message.reply(`Error whilst trying to reload ${args[0].toUpperCase()}`)
        }
        message.channel.send('Command has been reloaded.')
    }
}