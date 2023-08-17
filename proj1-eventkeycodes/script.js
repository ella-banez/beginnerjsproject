// Method 1
// window.addEventListener('keydown', (e) => {
//   const insert = document.getElementById('insert');

//   insert.innerHTML = `
//     <div class="key">
//       ${e.key === ' ' ? 'Space' : e.key}
//       <small>e.key</small>
//     </div>

//     <div class="key">
//       ${e.keyCode}
//       <small>e.keyCode</small>
//     </div>

//     <div class="key">
//       ${e.code}
//       <small>e.code</small>
//     </div>
//   `;
// });

// Method 2

function showKeyCodes (event) {

  const insert = document.getElementById('insert');
  insert.innerHTML = '';
  
  const keyCodes = {
    'Event key': event.key === ' ' ? 'Space' : event.key,
    'Event keycode': event.which,
    'Event code': event.code,
  };


  for (let key in keyCodes) {

    const div = document.createElement('div');
    div.className = 'key';
    const small = document.createElement('small');

    const keyText = document.createTextNode(key);
    const valueText = document.createTextNode(keyCodes[key]);

    small.appendChild(keyText);
    div.appendChild(valueText);
    div.appendChild(small);
  
    insert.appendChild(div);
   
  console.log(Object.values(keyCodes));
  }
    
}

window.addEventListener('keypress', showKeyCodes);

