document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startButton"),
    yesBtn = document.getElementById("yes"),
    noBtn = document.getElementById("no"),
    scene = document.getElementById("scene"),
    scoreElem = document.getElementById("score"),
    wordElem = document.getElementById("game-word"),
    modal = document.querySelector(".modal"),
    modalScore = modal.querySelector("h1 span"),
    replayBtn = modal.querySelector("#replay");

  let pos = 0;
  let score = 0;
  const URL = "https://z30.z-go.ru/index.php";

  const updateScore = () => {
    scoreElem.textContent = ++score;
  };

  const updateStorage = (score) => {
    localStorage.setItem("score", score);
  };

  const changeWord = (words) => {
    pos++;
    if (pos >= words.length - 1) {
      wordElem.textContent = words[words.length - 1];
      yesBtn.setAttribute("disabled", "disabled");
      noBtn.setAttribute("disabled", "disabled");
      modalScore.textContent = score;
      modal.classList.add("active");
      return false;
    }
    wordElem.textContent = words[pos];
    return true;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  if (localStorage.getItem("score") != null) {
    modal.classList.add("active");
    modalScore.textContent = localStorage.getItem("score");
  }

  // Использовать в случае моей неудачи!!!! ДОМА СДЕЛАЮ, НАДЕЮСЬ... МБ НА REACT перенсу...
  const array = [
    "Если",
    "я",
    "не",
    "смогу",
    "сделать",
    "привязку",
    "к",
    "серверу",
  ];

  fetch(URL, {
    method: "GET",
    mode: "no-cors",
    credentials: "same-origin",
    header: {
      "Content-Type": "application/x-www-form-urlencoded'",
    },
  })
    .then((response) => {
      console.log(response.ok);
      return response.text();
    })
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  const shuffleWords = shuffleArray(array);
  wordElem.textContent = shuffleWords[pos];

  yesBtn.addEventListener("click", () => {
    updateScore();
    updateStorage(score);
    changeWord(shuffleWords);
  });

  noBtn.addEventListener("click", () => {
    updateStorage(score);
    changeWord(shuffleWords);
  });

  replayBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    localStorage.removeItem("score");
    location.reload();
  });

  // Скрытие кнопки и запуск сцены
  startBtn.addEventListener("click", function () {
    this.style.display = "none";
    scene.style.display = "block";
  });
});
