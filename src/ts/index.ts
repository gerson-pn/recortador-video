import Detalhador from "./detalhador/detalhador"
import DivisorTempo from "./divisor/divisorTempo"
import ManipuladorDiretorio from "./manipulador/manipuladorDiretorio"
import Recortador from "./recortador/recortador"

const nomeVideoOriginal = 'video.mp4'
const tempoDuracaoCorte = 10
let manipuladorDiretorio = new ManipuladorDiretorio()
const caminhoVideoOriginal = manipuladorDiretorio.construirCaminhoArquivoVideo(nomeVideoOriginal)

console.log(`Caminho do vídeo original:\n${caminhoVideoOriginal}`)

let detalhador = new Detalhador(caminhoVideoOriginal)
let metadados = detalhador.obterMetadados()
metadados.then(dados => {

    let divisorTempo = new DivisorTempo(dados.tempoTotal, tempoDuracaoCorte)
    let intervalosTempo = divisorTempo.calcularFaixasTempo()

    console.log(`Intervalos de tempo definidos para recorte do vídeo original:`)
    intervalosTempo.forEach(intervaloTempo => {
        console.log(`tempo de início do corte em segundos: ${intervaloTempo.tempoInicioCorte}, intervalo de duração do corte em segundos: ${intervaloTempo.tempoDuracaoCorte}`)
    })

    for (let index = 0; index < intervalosTempo.length; index++) {
        let intervaloTempo = intervalosTempo[index]
        if ((index + 1) < 10) {
            let recortador = new Recortador(dados.nome, `corte-${0}${index + 1}.${dados.extensaoArquivo}`, intervaloTempo.tempoInicioCorte, intervaloTempo.tempoDuracaoCorte)
            recortador.recortarVideo()
        } else if ((index + 1) >= 10 && (index + 1) < 100) {
            let recortador = new Recortador(dados.nome, `corte-${index + 1}.${dados.extensaoArquivo}`, intervaloTempo.tempoInicioCorte, intervaloTempo.tempoDuracaoCorte)
            recortador.recortarVideo()
        } else {
            let recortador = new Recortador(dados.nome, `corte-${index + 1}.${dados.extensaoArquivo}`, intervaloTempo.tempoInicioCorte, intervaloTempo.tempoDuracaoCorte)
            recortador.recortarVideo()
        }
    }
})