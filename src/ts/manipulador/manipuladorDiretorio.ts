import path from "path"

export default class ManipuladorDiretorio {
    public diretorioFonte: string
    public diretorioVideo: string
    public diretorioProjeto: string
    constructor() {
        this.diretorioFonte = 'src'
        this.diretorioProjeto = this.construirCaminhoDiretorioProjeto()
        this.diretorioVideo = path.join(this.diretorioProjeto, 'video')
    }

    private construirCaminhoDiretorioProjeto(): string {
        let diretorioArquivoClasse = __dirname
        let partes = diretorioArquivoClasse.split(this.diretorioFonte)
        let diretorioProjeto = partes[0]
        return diretorioProjeto
    }

    public construirCaminhoArquivoVideo(nomeArquivo: string): string {
        return path.join(this.diretorioVideo, nomeArquivo)
    }
}