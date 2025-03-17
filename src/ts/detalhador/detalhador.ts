import ffmpeg from 'fluent-ffmpeg';
import { configurarFfmpeg } from "../configuracao/ffmpegConfiguracao"
import os from 'os';
import VideoMetaDado from '../tipos/videoMetaDado';

configurarFfmpeg()

export default class Detalhador {
    private caminhoVideo: string
    constructor(caminhoVideo: string) {
        this.caminhoVideo = caminhoVideo
    }

    private obterNomeArquivoVideo(caminhoVideo: string): string {
        let plataforma = os.platform()
        if (plataforma === 'win32') {
            return caminhoVideo.split('\\').pop() || ''
        } else {
            return caminhoVideo.split('/').pop() || ''
        }
    }

    private obterExtensaoArquivoVideo(nomeArquivo: string): string{
        return nomeArquivo.split('.').pop() || ''
    }

    private async extrairMetadados(): Promise<VideoMetaDado> {
        console.log(`Arquivo para obter metadados: ${this.caminhoVideo}`)
        return new Promise((resolve, reject) => {
            ffmpeg(this.caminhoVideo)
                .ffprobe((err, metadados) => {
                    if (err) {
                        return reject(`Erro ao extrair metadados do vídeo: ${err.message}`)
                    }
                    const nome = this.obterNomeArquivoVideo(this.caminhoVideo)
                    /** tempoTotal pode ser indefinido. Por isso a condição boleana: || 0
                     * Assim, há garantia que o tempo não será menor que zero ou indefinido
                     */
                    const tempoTotal = metadados.format.duration || 0
                    const extensaoArquivo = this.obterExtensaoArquivoVideo(nome)

                    console.log(`Metadados extraídos:`)
                    console.log(`Nome: ${nome}`)
                    console.log(`Tempo de duração total do vídeo(s.ms): ${tempoTotal}`)


                    resolve({
                        nome: nome,
                        tempoTotal: tempoTotal,
                        extensaoArquivo: extensaoArquivo
                    });
                });
        });
    }

    public async obterMetadados(): Promise<VideoMetaDado> {
        try {
            return await this.extrairMetadados();
        } catch (err) {
            console.error('Erro ao obter metadados em objeto do tipo JSON:', err);
            throw err;
        }
    }
}