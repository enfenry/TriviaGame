$('document').ready(function () {

    class Question {
        constructor(number, string, answerChoices, correctAnswer) {
            this.number = number
            this.string = string,
                this.answerChoices = answerChoices,
                this.correctAnswer = correctAnswer
        }
    }

    let q1Choices = ['Seven Nation Army', 'Apple Blossom', 'I Fought Piranhas', 'Hotel Yorba'];
    let q2Choices = ['Nashville', 'Detroit'];
    let q3Choices = ['arsen', ' aggravated assault', 'resisting arrest'];
    let q4Choices = ['The White Stripes', 'The Raconteurs', 'The Upholsterers', 'The Dead Weather'];
    let q5Choices = ['Boarding House Reach', 'Blunderbuss', 'Lazaretto'];


    let q1 = new Question(1, 'Which White Stripes song appears on their self-titled debut?', q1Choices, q1Choices[2]);
    let q2 = new Question(2, 'Where is Third Man Records located?', q2Choices, q2Choices[0]);
    let q3 = new Question(3, 'Which crime was Jack White charged for in 2003?', q3Choices, q3Choices[1]);
    let q4 = new Question(4, 'Which band includes Alison Mosshart?', q4Choices, q4Choices[3]);
    let q5 = new Question(5, "What is the name of Jack White's third solo album?", q5Choices, q5Choices[0]);


    let questions = [q1, q2, q3,q4,q5]
    let time = 50;
    let interval;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    let tick = new Audio("assets/audio/tick.mp3");
    let jab = new Audio("assets/audio/jab.mp3");

    let startGameBtn = createButton("Start","startGameBtn");
    let submitBtn = createButton("Submit", "submitBtn");
    let pauseBtn = createButton("Pause","pauseBtn");
    let resumeBtn = createButton("Resume","resumeBtn");
    $("#startGame").append(startGameBtn);
    $("#submit").append(submitBtn);
    $("#pause").append(pauseBtn);
    $("#resume").append(resumeBtn);

    addQuestions(questions, $("#questions"));

    $("#timer").hide();
    $("#pause").hide();
    $("#resume").hide();
    $("#questions").hide();
    $("#submit").hide();

    $("#startGame").on("click", startGameBtn, function () {
        startGame();
    })

    $("#submit").on("click", submitBtn, function () {
        submit();
    })

    $("#pause").on("click", pauseBtn, function () {
        pause();
    })
    
    $("#resume").on("click", resumeBtn, function () {
        startTimer();
    })

    function startGame() {
        $("#timer").show();
        $("#pause").show();
        $("#resume").show();
        $("#questions").show();
        $("#submit").show();
        $("#startGame").hide();
        startTimer();
    }

    function startTimer() {
        clearInterval(interval);
        interval = setInterval(countdown, 1000);
        $("#timer").html(time);
    }

    function countdown() {
        time--;
        $("#timer").html(time);

        if (time <= 5) {
            tick.play();
        }

        if (time === 0) {
            jab.play();
            stop();
        }
    }

    function pause() {
        clearInterval(interval);
    }

    function stop() {
        clearInterval(interval);
        $("#results").append("<h2>Time's up!</h2> <br />");
        submit();
    }

    function addQuestion(question, div) {
        let newDiv = $("<div>");
        let newDivNumber = $("<span>");
        let newDivQuestion = $("<span>");
        let newDivAnswers = $("<form>");
        let newDivCorrect = $("<span>");

        newDivNumber.attr("class", "question number");
        newDivNumber.attr("number", question.number);
        newDivNumber.append("Question " + question.number + ": ");
        newDiv.append(newDivNumber);

        newDivQuestion.attr("class", "question string");
        newDivQuestion.attr("string", question.string);
        newDivQuestion.append(question.string);
        newDiv.append(newDivQuestion);

        newDivAnswers.attr("class", "answers");
        newDivAnswers.attr("answer-choices", question.answerChoices);


        for (let i = 0; i < question.answerChoices.length; i++) {
            let newLabel = $("<label>");
            let newAnswer = $("<input>");
            newAnswer.attr("type", "radio");
            newAnswer.attr("name", "radio-" + question.number);
            newAnswer.attr("class", "radio");
            newAnswer.attr("id", "radio-" + question.number);
            newAnswer.attr("value", question.answerChoices[i]);

            newLabel.text(question.answerChoices[i]);
            newLabel.prepend(newAnswer);
            newDivAnswers.append(newLabel);
        };
        newDiv.append(newDivAnswers);

        newDivCorrect.attr("id", "correct-" + question.number);
        newDivCorrect.attr("value", question.correctAnswer);
        newDiv.append(newDivCorrect);

        newDiv.attr("class", "question");
        newDiv.append("<br /> <br />");
        div.append(newDiv);
    }

    function addQuestions(questions, div) {
        questions.forEach(function (q) {
            addQuestion(q, div);
        });
    }

    function createButton(text, id) {
        let btn = $("<button>");
        btn.text(text);
        btn.attr("id", id);
        return btn;
    }

    function submit() {
        for (let i = 0; i < questions.length; i++) {
            let selected = $(("#radio-" + questions[i].number) + ":checked").val();
            let correctChoice = $("#correct-" + questions[i].number).attr("value");
            if (selected === correctChoice) {
                correct += 1;
            }
            else if (typeof (selected) === 'undefined') {
                unanswered += 1;
            }
            else {
                incorrect += 1;
            }
        }

        $("#timer").hide();
        $("#pause").hide();
        $("#resume").hide();
        $("#questions").hide();
        $("#submit").hide();
        $("#results").append("Correct: " + correct + "<br />");
        $("#results").append("Incorrect: " + incorrect + "<br />");
        $("#results").append("Unanswered: " + unanswered);
    }
})
