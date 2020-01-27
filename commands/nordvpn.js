const Discord = require("discord.js")
const fs = require("fs")
const config = require("../config.json")
const talkedRecently = new Set();

exports.run = (client, message, args) => {

    message.delete(message)

    if (talkedRecently.has(message.author.id)) {
        message.reply(`Ap.. Ap.. Ap.. Wait ${config.cooldown} minutes to use this command again!`).then(m => {
            setTimeout(() => {
                m.delete(m)
            }, 5000); //5 seconds
        })
    } else {
        fs.readFile('./nordvpn.txt', function(err, data){
            if(err) throw err;
            data = data + '';
            var lines = data.split('\n');
            let random = lines[Math.floor(Math.random()*lines.length)];

            let hex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            let embed = new Discord.RichEmbed()
            .addField("NordVPN Alt", `Here is your NordVPN account: \n${random}`)
            .setThumbnail("https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/09/logotype-vertical-1-e1569426685889.png")
            .setColor(hex)
            message.author.send(embed)

            message.reply("Sent you NordVPN Account!").then(m => {
                setTimeout(() => {
                    m.delete(m)
                }, 5000); //5 seconds
            })

            talkedRecently.add(message.author.id);
            setTimeout(() => {
                talkedRecently.delete(message.author.id);
            }, config.cooldown * 60 *1000);

        })
    }
}