import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'guildConfigs.json');
let guildConfigs = {};
if (fs.existsSync(filePath)) {
  guildConfigs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function getLogChannel(guildId) {
  return guildConfigs[guildId]?.logChannelId || null;
}

export function setLogChannel(guildId, channelId) {
  guildConfigs[guildId] = { ...guildConfigs[guildId], logChannelId: channelId };
  fs.writeFileSync(filePath, JSON.stringify(guildConfigs, null, 2));
}

// for command logging functionality
export async function sendLog(guild, payload) {
  const logChannelId = getLogChannel(guild.id);
  if (!logChannelId) return;

  const channel = guild.channels.cache.get(logChannelId);
  if (!channel) return;

  await channel.send(payload);
}
