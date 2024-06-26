const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      " Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmanız gerek."
    );
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Doğru kullanım: \`-yavaşmod [0/10]\``)
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send(embed);
    return;
  }
  if (limit > 10) {
    const embed = new Discord.MessageEmbed()
      .setDescription("Süre limiti maksimum **10** saniye olabilir.")
      .setColor("RANDOM");
    message.channel.send(embed);
    return;
  }
  const embed = new Discord.MessageEmbed()
    .setDescription(`Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`)
    .setColor("RANDOM")
    .setFooter('Weise Bot | Birlikte daha ileriye', client.user.displayAvatarURL());
  message.channel.send(embed);
  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });
};

module.exports.config = {
    enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "yavas-mod", "yavasmod", "yavaşmod"],
  permLevel: 1,
  name: "slowmode",
  description: "Sohbete yazma sınır (süre) ekler.",
  usage: "slowmode [1/10]"
};