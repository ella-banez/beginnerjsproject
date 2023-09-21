const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const colors = [
  'aqua',
  'antiquewhite',
  'aquamarine',
  'azure',
  'beige',
  'black',
  'blue',
  'brown',
  'cadetblue',
  'chocolate',
  'coral',
  'cornflowerblue',
  'crimson',
  'darkcyan',
  'darkgreen',
  'firebrick',
  'fuchsia',
  'gold',
  'gray',
  'green',
  'hotpink',
  'indigo',
  'lightsalmon',
  'lime',
  'maroon',
  'mediumorchid',
  'navy',
  'olive',
  'orange',
  'peru',
  'pink',
  'plum',
  'purple',
  'red',
  'salmon',
  'silver',
  'skyblue',
  'springgreen',
  'teal',
  'tomato',
  'turquoise',
  'violet',
  'white',
  'yellow',
  'yellowgreen'
];

const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
  " | ",)};`;

const diagnostic = document.querySelector(".output");
const hints = document.querySelector("#hints");
const availColors = document.querySelector('#avail-colors');

let colorHTML = "";
colors.forEach((color, i) => {
  colorHTML += `<span style="background-color:${color};"> ${color} </span>`;
});
availColors.innerHTML = `${colorHTML}`;

document.body.onclick = () => {
  recognition.start();
  hints.innerHTML = '<p>Ready to receive a color command...</p>';
};

recognition.onresult = (e) => {

  for (let i = e.resultIndex; i < e.results.length; i++) {
    const color = e.results[i][0].transcript.toLowerCase().trim().replace(" ", "");

    if (colors.includes(color)){
      console.log(color);
      diagnostic.textContent = `Result received: ${color}.`;
      document.body.style.backgroundColor = color;
    } else {
      diagnostic.textContent = `I didn't recognize the term ${color}.`;
      diagnostic.classList.add('output-error');

      setTimeout(() => {
        diagnostic.classList.remove('output-error');
        diagnostic.textContent = '…diagnostic messages';
      }, "3000");
    }
  } 
}

recognition.onspeechend = () => {
  recognition.stop();
  hints.innerHTML = '<p>Tap or click then say a color to change the background color of the app</p>';
};

