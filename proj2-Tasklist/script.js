const itemForm = document.getElementById('item-form');
const itemContainer = document.getElementById('item-container');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('div-filter');
const inputFilter = document.getElementById('filter');
// const itemEdit = document.getElementsByTagName('span');


function displayItems() {
    const itemStorage = getItemfromStorage();
    itemStorage.forEach((item) => addItemToDOM(item)); 
    checkUI();    
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    
    //Validate input
    if (newItem === ''){
        alert('Please add an item');
        return;
    } 

    if (checkIfItemExists(newItem)){
        alert('That item already exist!');
        return;
    }

   addItemToDOM(newItem); // Add item to DOM
   addItemToStorage(newItem); // Add item to local storage
   checkUI();

   itemForm.reset();
   itemInput.focus();
}

function addItemToDOM (item){

    //Create list item
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.setAttribute('contenteditable','');

    const checkbox = createCheckbox();
    const button = createButton('remove-item btn-remove');

    li.appendChild(div);
    div.appendChild(checkbox);
    div.appendChild(span);
    span.appendChild(document.createTextNode(item));
    li.appendChild(button);

    itemList.append(li); // Add li to DOM
}

function createButton (classes){
    const button = document.createElement('button');
    const icon = document.createElement('i');

    button.className = classes;
    icon.className = 'fa-solid fa-xmark';

    button.appendChild(icon);

    return button;
}

function createCheckbox (){
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id='checkbox';
    return checkbox;
}

function addItemToStorage(item){
    const itemStorage = getItemfromStorage();
    
    //Add new item to array
    itemStorage.push(item); 

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemStorage));
}

function getItemfromStorage(item){
    let itemStorage;

    if (localStorage.getItem('items') === null){
        itemStorage = [];
    } else {
        itemStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemStorage;
}

function onClickItem(e){

    // const btnRemove = document.getElementsByClassName('remove-item btn-remove');

    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);

    } else if(e.target.hasAttribute('contenteditable')) {
        const updatedItem = e.target.textContent;
       
        // const btnEdit = e.target.parentElement.nextElementSibling;
        // btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i> ';
        // console.log(btnEdit);

       removeItemFromStorage(e.target.textContent);
       addItemToStorage(updatedItem);

    } else if(e.target.type === 'checkbox'){
        const checkbox = e.target;

        if (checkbox.checked){
            e.target.parentElement.parentElement.classList.add('item-complete');
            e.target.nextElementSibling.removeAttribute('contenteditable');
        } else {
            e.target.parentElement.parentElement.classList.remove('item-complete');
            e.target.nextElementSibling.setAttribute('contenteditable','');
        }
    }
}

function checkIfItemExists(item) {
    const itemStorage = getItemfromStorage();
    return itemStorage.includes(item);
}

function removeItem(item){
    if(confirm('Are you sure?')){

        //Remove item from DOM
        item.remove();

        //Remove item from local storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function clearItems(e){

    if (confirm('Are you sure you want to remove all?')){
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild);
        }
        // Clear from Local Storage
        localStorage.removeItem('items');

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemStorage = getItemfromStorage();
  
    // Filter out item to be removed
    itemStorage = itemStorage.filter((i) => i !== item);
  
    // Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemStorage));
}

function filterItems(e){
    const items = document.querySelectorAll('span');
    const text = e.target.value.toLowerCase();
    

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text) != -1){
           item.parentElement.parentElement.style.display = 'flex';
        } else {
            item.parentElement.parentElement.style.display = 'none';
        }
    });
}

function checkUI(){

    const items = itemList.querySelectorAll('li');

    // Empty state to DOM
    const divEs = document.createElement('div');
    divEs.className='empty-state';
    const img = document.createElement('img');
    img.alt='Empty state - task board sleeping';
    img.src ='images/empty.jpg';
    const msg = document.createElement('h3');
    msg.textContent="Did someone say 'to-do list'? Nah, I think they meant 'tah-dah' list, because there's nothing to do!";
    const emp = document.querySelectorAll('.empty-state');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';

        if (emp.length === 0) {
            divEs.appendChild(img);
             divEs.appendChild(msg);
            itemContainer.appendChild(divEs);
        }
        
      } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';

        //Remove empty state if there's item
        
        emp.forEach((e) => e.parentNode.removeChild(e));
      }
}

// prevent new lines with Enter
itemList.addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  });

function init (){
    // Event Listeners //
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    inputFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
    
}

init();

