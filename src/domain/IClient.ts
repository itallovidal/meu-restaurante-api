export interface IClient {
  email: string
  telefone: string
  endereco: {
    rua: string | null
    cep: string | null
    uf: string
    cidade: string
    bairro: string | null
  }
  data_nascimento: string
  nome: string
  id: string
  sobrenome: string
  created_at: { seconds: number; nanoseconds: number }
}
