import pool from '../config/database.js';

export class UserRepository {
  // Busca se o e-mail já existe para não deixar duplicar
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0] || null;
  }

  // Insere o novo usuário com todos os dados da APAE
  async create({ nome, endereco, telefone, email, vinculo, ativo, observacao }) {
    // Converte o booleano (true/false) do JavaScript para 1 ou 0 do MySQL
    const ativoValue = ativo ? 1 : 0;

    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, endereco, telefone, email, vinculo, ativo, observacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, endereco, telefone, email, vinculo, ativoValue, observacao]
    );
    
    // Busca o usuário que acabou de ser inserido para retornar ao frontend
    const [newUser] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [result.insertId]);
    return newUser[0];
  }
}