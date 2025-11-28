#  NoWorries Bot

A modern, open-source Discord bot built with JavaScript (ES Modules) and Discord.js v14. Lightweight, modular, and easy to extend.



##  Features

- Role DM-ing (currently fixing)
- Image Tweaking (soon)
- Custom Embeds
- Advanced logging


####  Prerequisites

`Node.js v18 or higher`

`Discord Bot Token`

---


#  Installation


clone the repository:
```
git clone https://github.com/teqeu/NoWorries-bot
```

Install Dependencies:
```
npm install
```


#  Setup & Deployment

First, creaate a `.env` file in the root directory

Then, paste the following lines and fill in the requirements:
```
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=
```

Then run `node .\src\deploy-commands.js` 

After that run `node src` the bot should go online

---

#  Customization

Customize the status of the bot in `\src\events\ready.js` on lines `7-15`

Below, you can find the activity numbers for the presences.

| Activity Type | Number | Description                               |
| ------------- | ------ | ----------------------------------------- |
| `PLAYING`     | 0      | Shows “Playing {name}”                    |
| `STREAMING`   | 1      | Shows “Streaming {name}” (Twitch/YouTube) |
| `LISTENING`   | 2      | Shows “Listening to {name}”               |
| `WATCHING`    | 3      | Shows “Watching {name}”                   |
| `COMPETING`   | 5      | Shows “Competing in {name}”               |
| `CUSTOM`      | 4      | Custom status (rarely used directly)      |



#  FLAGS
| Permission                 | Flag                                          |
| -------------------------- | --------------------------------------------- |
| CREATE_INSTANT_INVITE      | `PermissionFlagsBits.CreateInstantInvite`     |
| KICK_MEMBERS               | `PermissionFlagsBits.KickMembers`             |
| BAN_MEMBERS                | `PermissionFlagsBits.BanMembers`              |
| ADMINISTRATOR              | `PermissionFlagsBits.Administrator`           |
| MANAGE_CHANNELS            | `PermissionFlagsBits.ManageChannels`          |
| MANAGE_GUILD               | `PermissionFlagsBits.ManageGuild`             |
| MANAGE_ROLES               | `PermissionFlagsBits.ManageRoles`             |
| MANAGE_WEBHOOKS            | `PermissionFlagsBits.ManageWebhooks`          |
| MANAGE_EMOJIS_AND_STICKERS | `PermissionFlagsBits.ManageEmojisAndStickers` |
| VIEW_AUDIT_LOG             | `PermissionFlagsBits.ViewAuditLog`            |
| SEND_MESSAGES              | `PermissionFlagsBits.SendMessages`            |
| MANAGE_MESSAGES            | `PermissionFlagsBits.ManageMessages`          |
| EMBED_LINKS                | `PermissionFlagsBits.EmbedLinks`              |
| ATTACH_FILES               | `PermissionFlagsBits.AttachFiles`             |
| READ_MESSAGE_HISTORY       | `PermissionFlagsBits.ReadMessageHistory`      |
| MENTION_EVERYONE           | `PermissionFlagsBits.MentionEveryone`         |
| USE_EXTERNAL_EMOJIS        | `PermissionFlagsBits.UseExternalEmojis`       |
| CONNECT                    | `PermissionFlagsBits.Connect`                 |
| SPEAK                      | `PermissionFlagsBits.Speak`                   |
| MUTE_MEMBERS               | `PermissionFlagsBits.MuteMembers`             |
| DEAFEN_MEMBERS             | `PermissionFlagsBits.DeafenMembers`           |
| MOVE_MEMBERS               | `PermissionFlagsBits.MoveMembers`             |
| USE_APPLICATION_COMMANDS   | `PermissionFlagsBits.UseApplicationCommands`  |
| MANAGE_THREADS             | `PermissionFlagsBits.ManageThreads`           |
| USE_PUBLIC_THREADS         | `PermissionFlagsBits.UsePublicThreads`        |
| USE_PRIVATE_THREADS        | `PermissionFlagsBits.UsePrivateThreads`       |