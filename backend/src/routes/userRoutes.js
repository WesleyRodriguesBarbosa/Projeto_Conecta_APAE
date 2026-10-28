import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const routes = Router();
const controller = new UserController();

// Rota que recebe os dados do formulário de cadastro
routes.post('/usuarios', controller.register);

export default routes;