
var panel = $("#quiz-area");
var countStartNumber = 30;

//create an array of objects - questions, choices, correct answers and gifs
var questions = [{
  question: '1. Who takes on the villian persona of Prof. Chaos?',
  choices: ['A. Tweak', 'B. Stan', 'C. Cartman', 'D. Butters'],
  CAnswer: 'D. Butters',
  image: "assets/images/profchaos.gif",
},

{
  question: '2. Who does Cartman always make fun of for being poor?',
  choices: ['A. tweak', 'B. Kenny', 'C. kyle', 'D. Butters'],
  CAnswer: 'B. Kenny',
  image: "assets/images/Kennypoor.gif"
},

{
  question: '3. What is Stans fathers name?',
  choices: ['A. Chef', 'B. carl', 'C. Lord', 'D. Randy'],
  CAnswer: 'D. Randy',
  image: "assets/images/Randymarsh.gif"
},

{
  question: '4. What did stan do everytie he saw Wendy?',
  choices: ['A. THrow rocks', 'B. Hide', 'C. Kiss her', 'D. Puke'],
  CAnswer: 'D. Puke',
  image: "assets/images/Stanmarsh.gif"
},

{
  question: '5. Who was revealed to be Cartmans father?',
  choices: ['A. bill', 'B. The Broncos', 'C. Chef', 'D. His Mother'],
  CAnswer: 'D. His Mother',
  image: "assets/images/cartman.gif"
},

{
  question: '6. Who do the boys go on christmas adventures with?',
  choices: ['A. Mr.Hankey', 'B. The school', 'C. By themselves', 'D. Christmas elves'],
  CAnswer: 'A. Mr.Hankey',
  image: "assets/images/hankey.gif"
},

{
  question: '7. Why is cartman always ripping on Kyle?',
  choices: ['A. His Hair', 'B. His looks', 'C. Hes poor', 'D. His religion'],
  CAnswer: 'D. His religion',
  image: "assets/images/kylejewish.gif"
},

{
  question: '8. What character constantly gets killed',
  choices: ['A. Kenny', 'B. Kyle', 'C. Stan', 'D. Cartman'],
  CAnswer: 'A. Kenny',
  image: "assets/images/kennyfall.gif"
},

{
  question: '9. Cartman thinks whose mother is a big, fat, stupid b*%#h?',
  choices: ['A. Stan', 'B. His Own', 'C. Kenny', 'D. Kyle'],
  CAnswer: 'D. Kyle',
  image: "assets/images/Kylesmom.gif"
},

{
  question: '10. Which of the boys becomes a pimp?',
  choices: ['A. Stan', 'B. Cartman', 'C. Butters', 'D. Tweak'],
  CAnswer: 'C. Butters',
  image: "assets/images/butterspimp.gif"
}];

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function () {
    game.counter--;
    $('#counter-number').text(game.counter);
    if (game.counter === 0) {
      console.log("TIME'S UP");
      game.timeUp();
    }
  },

  loadQuestion: function () {
    timer = setInterval(game.countdown, 1000);
    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
    for (var i = 0; i < questions[this.currentQuestion].choices.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].choices[i] + "'>" + questions[this.currentQuestion].choices[i] + "</button>");
    }
  },

  nextQuestion: function () {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function () {
    clearInterval(timer);
    $("#counter-number").html(game.counter);
    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].CAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  results: function () {
    clearInterval(timer);
    panel.html("<h2>Your WNYX results are in.</h2>");
    $("#counter-number").text(game.counter);
    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect)) + "</h3>");
    panel.append("<br><button id='start-over'>Wanna play again?</button>");
  },

  clicked: function (K) {
    clearInterval(timer);
    if ($(K.target).attr("data-name") === questions[this.currentQuestion].CAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function () {
    clearInterval(timer);
    game.incorrect++;
    panel.html("<h2>Wrong.</h2>");
    panel.append("<h3>The Correct Answer is: " + questions[game.currentQuestion].CAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  answeredCorrectly: function () {
    clearInterval(timer);
    game.correct++;
    panel.html("<h2>Right!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};


$(document).on("click", "#start-over", function () {
  game.reset();
});

$(document).on("click", ".answer-button", function (e) {
  game.clicked(e);
});

$(document).on("click", "#start", function () {
  $("#time-counter").prepend("<h2>Countdown : <span id='counter-number'>30</span> seconds</h2>");


  game.loadQuestion();
});