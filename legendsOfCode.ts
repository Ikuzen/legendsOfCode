/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// TODO : handle lethal
// 
class Card {
    cardNumber: number;
    instanceId: number;
    location: number;
    cardType: number;
    cost: number;
    attack: number;
    defense: number;
    abilities: string;
    score: number;
    draftNumber: number;
    constructor(cardNumber: number, instanceId: number, location: number, cardType: number, cost: number, attack: number, defense: number, abilities: string) {
        this.cardNumber = cardNumber;
        this.instanceId = instanceId;
        this.location = location;
        this.cardType = cardType;
        this.cost = cost;
        this.attack = attack;
        this.defense = defense;
        this.abilities = abilities;
        this.score = this.calculateScore()
        this.draftNumber = 0;
    }
    calculateScore = () => {
        if (this.cardType === 0) return (this.attack + this.defense) / (this.cost + 1) + this.getAbilitiesScore();
    }
    getAbilitiesScore = () => {
        let abilities: string[] = this.abilities.split('');
        let score = 0;
        for (let ability of abilities) {
            switch (ability) {
                case 'B':
                    score += 2;
                    break;
                case 'C':
                    score += 1;
                    break;
                case 'D':
                    score += 2;
                    break;
                case 'G':
                    score += 1;
                    break;
                case 'L':
                    score += 3;
                    break;
                case 'W':
                    score += 3;
                    break;
                default:
                    break;
            }
        }
        if (abilities.includes('W') && abilities.includes('L')) score += 2
        return score;
    }
}

let deck: Card[] = []
let deckCurve = {
    "0-2": 0,
    "3-6": 0,
    "7+": 0
};
// game loop
while (true) {

    function checkForLethal() { }

    function getTradeScore(ally: Card, enemy: Card): number {
        let score = 0;
        let attackDifferencial = - Math.abs(ally.attack - enemy.defense)
        if (ally.abilities.includes('W')) { }
        return 0;
    }
    function favorableTrade(card: Card): Card | boolean {
        const trades: { card: Card, tradeScore: number }[] = [];
        for (let enemy of currentEnemyBoard) {
            switch (card.cardType) {
                case 0:
                    if (card.attack >= enemy.defense && card.attack <= enemy.attack + 2) {
                        trades.push({ card: enemy, tradeScore: getTradeScore(card, enemy) });
                    } else if (card.attack >= enemy.defense && card.attack <= enemy.attack + 2 && card.defense > enemy.attack) {
                        trades.push({ card: enemy, tradeScore: getTradeScore(card, enemy) })
                    } else if (card.abilities.includes('W') && card.attack <= enemy.defense - 1 && card.attack >= enemy.defense + 2) {
                        trades.push({ card: enemy, tradeScore: getTradeScore(card, enemy) });
                    }
                    break
                case 2:
                    if (card.attack >= enemy.defense && card.attack <= enemy.attack + 2) {
                        trades.push({ card: enemy, tradeScore: getTradeScore(card, enemy) });
                    }
                    break
                case 3:
                    if (card.attack >= enemy.defense && card.attack <= enemy.attack + 2) {
                        trades.push({ card: enemy, tradeScore: getTradeScore(card, enemy) });
                    }
                    break
                default:
                    break
            }
        }
        if (trades.length > 0) {
            trades.map(val => val.tradeScore).reduce(function (a, b) {
                return Math.max(a, b);
            });

        } else {
            return false;
        }
    } return false;
}

function favorableToBuff(card: Card) {
    for (let ally of currentAllyBoard) {
        if (ally.abilities.includes('G')) {
            return ally;
        } else if (ally.abilities.includes('L') && card.defense > 3) {
            return ally;
        }
    }
    return currentAllyBoard[0];
}
function getEnemyToAttack(attackingCrea: Card) {
    let creature = priorityEnemyToKill.find((enemy) => {
        if (enemy.defense > 0) {
            enemy.defense -= attackingCrea.attack;
            return true;
        };
    });

    if (!creature) {
        let trade = favorableTrade(attackingCrea)
        if (typeof trade !== 'boolean') creature = trade;
    }
    return creature ? creature.instanceId : -1;
}


function orderHand() {
    currentHand = currentHand.sort((a, b) => (a.cost > b.cost) ? -1 : ((b.cost > a.cost) ? 1 : 0));
}

function orderDraftChoiceByScore() {
    currentHand = currentHand.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
}
// let getCardsWithType = {
//     'B':()=>{currentAllyBoard.},
//     'C':()=>{card.abilities.match(/C/g) && card.abilities.match(/C/g},
//     'D':()=>{},
//     'G':()=>{},
//     'L':()=>{},
//     'W':()=>{},
// }

let currentMana: number;
let currentHand: Card[] = [];
let currentAllyBoard: Card[] = [];
let currentEnemyBoard: Card[] = [];
let cardsToPlayThisTurn: Card[] = [];
let monstersAttackingThisTurn: Card[] = [];
let priorityEnemyToKill: Card[] = [];
let cardToDraft: string = 'PASS';
let isDraftPhase: boolean = false;

// player and AI HP/mana/deck
for (let i = 0; i < 2; i++) {
    var inputs: string[] = readline().split(' ');
    const playerHealth: number = parseInt(inputs[0]);
    const playerMana: number = parseInt(inputs[1]);
    const playerDeck: number = parseInt(inputs[2]);
    const playerRune: number = parseInt(inputs[3]);
    const playerDraw: number = parseInt(inputs[4]);
    if (i === 0) {
        playerMana > 0 ? currentMana = playerMana : isDraftPhase = true;
    }
}
var inputs: string[] = readline().split(' ');
const opponentHand: number = parseInt(inputs[0]);
const opponentActions: number = parseInt(inputs[1]);


for (let i = 0; i < opponentActions; i++) {
    const cardNumberAndAction: string = readline();
}
const cardCount: number = parseInt(readline());

// card draft OR hand
for (let i = 0; i < cardCount; i++) {
    var inputs: string[] = readline().split(' ');

    let card = new Card(parseInt(inputs[0]), parseInt(inputs[1]), parseInt(inputs[2]), parseInt(inputs[3]), parseInt(inputs[4]), parseInt(inputs[5]), parseInt(inputs[6]), inputs[7]);
    switch (card.location) {
        case 0:
            currentHand.push(card)
            break;
        case 1:
            currentAllyBoard.push(card);
            break;
        case -1:
            currentEnemyBoard.push(card);
            break;
    }
}

if (isDraftPhase) {

    ///////////////
    //DRAFT PHASE//
    ///////////////
    for (let i = 0; i < 3; i++) {
        currentHand[i].draftNumber = i;
    };
    let cardPick: Card = currentHand[0];


    let addToDeckCurve = (card: Card) => {
        if (card.cost <= 2 && card.cost >= 0) {
            deckCurve["0-2"]++;
        } else if (card.cost <= 6 && card.cost >= 3) {
            deckCurve["3-6"]++;
        } else if (card.cost >= 7) {
            deckCurve["7+"]++;
        }
    }
    let cardCurveScore = (card: Card) => {
        if (card.cost <= 2 && card.cost >= 0) {
            return deckCurve["0-2"] <= deckCurve["3-6"] * 4 || deckCurve["0-2"] <= deckCurve["7+"] * 7 ? 1 : -3
        } else if (card.cost <= 6 && card.cost >= 3) {
            return deckCurve["3-6"] * 4 <= deckCurve["0-2"] || deckCurve["3-6"] * 4 <= deckCurve["7+"] * 7 ? 1 : -3
        } else if (card.cost >= 7) {
            return deckCurve["7+"] * 7 <= deckCurve["3-6"] * 4 || deckCurve["7+"] * 7 <= deckCurve["0-2"] ? 1 : -5
        }
    }

    orderDraftChoiceByScore();
    const monsters = currentHand.filter((card) => card.cardType === 0);
    const spells = currentHand.filter((card) => card.cardType !== 0);
    if (monsters) {
        for (let monster of monsters) {
            if (monster.score + cardCurveScore(monster) > cardPick.score + cardCurveScore(cardPick)) {
                cardPick = monster;
            }
        }

    } else { //only pick spells if no monster
        for (let spell of spells) {
            if (spell.score + cardCurveScore(spell) > cardPick.score + cardCurveScore(cardPick)) {
                cardPick = spell;
            }
        }
    }

    addToDeckCurve(cardPick);
    deck.push(cardPick);
    cardToDraft = "PICK " + cardPick.draftNumber;
    console.log(cardToDraft)
}
else {

    //////////////////
    // BATTLE PHASE//
    //////////////////
    // enemy board



    for (let card of currentEnemyBoard) {
        if (card.abilities.match(/G/g) && card.abilities.match(/G/g).length > 0) priorityEnemyToKill.push(card);
    };
    // //ally board 
    for (let card of currentAllyBoard) {
        monstersAttackingThisTurn.push(card);
    };
    //hand phase

    //TODO refactor so the order of play is not deterministic
    orderHand();
    for (let card of currentHand) {
        if (card.cost <= currentMana) {
            if (card.cardType === 0) {
                // any other minion 
                cardsToPlayThisTurn.push(card);
                currentMana -= card.cost;
            } else {
                // case spell
                if (currentEnemyBoard.length > 0 && card.cardType === 2) { // case empty board and red spell
                    cardsToPlayThisTurn.push(card);
                    currentMana -= card.cost;
                } else if (card.cardType === 1 && currentAllyBoard.length > 0) {
                    cardsToPlayThisTurn.push(card);
                    currentMana -= card.cost;
                } else if (card.cardType === 3) {
                    cardsToPlayThisTurn.push(card);
                    currentMana -= card.cost;
                }
            }
        };
    }

    // resolving Phase
    // battle phase
    if (cardsToPlayThisTurn.length === 0 && currentAllyBoard.length === 0) { console.log('PASS'); }
    else {
        let playString: string = "";
        let cardCount: number;

        //play phase
        cardsToPlayThisTurn.forEach((card) => {
            let id;
            switch (card.cardType) {
                // monsters
                case 0:
                    if (currentAllyBoard.length < 6) {
                        playString += `SUMMON ${card.instanceId};`
                        currentAllyBoard.push(card);
                        cardCount++;
                    }
                    break;
                // green spells 
                case 1:
                    if (currentAllyBoard[0]) {
                        id = currentAllyBoard[0].instanceId;
                        playString += `USE ${card.instanceId} ${id};`
                    }
                    break;
                // red spells
                case 2:
                    if (favorableTrade(card)) {
                        playString += `USE ${card.instanceId} ${favorableTrade(card)};`
                    } else {

                        priorityEnemyToKill[0] ? id = priorityEnemyToKill[0].instanceId : (currentEnemyBoard[0].instanceId ? id = currentEnemyBoard[0].instanceId : -1)
                        playString += `USE ${card.instanceId} ${id};`
                        break;
                    }
                // blue spells
                case 3:
                    if (favorableTrade(card)) {
                        playString += `USE ${card.instanceId} ${favorableTrade(card)};`
                    } else {
                        playString += `USE ${card.instanceId} -1;`
                    }
                    break;

            }
        });

        // removing played cards.
        cardsToPlayThisTurn = cardsToPlayThisTurn.splice(0, cardCount);

        //attack phase
        monstersAttackingThisTurn.forEach((crea) => {
            let enemyToAttack = getEnemyToAttack(crea);
            playString += `ATTACK ${crea.instanceId} ${enemyToAttack};`;
        });
        // play cards after attack
        cardsToPlayThisTurn.forEach((card) => {
            if (currentAllyBoard.length < 6) {
                playString += `SUMMON ${card.instanceId};`
                currentAllyBoard.push(card);
            }
        });

        playString ? console.log(playString) : console.log('PASS')
    }
}

