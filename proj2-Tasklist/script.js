const itemForm = document.getElementById('item-form');
const itemContainer = document.getElementById('item-container');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('div-filter');
const inputFilter = document.getElementById('filter');


function displayItems() {
    const itemStorage = getItemfromStorage();
    itemStorage.forEach((item) => addItemToDOM(item)); 
    checkUI();    
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    
    //Validate input
    // if (newItem === ''){
    //     alert('Please add an item');
    //     return;
    // } 

    if (newItem !== ''){
        var itemObj = {
            name: newItem,
            id: new Date().getTime(),
        };
    } else {
        alert('Please add an item');
        return;
    }

    if (checkIfItemExists(newItem)){
        alert('That item already exist!');
        itemForm.reset();
        return;
    }

   addItemToDOM(itemObj); // Add item to DOM
   addItemToStorage(itemObj); // Add item to local storage
   checkUI();

   itemForm.reset();
   itemInput.focus();
}

function addItemToDOM (item){

    //Create list item
    const li = document.createElement('li');
    li.setAttribute('id', item.id);
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.setAttribute('contenteditable','');

    const checkbox = createCheckbox();
    const button = createButton('remove-item btn-remove');

    li.appendChild(div);
    div.appendChild(checkbox);
    div.appendChild(span);
    span.appendChild(document.createTextNode(item.name));
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
        
        e.target.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
        
                updateItem(e.target);
            }
          });
        

    } else if(e.target.type === 'checkbox'){
        markItemComplete(e.target);
    }
    
}

function updateItem(item){
    let itemStorage = getItemfromStorage();
    const itemID = item.parentElement.parentElement.id; //Get parent element ID
    const itemtoEdit = itemStorage.find((i) => i.id === parseInt(itemID)); //Filter object with the ID of selected element

    if (checkIfItemExists(item.textContent)){
        alert('That item already exist!');
        location.reload()
        return;
    } else if (item.textContent === ''){
        alert('Item cannot be an empty string!');
        location.reload();
        return;
    } else {
        itemtoEdit.name = item.textContent;
        localStorage.setItem('items', JSON.stringify(itemStorage));
    }
    
}

function markItemComplete (item){
    const checkbox = item;

    if (checkbox.checked){
        item.parentElement.parentElement.classList.add('item-complete');
        item.nextElementSibling.removeAttribute('contenteditable');
    } else {
        item.parentElement.parentElement.classList.remove('item-complete');
        item.nextElementSibling.setAttribute('contenteditable','');
    }
}

function checkIfItemExists(item) {
    const itemStorage = getItemfromStorage();
    const itemDuplicate = itemStorage.find((i) => i.name === item);

    return itemStorage.includes(itemDuplicate);  
}

function removeItem(item){
    if(confirm('Are you sure?')){

        //Remove item from DOM
        item.remove();

        //Remove item from local storage
        removeItemFromStorage(item);

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

        itemForm.reset();

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemStorage = getItemfromStorage();
    const itemID = item.id;
  
    // Filter out item to be removed
    itemStorage = itemStorage.filter((i) => i.id !== parseInt(itemID));
  
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

