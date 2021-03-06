exports.module = {
	commands: ["avatar","avie","av"],
	description: "Retrieves the mentioned user's avatar, or yours if not specified.",
	syntax: "[@mention or user ID]",
	tags: [],
	process: function(client, msg, params) {
		function displayAvatar(user) {
			if(user.avatar != null) {
				if(!msg.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
					msg.reply(user.displayAvatarURL({size:4096,format:"png",dynamic:true}));
				} else {
					msg.reply(undefined, {embed: {
						author: {
							name: `${user.tag}'s avatar`,
							iconURL: user.defaultAvatarURL
						},
						image: {
							url: user.displayAvatarURL({size:4096,format:"png",dynamic:true})
						},
						url: user.displayAvatarURL({size:4096,format:"png",dynamic:true}),
						color: [7506394,7634829,4437377,16426522,15746887][user.discriminator % 5]
					}});
				}
			} else {
				msg.reply(`**${user.tag}** does not have an avatar.`);
			}
		}

		if (params[1] !== undefined) {
			if (msg.mentions.users.array()[0] != null) {
				var mention = msg.mentions.users.array()[0];
				displayAvatar(mention);
			} else if (/^\d+$/.test(params[1])) {
				client.users.fetch(params[1]).then(user => {
					displayAvatar(user);
				}).catch(e => msg.reply("I could not find the user you requested." + ` (${e})`));
			} else {
				msg.reply("I could not find the user you requested.");
			}
		}
		else {
			displayAvatar(msg.author);
		}
	}
};
