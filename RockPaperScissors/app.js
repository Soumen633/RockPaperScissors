 
      let userScore = 0;
      let compScore = 0;

      const choices = document.querySelectorAll(".choice");
      const msg = document.getElementById("msg");
      const userScoreDisplay = document.getElementById("user-score");
      const compScoreDisplay = document.getElementById("comp-score");

      const genCompChoice = () => {
        const options = ["rock", "paper", "scissors"];
        const randIdx = Math.floor(Math.random() * 3);
        return options[randIdx];
      };

      const drawGame = () => {
        msg.innerText = "🤝 It's a draw! Great minds think alike!";
        msg.className = "draw";
        setTimeout(() => msg.className = "", 1000);
      };

      const showWinner = (userWin, userChoice, compChoice) => {
        if (userWin) {
          userScore++;
          userScoreDisplay.innerText = userScore;
          userScoreDisplay.parentElement.classList.add("score-updated");
          msg.innerText = `🎉 You win! ${getChoiceEmoji(userChoice)} beats ${getChoiceEmoji(compChoice)}`;
          msg.className = "win";
          setTimeout(() => {
            msg.className = "";
            userScoreDisplay.parentElement.classList.remove("score-updated");
          }, 1000);
        } else {
          compScore++;
          compScoreDisplay.innerText = compScore;
          compScoreDisplay.parentElement.classList.add("score-updated");
          msg.innerText = `😢 You lose! ${getChoiceEmoji(compChoice)} beats ${getChoiceEmoji(userChoice)}`;
          msg.className = "lose";
          setTimeout(() => {
            msg.className = "";
            compScoreDisplay.parentElement.classList.remove("score-updated");
          }, 1000);
        }
      };

      const getChoiceEmoji = (choice) => {
        const emojis = {
          rock: "🪨",
          paper: "📄",
          scissors: "✂️"
        };
        return emojis[choice];
      };

      const playGame = (userChoice) => {
        const compChoice = genCompChoice();
        
        // Add visual feedback for user selection
        const selectedChoice = document.getElementById(userChoice);
        selectedChoice.classList.add("selected");
        setTimeout(() => selectedChoice.classList.remove("selected"), 800);

        if (userChoice === compChoice) {
          drawGame();
        } else {
          let userWin = true;
          if (userChoice === "rock") {
            userWin = compChoice === "scissors";
          } else if (userChoice === "paper") {
            userWin = compChoice === "rock";
          } else {
            userWin = compChoice === "paper";
          }
          showWinner(userWin, userChoice, compChoice);
        }
      };

      choices.forEach((choice) => {
        choice.addEventListener("click", () => {
          const userChoice = choice.getAttribute("id");
          playGame(userChoice);
        });
      });

      // Add keyboard support
      document.addEventListener("keydown", (e) => {
        if (e.key === "r" || e.key === "R") playGame("rock");
        if (e.key === "p" || e.key === "P") playGame("paper");
        if (e.key === "s" || e.key === "S") playGame("scissors");
      });
    