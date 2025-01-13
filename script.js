
let currentWordIndex = 0;
let score = 0;
let currentMistakeNum = 0;
let isSelected = false;
const indices = Array.from({ length: words.length }, (_, i) => i);
shuffle(indices);

function getRandomValues(size, n) {
  const result = [];
  const usedIndices = new Set();

  while (result.length < n) {
    const randomIndex = Math.floor(Math.random() * size);
    if (!usedIndices.has(randomIndex)) {
      result.push(randomIndex);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}

function displayWord() {
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  console.log("currentMistakeNum: " + currentMistakeNum);

  if (currentMistakeNum > 5){
    document.getElementById("word-display").textContent = "censored";

    const button = document.createElement("span");
    button.textContent = "bazdmeg";
    button.style = 
    optionsDiv.appendChild(button);

  } else {
    const currentIdx = indices[currentWordIndex];
    const word = words[currentIdx];    
    const qWord = word.japanese + "(" + word.romaji + ")"; 
    document.getElementById("word-display").textContent = qWord;

    chosenIndices = getRandomValues(words.length, 2);
    
    options = [];
    chosenIndices.forEach(idx => {options.push(words[idx].english);});
    options.push(word.english);

    const shuffledOptions = shuffle(options);

    console.log("shuffledOptions: " + shuffledOptions);
    console.log(currentIdx + " asd:" + words[currentIdx].english + " === word: " + word.english);

    shuffledOptions.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option, button);
      optionsDiv.appendChild(button);
    });
  }
}

function getCurrentImage(numOfMistakes){
  return "img/" + numOfMistakes + ".jpg";
}

function nextWord(){
  isSelected = false;
  if (currentMistakeNum >= 5){
    document.getElementsByClassName('game-container')[0].style.display = 'none';
  } else {
    // Next word
    currentWordIndex = (currentWordIndex + 1) % words.length;
    displayWord();
  }
}

function checkAnswer(selected, button) {
  console.log("Check Answer" + selected);
  console.log(typeof button);

  if (!isSelected){   
    const currentIdx = indices[currentWordIndex];

    if (selected === words[currentIdx].english) {
      button.style.backgroundColor = "#009f4a";
      button.style.color = "white";
      score++;
      document.getElementById("score").textContent = score;
    } else {
      button.style.backgroundColor = "rgb(159, 0, 0)";
      button.style.color = "white";
      document.getElementById("panic_img").src = getCurrentImage(currentMistakeNum);
      currentMistakeNum++;
    }
  }
  isSelected = true;
}

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame(){
  console.log("Start Game");
  currentMistakeNum = 0;
  currentWordIndex = 0;  
  score = 0;
  isSelected = false;

  document.getElementById("score").textContent = score;
  document.getElementsByClassName('game-container')[0].style.display = 'block';
  document.getElementById("panic_img").src = "img/monkey1.jpg";

  shuffle(indices);
  displayWord();
  const nextButton = document.getElementById("next");
  nextButton.onclick = () => nextWord();
}
