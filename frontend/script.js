const form = document.getElementById('agendamentoForm');
const mensagem = document.getElementById('mensagem');
const lista = document.getElementById('listaAgendamentos');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    telefone: document.getElementById('telefone').value,
    endereco: document.getElementById('endereco').value,
    especialidade: document.getElementById('especialidade').value,
    data_consulta: document.getElementById('data_consulta').value
  };
  try {
    const res = await fetch('http://localhost:3000/api/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const result = await res.json();
    mensagem.textContent = result.mensagem || result.erro;
    form.reset();
    carregarAgendamentos();
  } catch (err) {
    mensagem.textContent = 'Erro ao enviar dados.';
  }
});

async function carregarAgendamentos() {
  try {
    const res = await fetch('http://localhost:3000/api/agendamentos');
    const agendamentos = await res.json();
    lista.innerHTML = '';
    agendamentos.forEach((a) => {
      const item = document.createElement('li');
      item.textContent = `${a.nome} - ${a.data_consulta} - ${a.especialidade}`;
      lista.appendChild(item);
    });
  } catch (err) {
    lista.innerHTML = '<li>Erro ao carregar agendamentos</li>';
  }
}
carregarAgendamentos();