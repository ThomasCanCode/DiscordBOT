const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })

client.login(process.env.token);

client.once('ready', () => {
    console.log('client online!');
    var guild = client.guilds.cache.get(process.env.server_id);


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