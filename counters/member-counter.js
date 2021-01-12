module.exports = async (client) => {
    const guild = client.guilds.cache.get('796781098561437796');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('797549392617537536');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
    }, 5000);
}