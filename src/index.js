require("dotenv/config");

const Discord = require("discord.js");
const client = new Discord.Client();
const { getAllCards } = require("./card");
const { sendCards, generateCommands, init } = require("./game");
const folder = __dirname + "/assets/cards";
let commands = {};

const token = process.env.TOKEN;

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  let content = msg.content.trim();


	if (commands[content] !== undefined) {
		commands[content](msg);
  } 

  if (msg.content.startsWith('!jogar') && msg.mentions.users.first() !== undefined){

    let cards = getAllCards(folder);

    init(msg);

    sendCards(cards, msg);

    commands = generateCommands();
  }

});

client.login(token);
