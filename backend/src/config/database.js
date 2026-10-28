import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'db', // Ajustado para 'db' que é o padrão do container MySQL no Docker
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'meu_banco_dados',
  port: parseInt(process.env.DB_PORT || '3306', 10)
};

// Criamos um Pool de Conexões usando Promises (essencial para o async/await funcionar)
const pool = mysql.createPool(dbConfig);

// Exportação default que o statusRepository estava procurando e não encontrava
export default pool;
