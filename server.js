const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

app.post('/score', (req, res) => {
  const answers = req.body;
  let score = 0;

  const correctAnswers = {
    q1: "15",
    q2: "8",
    q3: "25",
    q4: "17",
    q5: "8"
  };

  for (let q in correctAnswers) {
    if ((answers[q] || "").trim() === correctAnswers[q]) {
      score++;
    }
  }

  // Determine brain age (fake logic for fun)
  let brainAge = 30 - score * 2;
  let suggestion = score < 3
    ? "Try practicing mental math and puzzles daily."
    : score < 5
    ? "You're doing good! A bit more practice can help."
    : "Excellent! Keep it up! 🧠💡";

  res.json({ brainAge, suggestion });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
