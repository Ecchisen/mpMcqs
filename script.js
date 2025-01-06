let correctAnswers = 0;
let wrongAnswers = 0;

document.addEventListener("DOMContentLoaded", function () {
    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            const quizContainer = document.getElementById("quiz");

            data.forEach((item, index) => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("question");

                const questionText = document.createElement("p");
                questionText.textContent = `${index + 1}. ${item.question}`;
                questionDiv.appendChild(questionText);

                item.options.forEach((option, optIndex) => {
                    const optionButton = document.createElement("button");
                    optionButton.textContent = option;
                    optionButton.classList.add("option");
                    optionButton.dataset.questionIndex = index;
                    optionButton.dataset.optionIndex = optIndex;
                    optionButton.dataset.correctIndex = item.answer;

                    optionButton.addEventListener("click", function () {
                        const selectedIndex = parseInt(this.dataset.optionIndex);
                        const correctIndex = parseInt(this.dataset.correctIndex);

                        // Disable all options for this question after selection
                        const allOptions = questionDiv.querySelectorAll(".option");
                        allOptions.forEach(btn => btn.disabled = true);

                        if (selectedIndex === correctIndex) {
                            this.style.borderColor = "green"; // Correct answer
                            correctAnswers++;
                        } else {
                            this.style.borderColor = "red"; // Wrong answer
                            allOptions[correctIndex].style.borderColor = "green"; // Show correct answer
                            wrongAnswers++;
                        }
                    });

                    questionDiv.appendChild(optionButton);
                });

                quizContainer.appendChild(questionDiv);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});


function finishQuiz() {
    let confirmation = confirm("Do you really want to end the quiz?");

    if (!confirmation) {
        return; // Exit if user cancels
    }

    let totalQuestions = document.querySelectorAll(".question").length;

    let accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    alert(`Quiz Finished!\n\nTotal Questions: ${totalQuestions}\nCorrect Answers: ${correctAnswers}\nWrong Answers: ${wrongAnswers}\nAccuracy: ${accuracy}%`);
}


