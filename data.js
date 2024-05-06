document.addEventListener('DOMContentLoaded', function () {
  const introductionElement = document.getElementById('introduction');
  const startInput = document.getElementById('startInput');
  const quizElement = document.getElementById('quiz');
  const scenarioImageElement = document.getElementById('scenarioImage'); 

  startInput.addEventListener('keyup', function(event) {
    if (event.key === "Enter" && startInput.value.toLowerCase() === "ja") {
      introductionElement.style.display = 'none';
      quizElement.style.display = 'block';
      startScenario();
    }
  });

  const questionElement = document.getElementById('question');
  const options = document.querySelectorAll('.option');
  const nextButton = document.getElementById('nextButton');
  const result = document.getElementById('result');

  const scenarios = [
    {
      scenario: 'Du modtager en e-mail, der hævder at være fra din bank. Den beder om at opdatere dine loginoplysninger ved at klikke på et link. Hvad gør du?',
      image: 'img/b1oplysninger.jpg',
      options: ['Klik på linket og opdater dine oplysninger', 'Ignorer e-mailen', 'Besvar e-mailen og bed om flere oplysninger', 'Del dine oplysninger med e-mailen'],
      correctIndex: 1,
      explanation: 'Det rigtige valg er at ignorere e-mailen. Banker vil aldrig bede dig om at opdatere dine oplysninger via en e-mail, især ikke med et link. Dette er et forsøg på phishing.'
    },
    {
      scenario: 'Mens du browser på internettet, vises der et popup-vindue med en besked om at din computer er blevet inficeret med virus. Hvad gør du?',
      image: 'img/b2virus.jpg',
      options: ['Klik på popup-vinduet for at fjerne virussen', 'Luk browseren og kør en antivirus-scanning', 'Ignorer popup-vinduet', 'Del din computerens oplysninger med popup-vinduet'],
      correctIndex: 1,
      explanation: 'Det korrekte valg er at lukke browseren og køre en antivirus-scanning. Popup-vinduer, der hævder at din computer er inficeret, er ofte forsøg på at installere malware.'
    },
    {
      scenario: 'En ukendt person kontakter dig og beder om dine personlige oplysninger over telefonen, idet de hævder at være fra en legitim organisation. Hvad gør du?',
      image: 'img/b3caller.jpg',
      options: ['Del dine oplysninger', 'Bed om yderligere verifikation af deres identitet', 'Afvis at give dine oplysninger', 'Spørg hvorfor de har brug for oplysningerne'],
      correctIndex: 2,
      explanation: 'Det rigtige valg er at afvise at give dine oplysninger. Ægte organisationer vil aldrig bede om dine personlige oplysninger over telefonen uden en begrundet årsag.'
    }
  ];

  let currentScenarioIndex = 0;

  function startScenario() {
    showScenario();
    startImageSlider(); // Start billedslideren
  }

  function showScenario() {
    const currentScenario = scenarios[currentScenarioIndex];
    questionElement.textContent = `Scenarie ${currentScenarioIndex + 1}: ${currentScenario.scenario}`;
    scenarioImageElement.innerHTML = `<img src="${currentScenario.image}" alt="Scenario Image">`; 
    options.forEach((option, index) => {
      option.textContent = currentScenario.options[index];
    });
  }

  function checkAnswer(event) {
    const selectedOption = event.target;
    const selectedAnswer = selectedOption.textContent;
    const correctIndex = scenarios[currentScenarioIndex].correctIndex;
    const correctAnswer = scenarios[currentScenarioIndex].options[correctIndex];

    if (selectedAnswer === correctAnswer) {
      result.textContent = 'Godt valg! ' + scenarios[currentScenarioIndex].explanation;
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

  // Funktion til at starte billedslideren
  function startImageSlider() {
    setInterval(changeImage, 2000); // Skift billede hvert 2. sekund
  }

  // Funktion til at skifte billedet
  function changeImage() {
    const currentScenario = scenarios[currentScenarioIndex];
    const currentImage = scenarioImageElement.querySelector('img');
    const imageIndex = currentScenario.image.indexOf('.jpg');
    const baseImagePath = currentScenario.image.substring(0, imageIndex); // Fjern filtypenavnet

    // Skift til det næste billede baseret på den nuværende sti
    if (currentImage.src === `${baseImagePath}.jpg`) {
      currentImage.src = `${baseImagePath}-2.jpg`; // Skift til den anden version
    } else {
      currentImage.src = `${baseImagePath}.jpg`; // Skift tilbage til den oprindelige version
    }
  }
});
