require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ] 
});

const token = process.env.BOT_TOKEN;
const channelId = process.env.CHANNEL_ID.split(" ");
const roleId = process.env.ROLE_ID;
const prefix = process.env.PREFIX.trim() + " ";
const prefix_lowercase = prefix.trim().toLowerCase();

client.addListener(Events.MessageCreate, async message => {
	try {
        if (channelId.indexOf(message.channelId) > -1) {
            // see if the user needs their name adjusted
            if (message.member.displayName && !message.member.displayName.toLowerCase().startsWith(prefix_lowercase)) {
                console.log("Name needs to be changed");
                // make sure the name won't be too long
                let name = message.member.displayName;
                if (message.member.displayName.length + prefix.length > 32) {
                    name = name.substring(0, 32 - prefix.length);
                }
                await message.member.setNickname(`Mochi ${name}`);
            }
    
            if (!message.member.roles.cache.has(roleId)) {
                console.log("Role needs to be added");
                message.member.roles.add(roleId);
            }
        }
    } catch (e) {
        console.error("Error:");
        console.error(e);
    }
});

client.once(Events.ClientReady, async listener => {
    console.log("Bot online");
});

client.login(token);
console.log("Loading configuration");