const insertButton = document.querySelector('.page__insert-button-wrapper').querySelector('button');
const editor = document.querySelector('.editor');
const templatesList = document.querySelector('.template__list');

const onInsertButtonClick = () => {
    const select = document.createElement('select');
    select.name = 'template';
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Please choose an option";
    select.appendChild(defaultOption);

    const optionsList = templatesList.querySelectorAll('li');
    optionsList.forEach((option) => {
        const newOption = document.createElement('option');
        newOption.value = `option-${option.dataset.number}`;
        newOption.textContent = option.textContent;
        select.appendChild(newOption);
    });

    editor.appendChild(select);
}

insertButton.addEventListener('click', onInsertButtonClick);

