document.addEventListener('DOMContentLoaded', function () {
  const introductionElement = document.getElementById('introduction');
  const startButton = document.getElementById('startButton');
  const quizElement = document.getElementById('quiz');

  startButton.addEventListener('click', function() {
    introductionElement.style.display = 'none';
    quizElement.style.display = 'block';
  });

  const questionElement = document.getElementById('question');
  const options = document.querySelectorAll('.option');
  const nextButton = document.getElementById('nextButton');
  const result = document.getElementById('result');

  const questions = [
    {
      question: 'Hvad er et sikkert password?',
      options: ['Enkelt ord', 'Dit fødselsdag', 'En kombination af bogstaver, tal og specialtegn', 'Dit yndlingshold']
    },
    {
      question: 'Hvor mange tegn bør et sikkert password minimum være?',
      options: ['4', '8', '12', '16']
    },
    {
      question: 'Hvad er en to-faktor-autentifikation?',
      options: ['Et password med to ord', 'En sikkerhedsnøgle, der genereres på din telefon', 'En nøglebrik, du bærer med dig', 'En biometrisk autentifikation']
    },
    {
      question: 'Hvad er phishing?',
      options: ['En fiskeart', 'En type malware', 'Et forsøg på at få personlig information ved at udgive sig for at være en pålidelig kilde', 'En metode til at beskytte dit password']
    },
    {
      question: 'Hvordan kan man beskytte sig mod ransomware?',
      options: ['Ved at have en opdateret antivirus-software', 'Ved at betale løsesummen', 'Ved at dele sit password med andre', 'Ved at klikke på mistænkelige links']
    }
    // Tilføj flere spørgsmål efter behov
  ];

  const correctAnswers = [
    'En kombination af bogstaver, tal og specialtegn',
    '12',
    'En sikkerhedsnøgle, der genereres på din telefon',
    'Et forsøg på at få personlig information ved at udgive sig for at være en pålidelig kilde',
    'Ved at have en opdateret antivirus-software'
  ];

  let currentQuestionIndex = 0;

  showQuestion();

  nextButton.addEventListener('click', nextQuestion);

  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Spørgsmål ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    options.forEach((option, index) => {
      option.textContent = currentQuestion.options[index];
    });
  }

  function checkAnswer(event) {
    const selectedOption = event.target;
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = correctAnswers[currentQuestionIndex];

    if (selectedAnswer === correctAnswer) {
      result.textContent = 'Korrekt svar!';
      nextButton.disabled = false;
    } else {
      result.textContent = 'Forkert svar. Prøv igen.';
    }
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
      result.textContent = '';
      nextButton.disabled = true;
    } else {
      alert('Tillykke! Du har gennemført quizzen.');
    }
  }

  options.forEach(option => {
    option.addEventListener('click', checkAnswer);
  });
});