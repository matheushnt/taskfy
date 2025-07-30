const botaoAdicionarTarefa = document.querySelector('.btn');
const inputAdicionarTarefa = document.querySelector('.tarefa-input');
const containerTarefas = document.querySelector('ul');
const lixeiraIconeTarefas = document.querySelectorAll('.lixeira');
const textoInfo = document.querySelector('.texto-info');

let tarefas = [];

const criarLiElement = descricao => {
  const newLiElement = document.createElement('li');
  newLiElement.classList.add('tarefa-item');
  newLiElement.innerHTML = `
    <div>
      <input type="checkbox" name="tarefa-checkbox" id="tarefa-checkbox">
      <label for="tarefa-checkbox" class="visually-hidden">Concluir tarefa</label>
      <p class="tarefa-descricao">${descricao}</p>
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
  } else {
    alert('Você precisa informar uma tarefa válida');
    inputAdicionarTarefa.focus();
  }
};

const deletarTarefa = e => {
  if (e.target.closest('.lixeira')) {
    const liElement = e.target.closest('li');
    const descricaoTarefa = liElement.querySelector('div:first-child p').innerText;

    if (tarefas.includes(descricaoTarefa)) {
      liElement.remove();

      tarefas = tarefas.filter(tarefa => tarefa !== descricaoTarefa);

      if (tarefas.length === 0) {
        textoInfo.classList.remove('hidden');
        containerTarefas.classList.remove('ativo');
      }
    }
  }
};

botaoAdicionarTarefa.addEventListener('click', adicionarTarefa);

containerTarefas.addEventListener('click', deletarTarefa);
