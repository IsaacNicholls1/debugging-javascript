document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz');
    const button = document.getElementById('button');

    const quizQuestions = [
        {
            question: "What does HTML stand for?",
            answers: {
                a: "Hyper Text Markup Language",
                b: "Home Tool Markup Language",
                c: "Hyperlinks and Text Markup Language"
            },
            correctAnswer: "a"
        },
        {
            question: "What does CSS stand for?",
            answers: {
                a: "Creative Style Sheets",
                b: "Cascading Style Sheets",
                c: "Computer Style Sheets"
            },
            correctAnswer: "b"
        },
        {
            question: "What does JS stand for in web development?",
            answers: {
                a: "JavaScript",
                b: "JavaSource",
                c: "JustScript"
            },
            correctAnswer: "a"
        }
    ];

    function buildQuiz() {
        let output = '';

        for (let questionNumber = 0; questionNumber < quizQuestions.length; questionNumber++) {
            let currentQuestion = quizQuestions[questionNumber];
            let answers = '';

            for (let letter in currentQuestion.answers) {
                answers += `
                <label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label><br>
            `;
            }

            output += '<h2 class="h5 mt-4">' + currentQuestion.question + '</h2>';
            output += '<div class="answers">' + answers + '</div>';
        }

        quizContainer.innerHTML = output;
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');

        let numCorrect = 0;

        for (let questionNumber = 0; questionNumber < quizQuestions.length; questionNumber++) {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // Reset the color of all answers to default
            const labels = answerContainer.querySelectorAll('label');
            labels.forEach(label => {
                label.style.color = 'black';
            });

            if (userAnswer == quizQuestions[questionNumber].correctAnswer) {
                numCorrect++;
                // Color the correct answer in blue
                const correctLabel = answerContainer.querySelector(`input[value=${quizQuestions[questionNumber].correctAnswer}]`).parentNode;
                correctLabel.style.color = 'blue';
            } else {
                // Color the selected answer in red
                if (userAnswer) {
                    const selectedLabel = answerContainer.querySelector(`input[value=${userAnswer}]`).parentNode;
                    selectedLabel.style.color = 'red';
                }
            }
        }

        button.innerHTML = 'Try Again';
        button.removeEventListener('click', showResults);
        button.addEventListener('click', resetQuiz);
    }

    function resetQuiz() {
        buildQuiz();

        button.innerHTML = 'Submit Quiz';
        button.removeEventListener('click', resetQuiz);
        button.addEventListener('click', showResults);
    }

    buildQuiz();

    button.addEventListener('click', showResults);
});