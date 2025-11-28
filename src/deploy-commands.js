import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const commands = [];
const commandsPath = path.join(process.cwd(), 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

async function loadCommands() {
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const fileURL = pathToFileURL(filePath).href;
    const commandModule = await import(fileURL);
    const command = commandModule.default; // use .default for default exports

    if (!command || !command.data) {
      console.warn(`⚠️ Skipping ${file}, no data property found`);
      continue;
    }

    commands.push(command.data.toJSON());
  }
}

async function deployCommands() {
  await loadCommands();

  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

  try {
    console.log(`🚀 Started refreshing ${commands.length} guild commands.`);

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('✅ Successfully registered guild commands.');
  } catch (error) {
    console.error(error);
  }
}

deployCommands();
