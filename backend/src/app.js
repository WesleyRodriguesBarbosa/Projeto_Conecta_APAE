import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

class App {
  constructor() {
    this.app = express();
    
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json()); // Permite receber JSON no corpo das requisições
  }

  routes() {
    // Prefixa todas as rotas com /api (ex: /api/status)
    this.app.use('/api', userRoutes);
  }
}

// Exportamos apenas a instância do express configurada
export default new App().app;
