import 'dotenv/config';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

async function loadBot() {
  const commandsPath = path.join(process.cwd(), "src", "commands");
  const commandFiles = fs.readdirSync(commandsPath);

  for (const file of commandFiles) {
    if (!file.endsWith(".js")) continue;

    const filePath = path.join(commandsPath, file);
    const fileURL = pathToFileURL(filePath).href;

    const command = (await import(fileURL)).default;

    client.commands.set(command.data.name, command);
    console.log(`[command] Loaded ${command.data.name}`);
  }

  const eventsPath = path.join(process.cwd(), "src", "events");
  const eventFiles = fs.readdirSync(eventsPath);

  for (const file of eventFiles) {
    if (!file.endsWith(".js")) continue;

    const filePath = path.join(eventsPath, file);
    const fileURL = pathToFileURL(filePath).href;

    const event = (await import(fileURL)).default;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    console.log(`[event] Loaded ${event.name}`);
  }

  client.login(process.env.BOT_TOKEN);
}

loadBot();
