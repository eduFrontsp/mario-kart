const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRA: 3,
    PODER: 3,
    PONTOS: 0,
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRA: 4,
    PODER: 4,
    PONTOS: 0,
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result 

    switch(true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"

    }
    return result
}

async function logRoll(characterName, block, diceResult, attribute) {
     console.log(`${characterName} aconteceu um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`Rodada ${round}`)

        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
        let testSkill1 = 0
        let testSkill2 = 0

        if (block === "RETA") {
            testSkill1 = diceResult1 + character1.VELOCIDADE
            testSkill2 = diceResult2 + character1.VELOCIDADE

            await logRoll(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE)
            await logRoll(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE)
        }
        if (block === "CURVA") {
            testSkill1 = diceResult1 + character1.MANOBRA
            testSkill2 = diceResult2 + character1.MANOBRA

            await logRoll(character1.NOME, "velocidade", diceResult1, character1.MANOBRA)
            await logRoll(character2.NOME, "velocidade", diceResult2, character2.MANOBRA)
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult1 + character1.PODER

            console.log(`${character1.NOME} confrontou com ${character2.NOME}`)

            await logRoll(character1.NOME, "poder", diceResult1, character1.PODER)
            await logRoll(character2.NOME, "poder", diceResult2, character2.PODER)

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu confronto ${character2.NOME} perdeu um ponto`)
                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu confronto ${character1.NOME} perdeu um ponto`)
                character1.PONTOS--;
            }


            console.log(powerResult2 === powerResult1 ?  "Deu empate o confronto" : "")

        }

        if (testSkill1 > testSkill2) {
            console.log(`${character1.NOME} marcou um ponto`)
            character1.PONTOS++
        } else if (testSkill2 > testSkill1) {
            console.log(`${character2.NOME} marcou um ponto`)
            character2.PONTOS++
        }
        console.log("--------------------------------------")
    }
}

async function declareWinner(character1, character2) {
    console.log("RESULTADO FINAL")
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos`)
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos`)

    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n${character1.NOME} venceu a corrida`)
    else if (character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida`)
    else
        console.log("A corrida terminou empatada")

}

(async function Main() {
    console.log(`corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`)

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()
