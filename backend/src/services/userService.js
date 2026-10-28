import { UserRepository } from '../repositories/userRepository.js';

const repository = new UserRepository();

export class UserService {
  async registerUser(userData) {
    const { nome, endereco, telefone, email, vinculo } = userData;

    // Campos obrigatórios do formulário institucional
    if (!nome || !endereco || !telefone || !email || !vinculo) {
      throw new Error('Preencha todos os campos obrigatórios (Nome, Endereço, Telefone, E-mail e Vínculo).');
    }

    const userExists = await repository.findByEmail(email);
    if (userExists) {
      throw new Error('Este e-mail já está cadastrado no sistema.');
    }

    const createdUser = await repository.create(userData);
    return createdUser;
  }
}