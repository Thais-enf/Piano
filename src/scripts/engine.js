const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mappedKeys = [];
let audioFiles = {}; // Para armazenar os sons previamente carregados.

// Carrega os arquivos de áudio para evitar recarregamento.
pianoKeys.forEach((key) => {
  const keyNote = key.dataset.key;
  mappedKeys.push(keyNote);
  audioFiles[keyNote] = new Audio(`src/tunes/${keyNote}.wav`);
});

const playTune = (key) => {
  const tune = audioFiles[key];
  if (!tune) return;

  tune.currentTime = 0; // Reinicia o som.
  tune.volume = volumeSlider.value; // Aplica o volume atual.
  tune.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

// Adiciona eventos de clique nas teclas.
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
});

// Adiciona eventos para pressionamento de teclas do teclado.
let isKeyDown = false;
document.addEventListener("keydown", (e) => {
  if (isKeyDown) return;
  if (mappedKeys.includes(e.key)) {
    playTune(e.key);
    isKeyDown = true;
    setTimeout(() => isKeyDown = false, 150);
  }
});

// Controla o volume.
volumeSlider.addEventListener("input", (e) => {
  Object.values(audioFiles).forEach(audio => {
    audio.volume = e.target.value;
  });
});

// Mostra ou oculta as teclas.
keysCheck.addEventListener("click", () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
});
