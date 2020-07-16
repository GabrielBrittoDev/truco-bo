require('dotenv/config');

const Discord = require('discord.js');
const client = new Discord.Client();
const { getAllCards } = require('./card');
const { sendCards } = require('./game');
const _ = require('lodash');
const folder =  __dirname + '/assets/cards';

const token = process.env.TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let cards = getAllCards(folder);

    sendCards(cards, msg);
});






client.login(token);