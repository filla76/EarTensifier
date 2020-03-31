module.exports = {
	name: 'join',
	description: 'Joins the voice channel you are in.',
	aliases: ['summon'],
	async execute(client, message) {
		const voiceChannel = message.member.voice;
		if(!voiceChannel) return client.responses('noVoiceChannel', message);

		const permissions = voiceChannel.channel.permissionsFor(client.user);
		if(!permissions.has('CONNECT')) return client.responses('noPermissionConnect', message);

		client.music.players.spawn({
			guild: message.guild,
			textChannel: message.channel,
			voiceChannel: message.member.voice.channel,
		});

		return message.channel.send(`Joined ${client.emojiList.voice}**${message.member.voice.channel.name}**`);
	},
};