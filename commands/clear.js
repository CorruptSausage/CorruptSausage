module.exports = {
    name: 'clear',
    description: "clears messages.",
    execute(message, args) {
        let deleteamount;

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Please put a amount.') }

        if (parseInt(args[0]) > 100) {
            return message.reply('Maximum amount of 100.')
        } else {
            deleteamount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteamount + 1, true);
        message.reply(`You have just deleted ${deleteamount} messages.`)
            .then(msg => {
                msg.delete({ timeout: 5000 });
            })





    }
}