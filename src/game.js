const folder = __dirname + "/assets/cards";
const Discord = require("discord.js");
const { translateAcronym } = require("./card");
const { createPlayer } = require("./util");

const player1 = createPlayer();
const player2 = createPlayer();

let hand = {
	actualRound: 1,
	points: 1,
	roundPoints: [],
};

let game = {
	status: "100",
};

let allCards = [];
let tableCards = { challenger: "", oponent: "" };
let manilha = "";

const _ = require("lodash");

const init = (msgObject) => {
	player1.member = msgObject.client.users.cache.get(
		msgObject.mentions.users.first().id
	);
	player2.member = msgObject.author;

	game.status = 101;
};

const sendCards = (cards, msgObject) => {
	if (msgObject.mentions.users.first() !== undefined) {
		player2.member.send("Suas cartas são: ");
		player1.member.send("Suas cartas são: ");
		for (var i = 0; i < 6; i++) {
			var card = cards.splice(randomInt(0, 39 - i), 1)[0];

			let cardName = translateAcronym(card);
			let embed = new Discord.MessageEmbed()
				.setTitle(cardName)
				.setColor("#0099ff")
				.addFields({
					name: "Jogar " + cardName,
					value: "!j " + cardName,
				})
				.attachFiles(folder + "/" + card + ".png")
				.setThumbnail("attachment://" + card + ".png");

			if (i % 2 == 0) {
				player2.cards.push(card);
				player2.member.send(embed);
			} else {
				player1.cards.push(card);
				player1.member.send(embed);
			}
		}
	}
	generateCommands(msgObject.client);
	allCards = cards;
};

const generateCommands = () => {
	let commands = {};
	for (var i = 0; i < player1.cards.length; i++) {
		var card = player1.cards[i];
		let command = "!j " + translateAcronym(card);
		commands[command] = (msgObject) => {
			tableCards.oponent = card;
			_.remove(player1.cards, card);
			msgObject.channel.send(
				player1.member.id + " jogou " + translateAcronym(card)
			);
		};
	}

	for (var i = 0; i < player2.cards.length; i++) {
		var card = player2.cards[i];
		let command = "!j " + translateAcronym(card);
		commands[command] = (msgObject) => {
			if (status) {
				tableCards.oponent = card;
				_.remove(player2.cards, card);
				msgObject.channel.send(
					player2.member.id + " jogou " + translateAcronym(card)
				);
			}
		};
	}

	return commands;
};

let suiteRules = {
	C: 4,
	H: 3,
	S: 2,
	D: 1,
};

let numberRules = {
	"4": 1,
	"5": 2,
	"6": 3,
	"7": 4,
	Q: 5,
	J: 6,
	K: 7,
	A: 8,
	"2": 9,
	"3": 10,
};

const verifyRoundWinner = (cCard, oCard) => {
	let cPoints, oPoints;

	cPoints = cCard[0] === manilha ? suiteRules[cCard[1]] : numberRules[cCard[0]];
	oPoints = oCard[0] === manilha ? suiteRules[oCard[1]] : numberRules[oCard[0]];
};

exports.sendCards = sendCards;
exports.generateCommands = generateCommands;
exports.init = init;

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

/*
    100: jogo não iniciou e não tem nenhuma proposta
    101: proposta feita mas não aceita 
    200: jogo esta rodando mas não houve jogadas 
    201: jogo esta rodando e alguem fez alguma jogada esperando o oponente
    :  
*/
