const Discord = require("discord.js");
const emojis = require("../../data/emojis.json");
const colors = require("../../data/colors.json");
const { Utils } = require("erela.js");

module.exports = {
    name: "skip",
    description: "Skips the current song",
    aliases: ["s"],
    async execute(client, message, args) {
        const voiceChannel = message.member.voice.channel;
        const player = client.music.players.get(message.guild.id);

        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command");
        if(voiceChannel != message.guild.members.cache.get(client.user.id).voice.channel) return message.channel.send("You are not in the same voice channel as the bot.");
        if(!player) return message.channel.send("There is nothing currently playing to skip.")

        if(player) player.stop()
        return message.channel.send(`Skipped...`)
    }
}