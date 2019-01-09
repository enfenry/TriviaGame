$('document').ready(function() {

class Question {
    constructor(number,string,answerChoices,correctAnswer) {
        this.number = number
        this.string = string,
        this.answerChoices = answerChoices,
        this.correctAnswer = correctAnswer
    }
}

q1Choices = ['a','b','c','d'];
q2Choices = ['a','b'];

q1 = new Question(1,'some text?', q1Choices, q1Choices[2]);
q2 = new Question(2,'some text?', q2Choices, q2Choices[0]);

let questions = [q1,q2]

function addQuestion(question,div) {
    let newDiv = $("<div>");
    let newDivNumber = $("<span>");
    let newDivQuestion = $("<span>");
    let newDivAnswers = $("<form>");
    let newDivCorrect = $("<span>");

    newDivNumber.attr("class","question-number");
    newDivNumber.attr("number",question.number);
    newDivNumber.append("Question " + question.number + ": ");
    newDiv.append(newDivNumber);

    newDivQuestion.attr("class","question-string");
    newDivQuestion.attr("string",question.string);
    newDivQuestion.append(question.string);
    newDiv.append(newDivQuestion);

    newDivAnswers.attr("class","answer-choices");
    newDivAnswers.attr("answer-choices",question.answerChoices);


    for (let i =0; i < question.answerChoices.length; i++) {
        let newLabel = $("<label>");
        let newAnswer = $("<input>");
        newAnswer.attr("type","radio");
        newAnswer.attr("name", "answer-choice");
        newAnswer.attr("value",question.answerChoices[i]);
        // newAnswer.attr("answer-choice", question.answerChoices[i]);
        newLabel.text(question.answerChoices[i]);
        newLabel.prepend(newAnswer);
        newDivAnswers.append(newLabel);
    };
    newDiv.append(newDivAnswers);

    newDivCorrect.attr("correct-answer",question.correctAnswer);

    newDiv.attr("class","question");
    newDiv.append(newDivCorrect);

    div.append(newDiv);
}

questions.forEach(function (q) {
    addQuestion(q, $("#questions"));
});




















//     //  Set our number counter to 100.
// var number = 100;

// //  Variable that will hold our interval ID when we execute the "run" function
// var intervalId;

// //  When the stop button gets clicked, run the stop function.
// $("#stop").on("click", stop);

// //  When the resume button gets clicked, execute the run function.
// $("#resume").on("click", run);

// //  The run function sets an interval that runs the decrement function once a second.
// //  *****BUG FIX******** 
// //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
// function run() {
//   clearInterval(intervalId);
//   intervalId = setInterval(decrement, 1000);
// }

// //  The decrement function.
// function decrement() {
//   number--;
//   //  Show the number in the #show-number tag.
//   $("#show-number").html("<h2>" + number + "</h2>");

//   //  Once number hits zero...
//   if (number === 0) {

//     //  ...run the stop function.
//     stop();

//     //  Alert the user that time is up.
//     alert("Time Up!");
//   }
// }

// //  The stop function
// function stop() {

//   //  Clears our intervalId
//   //  We just pass the name of the interval
//   //  to the clearInterval function.
//   clearInterval(intervalId);
// }

// //  Execute the run function.
// run();
})
