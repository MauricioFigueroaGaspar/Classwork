console.log("Hello world\n\n");


const sw = require('star-wars-quotes');
console.log(sw() + "\n");


const { randomSuperhero } = require('superheroes');
const { randomSupervillain } = require('supervillains');
const hero = randomSuperhero();
const villain = randomSupervillain();

console.log(`
---- THE (VERY CLEARLY) EPIC BATTLE BEGINS ----

CRISIS ALERT: ${villain} has emerged from the shadows, threatening to destroy the city!
BUT WAIT! Flying down from the sky, ${hero} arrives to save the day!

*CLASH! BAM! POW!*

The terrain shatters as hero exchanges devastating blows with ${villain}.`);

const outcomes = [
    `Victory! ${hero} manages to outsmart ${villain} and throws them straight into a maximum-security prison!`,
    `Catastrophe! ${villain} overpowers ${hero} and escapes into the night, plotting their next move...`,
    `Stalemate! Both titans collapse out of pure exhaustion. The battle ends in a draw, but the war is far from over.`
];
const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

console.log(`\n${randomOutcome}`);
console.log("\n-----------------------------------------------\n");


const fs = require('node:fs');
console.log("\nSecret message:");
try {
    const data = fs.readFileSync('./data/input.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}