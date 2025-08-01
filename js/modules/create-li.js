export default function criarLiElement(descricao) {
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
}
