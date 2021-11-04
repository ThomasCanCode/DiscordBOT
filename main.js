const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })

client.login('OTA1MjQ5NzcxNzMwNjU3Mzcx.YYHVjA.CyJxpSVRSe0ahyl2w7f5_9CITbI');

client.once('ready', () => {
    console.log('client online!');
    var guild = client.guilds.cache.get("905768121279860746");


    setInterval(function () {
        var members_array = [];

        guild.members.fetch()
        .then(members => {
            members.each((m) => members_array.push(m.user.tag));
            postToPHP(members_array);
        })
        .catch(console.error);
        

     }, 30000);


        
});


async function postToPHP (data) {
    
    const axios = require('axios');
    var string_data = JSON.stringify(data);
    var url = "https://riccirichclub.io/ricci_dev/node.php";
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        } 
    }  
    const params = new URLSearchParams();
    params.append('members', string_data);

    axios.post( url, params, config )
    .then(function (response) {
        console.log(string_data + typeof string_data);
    })
    .catch(function (error) {
        console.log(error);
    });

}