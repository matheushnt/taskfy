const formTarefa = document.querySelector('.form-tarefa');
const inputAdicionarTarefa = document.querySelector('.tarefa-input');
const containerTarefas = document.querySelector('ul');
const lixeiraIconeTarefas = document.querySelectorAll('.lixeira');
const textoInfo = document.querySelector('.texto-info');

let tarefas = [];

const criarLiElement = (descricao) => {
  const newLiElement = document.createElement('li');
  newLiElement.classList.add('tarefa-item');
  newLiElement.innerHTML = `
    <div>
      <label for="tarefa-label">
        <input type="checkbox" name="tarefa-checkbox">
        <span class="tarefa-descricao">${descricao}</span>
      </label>
    </div>
    <div class="lixeira">
      <img src="./img/lixeira-icon.svg" alt="">
    </div>
    `;
  return newLiElement;
};

const adicionarTarefa = () => {
  const descricaoTarefa = inputAdicionarTarefa.value.trim();

  if (descricaoTarefa) {
    const newLiElement = criarLiElement(descricaoTarefa);
    containerTarefas.appendChild(newLiElement);

    textoInfo.classList.add('hidden');
    containerTarefas.classList.add('ativo');

    tarefas.push(descricaoTarefa);
    inputAdicionarTarefa.value = '';
    inputAdicionarTarefa.focus();
  } else {
    alert('Você precisa informar uma tarefa válida');
    inputAdicionarTarefa.focus();
  }
};

const deletarTarefa = (e) => {
  const liElement = e.target.closest('li');
  const descricaoTarefa = liElement.querySelector('div:first-child span').innerText;

  if (tarefas.includes(descricaoTarefa)) {
    liElement.remove();

    tarefas = tarefas.filter((tarefa) => tarefa !== descricaoTarefa);

    if (tarefas.length === 0) {
      textoInfo.classList.remove('hidden');
      containerTarefas.classList.remove('ativo');
    }
  }
};

const handleClick = (e) => {
  if (e.target.closest('.lixeira')) {
    deletarTarefa(e);
  }
};

formTarefa.addEventListener('submit', (e) => {
  e.preventDefault();
  adicionarTarefa();
});

containerTarefas.addEventListener('click', handleClick);
