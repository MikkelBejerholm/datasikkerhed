const questions = [
    {
      question: "What is a strong password?",
      options: ["123456", "password", "P@ssw0rd", "CorrectHorseBatteryStaple"],
      answer: 3 // index of the correct answer in the options array
    },
    {
      question: "How often should you change your password?",
      options: ["Every day", "Once a year", "Never", "Every 3 months"],
      answer: 2 // index of the correct answer in the options array
    },
    // Add more questions here
  ];
  
  let currentQuestionIndex = 0;
  let answered = false; // Variable til at spore, om brugeren har svaret på det nuværende spørgsmål
  
  const introContainer = document.getElementById('intro-container');
  const questionContainer = document.getElementById('question-container');
  const nextButton = document.getElementById('next-btn');
  const startButton = document.getElementById('start-btn');
  nextButton.style.display = 'none'; // Skjul "Next" knappen i starten
  
  function handleCorrectAnswer() {
    nextButton.disabled = false;
    document.getElementById('next-question-btn').style.display = 'block'; // Vis "Next Question" knappen
    
    // Fjern event listeneren for "Next" knappen, hvis den allerede eksisterer, for at undgå flere tilføjelser
    nextButton.removeEventListener('click', nextQuestion);
    
    // Tilføj event listener til "Next" knappen for at gå videre til næste spørgsmål
    nextButton.addEventListener('click', nextQuestion);
  }
  
  function checkAnswer(selectedIndex) {
    if (!answered) { // Check om brugeren allerede har svaret
      answered = true;
      if (selectedIndex === questions[currentQuestionIndex].answer) {
        alert('Correct answer!');
        handleCorrectAnswer();
      } else {
        alert('Incorrect answer. Try again!');
        // Gør alle svarmuligheder aktive igen
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
          button.disabled = false;
          button.classList.remove('disabled');
        });
      }
      // Tilføj event listener til "Next Question" knappen
      document.getElementById('next-question-btn').addEventListener('click', nextQuestion);
    }
  }
  
  function showQuestion(question) {
    answered = false; // Nulstil svaret, når et nyt spørgsmål vises
    questionContainer.style.display = 'block';
    introContainer.style.display = 'none';
    document.getElementById('question-text').textContent = question.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const optionElement = document.createElement('button');
      optionElement.textContent = option;
      optionElement.classList.add('option-btn');
      optionElement.addEventListener('click', () => {
        checkAnswer(index);
        // Deaktiver valgt svarmulighed for at forhindre flere klik
        optionElement.disabled = true;
        optionElement.classList.add('disabled');
      });
      optionsContainer.appendChild(optionElement);
    });
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
      nextButton.disabled = true; // Deaktiver "Next" knappen, når et nyt spørgsmål vises
    } else {
      alert('Quiz finished!');
    }
  }
  
  nextButton.addEventListener('click', nextQuestion);
  startButton.addEventListener('click', () => {
    showQuestion(questions[currentQuestionIndex]);
  });