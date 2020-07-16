const folder =  __dirname + '/assets/cards';
const Discord = require('discord.js');
const {translateAcronym} = require('./card');

let challengedCards = [];
let challengerCards = [];
let manilha = '';

const _ = require('lodash');



const sendCards = (cards, msgObject) => {
    if (msgObject.mentions.users.first() !== undefined){
        msgObject.author.send("Suas cartas são: ");
        msgObject.client.users.cache.get(msgObject.mentions.users.first().id).send("Suas cartas são")
        for (var i = 0; i < 6; i++){
            var card = cards.splice(randomInt(0,39 - i) , 1)[0];
            let embed = makeEmbed(translateAcronym(card), card,' ');

            if (i % 2 == 0){
                challengerCards.push(card);
                msgObject.author.send(embed);
            } else {
                challengedCards.push(card);
                msgObject.client.users.cache.get(msgObject.mentions.users.first().id).send(embed);
        }
    }
}


}

const makeEmbed = (title, card, description) => {
    return new Discord.MessageEmbed()
        .setTitle(title)
        .attachFiles(folder + '/' + card + '.png')
        .setImage('attachment://' + card + '.png')
}

exports.sendCards = sendCards;


function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}