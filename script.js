let currentTurn = "A";
let diceNum;
const wrappers = document.querySelectorAll(".player-wrapper");
let currentScoreA = document.querySelector(".score-a");
let currentScoreB = document.querySelector(".score-b");
let totalScoreA = document.querySelector(".total-score-a");
let totalScoreB = document.querySelector(".total-score-b");
const controlWrapper = document.querySelector(".control-wrapper");

// 문자열을 변수명으로 인식하기 위해 객체화
const playObj = {
  currentScoreA: currentScoreA,
  currentScoreB: currentScoreB,
  totalScoreA: totalScoreA,
  totalScoreB: totalScoreB,
};

// 주사위 이미지 찾아놓기
const diceImgs = document.querySelectorAll(".dice-img");

// 버튼 찾아놓기
const rollBtn = document.querySelector(".control-roll");
const holdBtn = document.querySelector(".control-hold");

// A 활성화 시켜놓기
wrappers[0].classList.add("my-turn");

/***************************************
 * 	주사위 숫자 랜덤 뽑기 함수
 */
const randomDice = () => {
  // l부터 6까지 랜덤으로 가져오기
  diceNum = Math.floor(6 * Math.random()) + 1;
  // 주사위 이미지
  diceImgs.forEach(function (diceImg) {
    diceImg.style.opacity = 0;
  });
  diceImgs[diceNum - 1].style.opacity = 1;
};

/***************************************
 * 	게임 끝내기 함수
 */
const gameOver = (winner) => {
  // A , B 둘다 안보이게
  wrappers.forEach(function (wrapper) {
    wrapper.style.display = "none";
  });
  // 주사위 영역 안보이게
  controlWrapper.style.display = "none";

  // 이긴 게임판만 보이게
  winner.style.display = "block";
  winner.classList.add("my-turn");
};

/***************************************
 * 	Hold 버튼 함수
 */
const handleHold = () => {
  // 누적점수에 더하기
  let saveScore = `currentScore${currentTurn}`;
  let saveScoreValue = playObj[saveScore];
  let totalScore = `totalScore${currentTurn}`;
  let totalScoreValue = playObj[totalScore];

  totalScoreValue.textContent =
    Number(totalScoreValue.textContent) + Number(saveScoreValue.textContent);

  // 턴 변경
  if (currentTurn == "A") {
    currentTurn = "B";
  } else {
    currentTurn = "A";
  }

  // 현재점수 0으로 만들기
  saveScoreValue.textContent = 0;

  wrappers.forEach(function (wrapper) {
    wrapper.classList.toggle("my-turn");
  });

  // 누적점수 50점이면 승리
  if (totalScoreValue.textContent >= 50) {
    let winner = totalScoreValue.parentElement;
    gameOver(winner);
  }
};

/***************************************
 * 	Roll Dice 버튼 함수
 */
const handleRollDice = () => {
  // 주사위 랜덤 함수 호출
  randomDice();

  let currentWrapper = `${currentTurn}Wrapper`;
  currentWrapper = playObj[currentWrapper];

  let currentScore = `currentScore${currentTurn}`;
  let currentScoreValue = playObj[currentScore];

  // 1 , 2 이면
  if (diceNum == 1 || diceNum == 2) {
    // 현재점수 리셋
    currentScoreValue.textContent = 0;

    // 턴 변경
    if (currentTurn == "A") {
      currentTurn = "B";
    } else {
      currentTurn = "A";
    }

    wrappers.forEach(function (wrapper) {
      wrapper.classList.toggle("my-turn");
    });

    // 3 ~ 6 이면
  } else {
    // 현재점수에 더하기
    currentScoreValue.textContent =
      Number(currentScoreValue.textContent) + diceNum;
  }
};

/***************************************
 * 	버튼 클릭시 주사위 던지기
 */
rollBtn.addEventListener("click", handleRollDice);
holdBtn.addEventListener("click", handleHold);
