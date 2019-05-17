const Discord = require("discord.js");
const perms = require("./protected/perms.json");
const bot = new Discord.Client();
const fs = require("fs");
const prefix = perms.prefix;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js")
    if(jsfiles.length <=0) {
        console.log("No commands to load.");
        return;
    }
    
    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);

    })
});

bot.on("ready", () => {
    console.log(`Bot is ready ${bot.user.username}`);
    console.log(bot.commands);
});

bot.on("message", async message => {
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
});

bot.login(perms.BotToken);