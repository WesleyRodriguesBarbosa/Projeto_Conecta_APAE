import { useEffect, useState } from 'react';

function App() {
  const [info, setInfo] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Consome a rota do container de backend mapeado na porta 3000
    fetch('http://localhost:3000/api/status')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao falar com o backend');
        return res.json();
      })
      .then((data) => setInfo(data))
      .catch((err) => setErro(err.message));
  }, []); // 🛠️ Correção: Removido o termo inválido "sample_code," que quebrava a sintaxe

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#00c853' }}>🚀 Fullstack Docker - Status do Sistema</h1>
      
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px' }}>
        <h2>💻 Frontend: <span style={{ color: '#2196f3' }}>Vite + React OK!</span></h2>
        
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />

        {erro && (
          <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>❌ Erro de comunicação: {erro}</p>
        )}

        {info ? (
          <div>
            <p><strong>Status Geral:</strong> <span style={{ color: '#4caf50' }}>{info.status}</span></p>
            <p><strong>API Backend:</strong> {info.backend}</p>
            <p><strong>Banco de Dados:</strong> <span style={{ color: '#ff9800' }}>{info.database}</span></p>
          </div>
        ) : (
          !erro && <p>Carregando status do ecossistema...</p>
        )}
      </div>
    </div>
  );
}

export default App;
