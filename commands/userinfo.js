const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    console.log("!userinfo works");
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This is your user information")
        .setColor("#9B59B6")
        .addField("Full Username", message.author.tag)
        .addField("ID", message.author.id)
        .addField("Created At", message.author.createdAt);
    
    message.channel.send({embed: embed});
    return;
}

module.exports.help = {
    name: "userinfo",
    description: "basic user information"
}