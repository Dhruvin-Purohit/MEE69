import { Command } from 'discord-akairo';
import { Role } from 'discord.js';
import { Message, VoiceChannel } from 'discord.js';

export default class extends Command {
	public constructor() {
		super('comand_mee69_skip', {
			aliases: ['skip', 'fs', 'next-song'],
			channel: 'guild',
		});
	}
	public async exec(message: Message) {
		if (!message.guild) return 'How the FUCK??';
		let player = await message.guild.player();
		if (!player)
			return message.util?.send(
				"I can't skip nothing, No song(s) are being played at the moment.",
			);

		if (player.textChannel) {
			if (message.channel.id != player.textChannel) return undefined;
		}

		if (
			(message.member?.voice.channelID != player.voiceChannel ||
				!message.member?.hasPermission('MANAGE_GUILD')) &&
			player.voiceChannel
		)
			return message.channel.send(
				'You need to be in the {} channel to use this command'.replace(
					'{}',
					(this.client.channels.cache.get(
						player.voiceChannel,
					) as VoiceChannel).name,
				),
			);
		if (
			!message.member?.roles.cache.find((r: Role) => r.name === 'DJ') ||
			!message.member.hasPermission('MANAGE_CHANNELS')
		)
			return message.channel.send(
				'You need to have the "DJ" role or the "Manage Channels" permission to use this command!',
			);

		player.stop();

		return message.reply('Skipped the song :thumbsup_tone1:');
	}
}
