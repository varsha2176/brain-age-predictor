const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const answers = req.body;

  let score = 0;

  const correctAnswers = {
    q1: '15',    // 9 + 6
    q2: '4',     // 12 ÷ 3
    q3: '8',     // Next: 2,4,6,...
    q4: '22',    // 11 + 11
    q5: '24'     // 100 - 76
  };

  Object.keys(correctAnswers).forEach((key) => {
    if (answers[key] === correctAnswers[key]) {
      score++;
    }
  });

  let brainAge = 50 - (score * 5);
  if (brainAge < 18) brainAge = 18;
  if (brainAge > 60) brainAge = 60;

  let message = "";

  if (score === 5) {
    message = "Genius level! 🧠🔥";
  } else if (score >= 3) {
    message = "You're doing good! A bit more practice can help.";
  } else {
    message = "Hmm, seems like you need to sharpen up! Try again!";
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Brain Age Predictor</title>
      <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        a { display: inline-block; margin-top: 20px; font-size: 18px; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>🧠 Brain Age Predictor</h1>
      <h2>🧠 Your brain age is ~${brainAge}</h2>
      <p>${message}</p>
      <a href="/">🔁 Try Again</a>
    </body>
    </html>
  `);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
