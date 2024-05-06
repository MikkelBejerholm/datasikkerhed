document.addEventListener('DOMContentLoaded', function () {
  const introductionElement = document.getElementById('introduction');
  const startButton = document.getElementById('startButton');
  const quizElement = document.getElementById('quiz');

  startButton.addEventListener('click', function() {
    introductionElement.style.display = 'none';
    quizElement.style.display = 'block';
    startScenario();
  });

  const questionElement = document.getElementById('question');
  const options = document.querySelectorAll('.option');
  const nextButton = document.getElementById('nextButton');
  const result = document.getElementById('result');

  const scenarios = [
    {
      scenario: 'Du modtager en e-mail, der hævder at være fra din bank. Den beder om at opdatere dine loginoplysninger ved at klikke på et link. Hvad gør du?',
      options: ['Klik på linket og opdater dine oplysninger', 'Ignorer e-mailen', 'Besvar e-mailen og bed om flere oplysninger', 'Del dine oplysninger med e-mailen']
    },
    {
      scenario: 'Mens du browser på internettet, vises der et popup-vindue med en besked om at din computer er blevet inficeret med virus. Hvad gør du?',
      options: ['Klik på popup-vinduet for at fjerne virussen', 'Luk browseren og kør en antivirus-scanning', 'Ignorer popup-vinduet', 'Del din computerens oplysninger med popup-vinduet']
    },
    {
      scenario: 'En ukendt person kontakter dig og beder om dine personlige oplysninger over telefonen, idet de hævder at være fra en legitim organisation. Hvad gør du?',
      options: ['Del dine oplysninger', 'Bed om yderligere verifikation af deres identitet', 'Afvis at give dine oplysninger', 'Spørg hvorfor de har brug for oplysningerne']
    }
    // Tilføj flere scenarier efter behov
  ];

  const correctAnswers = [
    'Ignorer e-mailen',
    'Luk browseren og kør en antivirus-scanning',
    'Afvis at give dine oplysninger'
  ];

  let currentScenarioIndex = 0;

  function startScenario() {
    showScenario();
  }

  function showScenario() {
    const currentScenario = scenarios[currentScenarioIndex];
    questionElement.textContent = `Scenarie ${currentScenarioIndex + 1}: ${currentScenario.scenario}`;
    options.forEach((option, index) => {
      option.textContent = currentScenario.options[index];
    });
  }

  function checkAnswer(event) {
    const selectedOption = event.target;
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = correctAnswers[currentScenarioIndex];

    if (selectedAnswer === correctAnswer) {
      result.textContent = 'Godt valg!';
      nextButton.disabled = false;
    } else {
      result.textContent = 'Forkert valg. Du er blevet hacket. Prøv igen.';
    }
  }

  function nextScenario() {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
      showScenario();
      result.textContent = '';
      nextButton.disabled = true;
    } else {
      alert('Tillykke! Du har gennemført scenarierne.');
    }
  }

  options.forEach(option => {
    option.addEventListener('click', checkAnswer);
  });

  nextButton.addEventListener('click', nextScenario);
});