import { useState } from 'react';

export function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    vinculo: '',
    ativo: true,
    observacao: ''
  });
  const [mensagem, setMensagem] = useState({ texto: '', erro: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem({ texto: '', erro: false });

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao realizar o cadastro.');
      }

      setMensagem({ texto: data.message, erro: false });
      setFormData({
        nome: '',
        endereco: '',
        telefone: '',
        email: '',
        vinculo: '',
        ativo: true,
        observacao: ''
      });
    } catch (err) {
      setMensagem({ texto: err.message, erro: true });
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '25px', fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#00c853', textAlign: 'center', marginBottom: '20px' }}>🚀 Cadastro - Conecta Apae</h2>
      
      <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Nome Completo *</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Endereço *</label>
          <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
            <label>Telefone *</label>
            <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required placeholder="(62) 99999-9999" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
            <label>Vínculo Institucional *</label>
            <select name="vinculo" value={formData.vinculo} onChange={handleChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '36px', backgroundColor: '#fff' }}>
              <option value="">Selecione...</option>
              <option value="Colaborador">Colaborador / Professor</option>
              <option value="Voluntário">Voluntário</option>
              <option value="Responsável">Responsável / Pai / Mãe</option>
              <option value="Assistido">Assistido (Aluno)</option>
              <option value="Doador">Doador / Parceiro</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>E-mail *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 0' }}>
          <input type="checkbox" name="ativo" id="ativo" checked={formData.ativo} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
          <label htmlFor="ativo" style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>Vínculo Ativo com a APAE</label>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Observação</label>
          <textarea name="observacao" value={formData.observacao} onChange={handleChange} rows="3" placeholder="Informações médicas relevantes, restrições ou notas gerais..." style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} />
        </div>

        <button type="submit" style={{ padding: '12px', backgroundColor: '#00c853', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
          Salvar Registro
        </button>
      </form>

      {mensagem.texto && (
        <p style={{ marginTop: '20px', textAlign: 'center', fontWeight: 'bold', color: mensagem.erro ? '#d32f2f' : '#4caf50' }}>
          {mensagem.erro ? '❌ ' : '✔️ '} {mensagem.texto}
        </p>
      )}
    </div>
  );
}