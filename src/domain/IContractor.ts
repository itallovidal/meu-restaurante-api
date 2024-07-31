export interface IContractor {
  email: string
  id: string
  mensagem_sucesso: string
  nome: string
  senha: string
  telefone: string
  profile_image: string
  qrCode_image: string
  siteInstitucional: string | null
  instagram: string | null
  facebook: string | null
  linkedin: string | null
  youtube: string | null
  URLCadastro: string
}

interface IPartido {
  partido_nome: string | null
  partido_sigla: string | null
}

export interface IPolitic extends IContractor {
  partido: IPartido
}
