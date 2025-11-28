export default {
  name: 'messageCreate',
  async execute(message, client) {
    if (!message.guild || message.author.bot) return;

    const afkCommand = client.commands.get('afk');
    const afkMap = afkCommand?.afkMap;
    if (!afkMap) return;

    if (afkMap.has(message.author.id)) {
      const afkData = afkMap.get(message.author.id);
      afkMap.delete(message.author.id);

      const duration = Date.now() - afkData.timestamp;
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      const days = Math.floor(duration / (1000 * 60 * 60 * 24));

      let formatted = '';
      if (days) formatted += `${days}d `;
      if (hours) formatted += `${hours}h `;
      if (minutes) formatted += `${minutes}m `;
      formatted += `${seconds}s`;

      message.reply(`✅ Welcome back! You were AFK for ${formatted}.`);
    }

    message.mentions.users.forEach(user => {
      if (afkMap.has(user.id)) {
        const afkData = afkMap.get(user.id);
        const duration = Date.now() - afkData.timestamp;
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));

        let formatted = '';
        if (days) formatted += `${days}d `;
        if (hours) formatted += `${hours}h `;
        if (minutes) formatted += `${minutes}m `;
        formatted += `${seconds}s`;

        message.reply(`💤 ${user.tag} is AFK: ${afkData.reason} (since ${formatted})`);
      }
    });
  }
};
