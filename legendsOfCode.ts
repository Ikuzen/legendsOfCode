/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// TODO : handle lethal
// 

// game loop
while (true) {

    class Card {
        cardNumber: number;
        instanceId: number;
        location: number;
        cardType: number;
        cost: number;
        attack: number;
        defense: number;
        abilities: string;
        constructor(cardNumber: number, instanceId: number, location: number, cardType: number, cost: number, attack: number, defense: number, abilities: string) {
            this.cardNumber = cardNumber;
            this.instanceId = instanceId;
            this.location = location;
            this.cardType = cardType;
            this.cost = cost;
            this.attack = attack;
            this.defense = defense;
            this.abilities = abilities;
        }
    }

    function getEnemyToAttack(attackingCrea: Card) {
        const creature = creatureToKillThisTurn.find((creature) => {
            if (creature.defense > 0) {
                creature.defense -= attackingCrea.attack;
                return true;
            };
        });
        return creature ? creature.instanceId : -1;
    }

    function orderHand() {
        currentHand = currentHand.sort((a, b) => (a.cost > b.cost) ? -1 : ((b.cost > a.cost) ? 1 : 0));
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
    let cardsToAttackThisTurn: Card[] = [];
    let creatureToKillThisTurn: Card[] = [];
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

    if (!isDraftPhase) { // BATTLE PHASE
        // enemy board
        for (let card of currentEnemyBoard) {
            if (card.abilities.match(/G/g) && card.abilities.match(/G/g).length > 0) creatureToKillThisTurn.push(card);
        };
        // //ally board 
        for (let card of currentAllyBoard) {
            cardsToAttackThisTurn.push(card);
        };
        //hand phase
        orderHand();
        for (let card of currentHand) {
            if (card.cost <= currentMana) {
                if (card.cardType === 0) {
                    // any other minion 
                    cardsToPlayThisTurn.push(card);
                    currentMana -= card.cost;
                } else {
                    // case spell
                    if (currentEnemyBoard.length === 0 && card.cardType === 2) { // case empty board and red spell

                    } else if(card.cardType === 1 && currentAllyBoard.length >0) {
                        
                        cardsToPlayThisTurn.push(card);
                        currentMana -= card.cost;
                    }
                }
            };
        }
    } else {
        //DRAFT PHASE
        let idealCard: number[] = [];
        let goodCard: number[] = [];
        let otherCards: number[] = [];
        let i = 0
        let deck: Card[] = []
        let deckCurve = {
            0:0,
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        };
        let cardScores:number[] =[];

        let calculateScore = (card:Card)=>{
            if(card.cardType === 0) return (card.attack + card.defense)*
        }
        for (let card of currentHand) {
            // draft algo -> pick cheap cards, and monsters


            if (card.cost <= 3) {
                if (card.cardType === 0) {
                    idealCard.push(i);
                } else {
                    goodCard.push(i);
                }
            }
            else {
                otherCards.push(i)
            }
            i++
        }
        if (idealCard.length) {
            cardToDraft = "PICK " + idealCard[0];
        } else if (goodCard.length) {
            cardToDraft = "PICK " + goodCard[0];
        } else if (otherCards.length) {
            cardToDraft = "PICK " + otherCards[0];
        }
        
    }


    // resolving Phase
    if (isDraftPhase) { // draft phase
        console.log(cardToDraft)
    } else { // battle phase
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
                        creatureToKillThisTurn[0] ? id = creatureToKillThisTurn[0].instanceId : (currentEnemyBoard[0].instanceId ? id = currentEnemyBoard[0].instanceId : -1)
                        playString += `USE ${card.instanceId} ${id};`
                        break;
                    // blue spells
                    case 3:
                        playString += `USE ${card.instanceId} -1;`
                        break;

                }
            });

            // removing played cards.
            cardsToPlayThisTurn = cardsToPlayThisTurn.splice(0, cardCount);

            //attack phase
            cardsToAttackThisTurn.forEach((crea) => {
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
}
