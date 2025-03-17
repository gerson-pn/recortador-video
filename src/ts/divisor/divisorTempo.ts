import IntevaloTempo from "../tipos/intervaloTempo"

export default class DivisorTempo {
    private tempoTotal: number
    private tempoDuracaoCorte: number
    constructor(tempoTotal: number, tempoDuracaoCorte: number) {
        this.tempoTotal = tempoTotal
        this.tempoDuracaoCorte = tempoDuracaoCorte
    }

    public calcularFaixasTempo(): IntevaloTempo[] {
        if (this.tempoDuracaoCorte <= 0 || this.tempoTotal <= 0) {
            throw new Error("A duração do corte e do tempo total de vídeo devem ser maior que zero.");
        }
        if (this.tempoDuracaoCorte > this.tempoTotal) {
            throw new Error("O tempo total de vídeo deve ser maior que a duração do corte.");
        }
        const intevalosTempo: IntevaloTempo[] = []
        const quantidadesCortesInteiros = Math.floor(this.tempoTotal / this.tempoDuracaoCorte)
        const tempoTotalVideoRecortado = quantidadesCortesInteiros * this.tempoDuracaoCorte
        let tempoCorteRestante = this.tempoTotal - tempoTotalVideoRecortado

        console.log(`Iniciando a divisão de intervalos de tempo de cortes:`)
        console.log(`Quantidades de cortes inteiros: ${quantidadesCortesInteiros}`)
        console.log(`Tempo total de vídeo recortado: ${tempoTotalVideoRecortado}`)
        console.log(`Tempo de corte restante: ${tempoCorteRestante}`)

        if (tempoCorteRestante === 0) {
            let tempoInicioCorte = 0
            for (let corte = 0; corte < quantidadesCortesInteiros; corte++) {
                let intervaloTempo: IntevaloTempo = {
                    tempoInicioCorte: tempoInicioCorte,
                    tempoDuracaoCorte: this.tempoDuracaoCorte
                }
                intevalosTempo.push(intervaloTempo)
                tempoInicioCorte += this.tempoDuracaoCorte
            }
        } else {
            let tempoInicioCorte = 0
            for (let corte = 0; corte < quantidadesCortesInteiros; corte++) {
                let intervaloTempo: IntevaloTempo = {
                    tempoInicioCorte: tempoInicioCorte,
                    tempoDuracaoCorte: this.tempoDuracaoCorte
                }
                intevalosTempo.push(intervaloTempo)
                tempoInicioCorte += this.tempoDuracaoCorte
            }

            let intervaloTempo: IntevaloTempo = {
                tempoInicioCorte: tempoInicioCorte,
                tempoDuracaoCorte: tempoCorteRestante
            }
            intevalosTempo.push(intervaloTempo)
        }

        return intevalosTempo
    }
}