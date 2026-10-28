import { UserService } from '../services/userService.js';
import { UserResponseDto } from '../dtos/userDto.js';

const service = new UserService();

export class UserController {
  async register(req, res) {
    try {
      const { nome, endereco, telefone, email, vinculo, ativo, observacao } = req.body;
      
      const user = await service.registerUser({ 
        nome, 
        endereco, 
        telefone, 
        email, 
        vinculo, 
        ativo: ativo ?? true, // Se não for enviado, inicia como ativo (true)
        observacao 
      });
      
      const responseData = new UserResponseDto(user);

      return res.status(201).json({
        message: 'Cadastro realizado com sucesso!',
        usuario: responseData
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}