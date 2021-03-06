const Command = require('../../structures/Command');
const Discord = require('discord.js');
const { normal } = require('../../../config/volume.js');

module.exports = class Reset extends Command {
	constructor(client) {
		super(client, {
			name: 'reset',
			description: 'Resets the filters to normal.',
			aliases: ['normal'],
			cooldown: '4',
			inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true,
		});
	}
	async run(client, message) {
		const player = client.music.players.get(message.guild.id);
		const delay = ms => new Promise(res => setTimeout(res, ms));


		player.setEQ(...Array(13).fill(0).map((n, i) => ({ band: i, gain: 0.1 })));
		player.setVolume(normal);

		const msg = await message.channel.send(`${client.emojiList.loading} Reseting filters to default...`);
		const embed = new Discord.MessageEmbed()
			.setDescription('Filters reset!')
			.setColor(client.colors.main);
		await delay(5000);
		return msg.edit('', embed);
	}
};