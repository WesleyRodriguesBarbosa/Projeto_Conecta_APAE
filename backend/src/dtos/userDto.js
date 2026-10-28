export class UserResponseDto {
  constructor(user) {
    this.id = user.id;
    this.nome = user.nome;
    this.endereco = user.endereco;
    this.telefone = user.telefone;
    this.email = user.email;
    this.vinculo = user.vinculo;
    this.ativo = user.ativo === 1; // Transforma o 1 do banco em true
    this.observacao = user.observacao || '';
    this.data_cadastro = user.data_cadastro;
  }
}