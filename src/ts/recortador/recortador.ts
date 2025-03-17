import { configurarFfmpeg } from "../configuracao/ffmpegConfiguracao"
import ffmpeg from 'fluent-ffmpeg';
import ManipuladorDiretorio from "../manipulador/manipuladorDiretorio";

configurarFfmpeg()

export default class Recortador {
    private nomeVideoOriginal: string
    private nomeVideoRecorte: string
    private manipuladorDiretorio: ManipuladorDiretorio

    private tempoInicioCorte: number
    private tempoDuracaoCorte: number

    constructor(
        nomeVideoOriginal: string,
        nomeVideoRecorte: string,
        tempoInicioCorte: number,
        tempoDuracaoCorte: number) {
        this.nomeVideoOriginal = nomeVideoOriginal
        this.nomeVideoRecorte = nomeVideoRecorte
        this.manipuladorDiretorio = new ManipuladorDiretorio()
        this.tempoInicioCorte = tempoInicioCorte
        this.tempoDuracaoCorte = tempoDuracaoCorte
    }
    public recortarVideo() {
        ffmpeg(this.manipuladorDiretorio.construirCaminhoArquivoVideo(this.nomeVideoOriginal))
            .setStartTime(this.tempoInicioCorte)
            .setDuration(this.tempoDuracaoCorte)
            .output(this.manipuladorDiretorio.construirCaminhoArquivoVideo(this.nomeVideoRecorte))
            .on('end', () => {
                console.log(`O vídeo ${this.nomeVideoRecorte} foi recortado com sucesso!`);
            })
            .on('error', (err) => {
                console.error('Erro ao recortar o vídeo:', err);
            })
            .run();
    }
}