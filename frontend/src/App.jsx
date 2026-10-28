import { Cadastro } from './components/Cadastro';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#e8f5e9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Renderiza diretamente o formulário de cadastro na tela principal */}
      <Cadastro />
      
    </div>
  );
}

export default App;