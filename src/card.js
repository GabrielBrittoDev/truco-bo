
const fs = require('fs');



const getAllCards = (folder) => {
    let files = [];
    fs.readdirSync(folder).forEach(file => {
        let fileName = file.replace('.png', '');
        files.push(fileName);
    })
    return files;
}


const translateAcronym = (card) => {
    const translations = {
        'S' : 'espadas',
        'D' : 'ouros',
        'H' : 'coração',
        'C' : 'paus',
        'K' : 'rei',
        'J' : 'valete',
        'Q' : 'dama',
        'A' : 'ás'
    }

    let number = isNaN(card[0]) ? translations[card[0]] : card[0];
    
    return number + ' de ' + translations[card[1]];
}

exports.getAllCards = getAllCards;
exports.translateAcronym = translateAcronym;