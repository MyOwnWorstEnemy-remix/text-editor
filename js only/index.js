const insertButton = document.querySelector('.page__insert-button-wrapper').querySelector('button');
const editor = document.querySelector('.editor');
const templatesList = document.querySelector('.template__list');

function counter () {
    let count = 2;

    return function () {
        count += 1;
        return count;
    };
};

let focusedElement = null;
let cursorPosition = { node: null, offset: 0 };

const storeCursorPosition = () => {
    if (window.getSelection) {
        selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
            cursorPosition.node = range.startContainer;
            cursorPosition.offset = range.startOffset;
        }
    }
}  
              
const restoreCursorPosition = (element) => {
    let range = document.createRange();
    range.setStart(cursorPosition.node, cursorPosition.offset);
    range.collapse(true);
  
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  
    element.focus();
}
  
const insertElementAtCursorPosition = (element, targetEl) => {
    restoreCursorPosition(targetEl);
    let range = document.getSelection().getRangeAt(0);
    range.insertNode(element);
    storeCursorPosition();
}
  
editor.addEventListener("focusin",function(ev){
    focusedElement = ev.target;
    storeCursorPosition();
})
editor.addEventListener("input", function(ev){
    focusedElement = ev.target;
    storeCursorPosition();
})
editor.addEventListener("click", function(ev){
    focusedElement = ev.target;
    storeCursorPosition();
})

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

    insertElementAtCursorPosition(select, focusedElement);
}

insertButton.addEventListener('click', onInsertButtonClick);

const addTemplateButton = document.querySelector('.template__button--add');
const removeTemplateButton = document.querySelector('.template__button--remove');
const templateInput = document.querySelector('.template__input');
const templateNumber = counter();

const addOptionInTemplatesList = (number) => {
    const newOption = document.createElement('li');
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = "radio";
    radio.name = "template";
    radio.value = `option-${number}`;
    label.textContent = `template ${number}`;
    label.appendChild(radio);
    newOption.dataset.number = number;
    newOption.appendChild(label);
    templatesList.appendChild(newOption);
}

addTemplateButton.addEventListener('click', () => {
    const nextOptionNumber = templateNumber();
    addOptionInTemplatesList(nextOptionNumber);

    const selectsList = document.querySelectorAll('select');
    selectsList.forEach((select) => {
        const newOption = document.createElement('option');
        newOption.value = `option-${nextOptionNumber}`;
        newOption.textContent = `template ${nextOptionNumber}`;
        select.appendChild(newOption);
    })
})

removeTemplateButton.addEventListener('click', () => {
    const selected = document.querySelector('input[name="template"]:checked');
    const item = selected.closest('li');
    templatesList.removeChild(item);

    const selectsList = document.querySelectorAll('select');
    selectsList.forEach((select) => {
        const optionsList = select.querySelectorAll('option');
        const selectedOption = select.selectedOptions[0];
        optionsList.forEach((option) => {
            if(option.value === selected.value) {
                if (selectedOption.value !== option.value) {
                    select.removeChild(option);
                } else {
                    option.textContent = 'Error';
                    option.value = 'error';
                }
            }
        });
    })
})