const startBtn = document.getElementById("start-btn");
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

const progress = document.getElementById("progress");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let quizData = [];
let timer, timeLeft = 30;

// REAL QUESTIONS (sample – pattern same)
const questions = {
  web: {
    easy: [
      {q:"HTML ka full form?", options:["Hyper Text Markup Language","High Text Machine Language","Hyper Tool Markup Language","None"], answer:"Hyper Text Markup Language"},
      {q:"CSS ka use?", options:["Styling","Database","Server","Logic"], answer:"Styling"},
      {q:"JS kya hai?", options:["Language","Browser","Tool","None"], answer:"Language"},
      {q:"HTML tag ka symbol?", options:["<>","{}","[]","()"], answer:"<>"},
      {q:"CSS file extension?", options:[".css",".js",".html",".xml"], answer:".css"},
      {q:"JS run hota hai?", options:["Browser","Server only","Compiler","None"], answer:"Browser"},
      {q:"HTML me image tag?", options:["img","pic","image","src"], answer:"img"},
      {q:"Link tag?", options:["a","link","href","url"], answer:"a"},
      {q:"Heading tag?", options:["h1","head","title","p"], answer:"h1"},
      {q:"Paragraph tag?", options:["p","para","text","t"], answer:"p"}
    ],
    medium: [
      {q:"React kya hai?", options:["Library","Framework","Language","DB"], answer:"Library"},
      {q:"useState kya hai?", options:["Hook","Variable","API","Class"], answer:"Hook"},
      {q:"CSS Flexbox kisliye?", options:["Layout","Color","Font","None"], answer:"Layout"},
      {q:"JS me array ka method?", options:["push","add","insert","put"], answer:"push"},
      {q:"let vs var?", options:["scope","same","no diff","none"], answer:"scope"},
      {q:"DOM ka full form?", options:["Document Object Model","Data Object Model","None","Object Model"], answer:"Document Object Model"},
      {q:"Event listener?", options:["click","run","load","none"], answer:"click"},
      {q:"Promise kya hai?", options:["Async","Sync","Loop","None"], answer:"Async"},
      {q:"Arrow function?", options:["=>","->","==","<>"], answer:"=>"},
      {q:"API kya hai?", options:["Interface","App","Code","None"], answer:"Interface"}
    ],
    hard: [
      {q:"JS engine?", options:["V8","Node","Chrome","React"], answer:"V8"},
      {q:"Closure?", options:["Function inside function","Loop","Object","None"], answer:"Function inside function"},
      {q:"Hoisting?", options:["Variable lifting","Loop","Array","None"], answer:"Variable lifting"},
      {q:"Async await?", options:["Promise","Loop","Sync","None"], answer:"Promise"},
      {q:"this keyword?", options:["Context","Var","Func","None"], answer:"Context"},
      {q:"Event bubbling?", options:["Propagation","Loop","None","Stop"], answer:"Propagation"},
      {q:"LocalStorage?", options:["Browser storage","DB","RAM","None"], answer:"Browser storage"},
      {q:"Call stack?", options:["Execution stack","Heap","None","Queue"], answer:"Execution stack"},
      {q:"Debounce?", options:["Delay","Speed","Loop","None"], answer:"Delay"},
      {q:"Throttle?", options:["Limit calls","Loop","None","Speed"], answer:"Limit calls"}
    ]
  },

  math: {
    easy: [
      {q:"2+2?", options:["4","5","6","3"], answer:"4"},
      {q:"5+5?", options:["10","11","9","8"], answer:"10"},
      {q:"10-2?", options:["8","7","6","5"], answer:"8"},
      {q:"3*3?", options:["9","6","8","7"], answer:"9"},
      {q:"12/4?", options:["3","4","5","6"], answer:"3"},
      {q:"7+1?", options:["8","9","6","5"], answer:"8"},
      {q:"6*2?", options:["12","10","8","14"], answer:"12"},
      {q:"9-3?", options:["6","5","7","8"], answer:"6"},
      {q:"15/3?", options:["5","4","6","7"], answer:"5"},
      {q:"1+1?", options:["2","3","1","0"], answer:"2"}
    ],
    medium: [
      {q:"25 square?", options:["625","525","725","425"], answer:"625"},
      {q:"sqrt(16)?", options:["4","5","6","3"], answer:"4"},
      {q:"10^2?", options:["100","10","20","200"], answer:"100"},
      {q:"LCM 4,6?", options:["12","10","8","6"], answer:"12"},
      {q:"HCF 8,12?", options:["4","2","6","3"], answer:"4"},
      {q:"15% of 100?", options:["15","10","20","25"], answer:"15"},
      {q:"2^3?", options:["8","6","4","2"], answer:"8"},
      {q:"50/2?", options:["25","20","30","15"], answer:"25"},
      {q:"7^2?", options:["49","36","42","56"], answer:"49"},
      {q:"18/3?", options:["6","5","7","8"], answer:"6"}
    ],
    hard: [
      {q:"Derivative x^2?", options:["2x","x","x^2","1"], answer:"2x"},
      {q:"Integral 1 dx?", options:["x","1","0","x^2"], answer:"x"},
      {q:"Pi value?", options:["3.14","3","3.5","4"], answer:"3.14"},
      {q:"log10(100)?", options:["2","1","10","0"], answer:"2"},
      {q:"sin90?", options:["1","0","-1","0.5"], answer:"1"},
      {q:"cos0?", options:["1","0","-1","0.5"], answer:"1"},
      {q:"tan45?", options:["1","0","-1","0.5"], answer:"1"},
      {q:"Matrix size 2x2?", options:["4 elements","2","3","5"], answer:"4 elements"},
      {q:"Binary of 2?", options:["10","11","01","00"], answer:"10"},
      {q:"Prime number?", options:["7","8","9","10"], answer:"7"}
    ]
  },

  gk: {
    easy: [
      {q:"India capital?", options:["Delhi","Mumbai","Kolkata","Chennai"], answer:"Delhi"},
      {q:"National animal?", options:["Tiger","Lion","Dog","Cat"], answer:"Tiger"},
      {q:"Flag color?", options:["3","2","4","5"], answer:"3"},
      {q:"PM India?", options:["Narendra Modi","Rahul","Amit","None"], answer:"Narendra Modi"},
      {q:"Currency?", options:["Rupee","Dollar","Euro","Yen"], answer:"Rupee"},
      {q:"National bird?", options:["Peacock","Crow","Sparrow","Duck"], answer:"Peacock"},
      {q:"Independence year?", options:["1947","1950","1930","1960"], answer:"1947"},
      {q:"Largest state?", options:["Rajasthan","UP","MP","Bihar"], answer:"Rajasthan"},
      {q:"River Ganga?", options:["North","South","East","West"], answer:"North"},
      {q:"Taj Mahal?", options:["Agra","Delhi","Jaipur","Mumbai"], answer:"Agra"}
    ],
    medium: [
      {q:"UN founded?", options:["1945","1950","1930","1960"], answer:"1945"},
      {q:"ISRO?", options:["India Space","NASA","ESA","None"], answer:"India Space"},
      {q:"Largest ocean?", options:["Pacific","Atlantic","Indian","Arctic"], answer:"Pacific"},
      {q:"Currency Japan?", options:["Yen","Dollar","Euro","Rupee"], answer:"Yen"},
      {q:"Mount Everest?", options:["Nepal","India","China","USA"], answer:"Nepal"},
      {q:"Sun rises?", options:["East","West","North","South"], answer:"East"},
      {q:"Water formula?", options:["H2O","CO2","O2","NaCl"], answer:"H2O"},
      {q:"Earth shape?", options:["Sphere","Flat","Square","Triangle"], answer:"Sphere"},
      {q:"Capital USA?", options:["Washington DC","NY","LA","Chicago"], answer:"Washington DC"},
      {q:"Largest desert?", options:["Sahara","Thar","Gobi","Kalahari"], answer:"Sahara"}
    ],
    hard: [
      {q:"Speed of light?", options:["3x10^8","3x10^6","3x10^5","3x10^7"], answer:"3x10^8"},
      {q:"DNA full form?", options:["Deoxyribo Nucleic Acid","RNA","Protein","None"], answer:"Deoxyribo Nucleic Acid"},
      {q:"Einstein theory?", options:["Relativity","Gravity","Motion","None"], answer:"Relativity"},
      {q:"Atomic no H?", options:["1","2","3","4"], answer:"1"},
      {q:"SI unit force?", options:["Newton","Joule","Watt","Pascal"], answer:"Newton"},
      {q:"Boiling water?", options:["100°C","90","80","70"], answer:"100°C"},
      {q:"Earth revolution?", options:["365 days","300","200","100"], answer:"365 days"},
      {q:"First satellite?", options:["Sputnik","Apollo","Chandrayaan","None"], answer:"Sputnik"},
      {q:"Gas we breathe?", options:["Oxygen","CO2","N2","H2"], answer:"Oxygen"},
      {q:"Moon gravity?", options:["1/6","1/2","1/3","1"], answer:"1/6"}
    ]
  }
};

// ===== LOGIC SAME (no bug) =====
startBtn.onclick = () => {
  quizData = questions[category.value][difficulty.value];
  currentQuestion = 0;
  score = 0;

  startScreen.classList.add("hide");
  quizScreen.classList.remove("hide");

  loadQuestion();
};

function loadQuestion() {
  let q = quizData[currentQuestion];
  questionEl.innerText = q.q;
  optionsEl.innerHTML = "";

  q.options.sort(() => Math.random() - 0.5);

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      if (opt === q.answer) {
        score++;
        btn.style.background = "green";
      } else {
        btn.style.background = "red";
      }
      document.querySelectorAll("#options button").forEach(b => b.disabled = true);
    };

    optionsEl.appendChild(btn);
  });

  startTimer();
  progress.style.width = ((currentQuestion+1)/quizData.length)*100 + "%";
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

nextBtn.onclick = () => {
  currentQuestion++;
  currentQuestion < quizData.length ? loadQuestion() : showResult();
};

function showResult() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");

  document.getElementById("score").innerText =
    score + " / " + quizData.length;

  document.getElementById("feedback").innerText =
    score > quizData.length/2 ? "🔥 Awesome!" : "😅 Try Again";
}

// toggle
document.getElementById("theme-toggle").onclick = () =>
  document.body.classList.toggle("light");