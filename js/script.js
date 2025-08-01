const formTarefa = document.querySelector('.form-tarefa');
const inputAdicionarTarefa = document.querySelector('.tarefa-input');
const containerTarefas = document.querySelector('ul');
const lixeiraIconeTarefas = document.querySelectorAll('.lixeira');
const textoInfo = document.querySelector('.texto-info');
const containerModal = document.querySelector('.container-modal');
const btnFecharModal = document.querySelector('.fechar-modal');

let tarefas = [];

const criarLiElement = descricao => {
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

const deletarTarefa = e => {
  const liElement = e.target.closest('li');
  const descricaoTarefa = liElement.querySelector('div:first-child span').innerText;

  if (tarefas.includes(descricaoTarefa)) {
    liElement.remove();

    tarefas = tarefas.filter(tarefa => tarefa !== descricaoTarefa);

    if (tarefas.length === 0) {
      textoInfo.classList.remove('hidden');
      containerTarefas.classList.remove('ativo');
    }
  }
};

const finalizarTarefa = e => {
  const checkbox = e.target.closest('.tarefa-descricao').previousElementSibling;

  if (!checkbox.checked) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
};

const isTruncada = element => {
  return element.scrollWidth > element.clientWidth;
};

const toggleModal = () => {
  containerModal.classList.toggle('ativo');
};

const cliqueForaModal = event => {
  if (event.target === containerModal) {
    toggleModal();
  }
};

const handleClick = event => {
  if (event.target.closest('.lixeira')) {
    deletarTarefa(event);
  }

  if (event.target.closest('.tarefa-descricao') && !isTruncada(event.target.closest('.tarefa-descricao'))) {
    finalizarTarefa(event);
  }

  if (event.target.closest('.tarefa-descricao') && isTruncada(event.target.closest('.tarefa-descricao'))) {
    const descricaoCompleta = event.target.innerText;
    const paragrafo = containerModal.querySelector('p');
    paragrafo.innerText = descricaoCompleta;
    toggleModal();
  }
};

formTarefa.addEventListener('submit', e => {
  e.preventDefault();
  adicionarTarefa();
});

containerTarefas.addEventListener('click', handleClick);

btnFecharModal.addEventListener('click', toggleModal);
containerModal.addEventListener('click', cliqueForaModal);
