// 변수 초기값
let currentTurn = "A";
let diceNum;
let currentScoreA = 0;
let currentScoreB = 0;
let totalScoreA = 0;
let totalScoreB = 0;

// 버튼 찾아놓기
const rollBtn = document.querySelector(".control-roll");
const holdBtn = document.querySelector(".control-hold");

const randomDice = () => {
  // l부터 6까지 랜덤으로 가져오기
  diceNum = Math.floor(6 * Math.random()) + 1;
  console.log(diceNum);
};

const rollDice = () => {
  randomDice();
};

rollBtn.addEventListener("click", rollDice);
