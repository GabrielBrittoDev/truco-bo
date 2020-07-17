

const createPlayer = (member = Object, cards = [], points = 0 ) => {
    var player = {};
    player.member = member;
    player.cards = cards;
    player.points = points;

    return player;
} ;





exports.createPlayer = createPlayer;