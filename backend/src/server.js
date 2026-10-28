import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'usuario_db',
  password: process.env.DB_PASSWORD || 'senha_db',
  database: process.env.DB_NAME || 'meu_banco_dados',
  port: 3306
};

app.get('/api/status', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT VERSION() AS versao');
    await connection.end();

    res.json({
      status: 'Online',
      backend: 'Node.js + Express funcionando no Docker!',
      database: `MySQL conectado com sucesso! Versão: ${rows[0].versao}`
    });
  } catch (error) {
    res.status(500).json({
      status: 'Erro',
      backend: 'Node.js está rodando, mas...',
      database: `Falha ao conectar no MySQL: ${error.message}`
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
