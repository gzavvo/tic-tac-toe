  const gameBoard = (function () {
    let state = ["", "", "", "", "", "", "", "", ""];
    
    function reset() {
      state = ["", "", "", "", "", "", "", "", ""];
    }

    function getState() {
      return state;
    }

    return {
      getState,
      reset
    }
  })();

  const displayController = (function () {
    // cache DOM
    const cells = document.querySelectorAll(".cell");
    const splash = document.querySelector("#splash");

    // bind events
    for (const cell of cells) {
      cell.addEventListener("click", cellPressed);
    };

    function render() {
      for (let i = 0; i < 9; i++) {
        cells[i].textContent = gameBoard.getState()[i];
      }
    };

    function cellPressed(e) {
      console.log("cell pressed");
      console.log(this.id);
      if (gameBoard.getState()[this.id] === "") {
        console.log("cell pressed condition true");
        gameBoard.getState()[this.id] = gameController.getCurrentPlayer();
        displayController.render();
        if (gameController.isWinner()) {
          console.log("isWinner = true");
          displayWinner(gameController.getCurrentPlayer());
        }
        gameController.togglePlayer();
      }
    };

    function displayWinner(currentPlayer) {
      splash.textContent = `${currentPlayer} wins`;
      splash.style.display = "grid";
    }

    function hideSplash() {
      splash.style.display = "none";
    }

    return {
      cells,
      render,
      hideSplash
    }
  })();

  const gameController = (function () {
    let _currentPlayer = "X";
    let _winner = "";
    let winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function newGame() {
      console.log("New Game pressed");
      gameBoard.reset();
      displayController.hideSplash();
      displayController.render();
    }

    function isWinner() {
      console.log("check for winner");
      for (i = 0; i < 8; i++) {
        if (gameBoard.getState()[winningCombination[i][0]] === getCurrentPlayer()
        && gameBoard.getState()[winningCombination[i][1]] === getCurrentPlayer()
        && gameBoard.getState()[winningCombination[i][2]] === getCurrentPlayer()) {
        return true
      }
    }
  }

  function getCurrentPlayer() {
    return _currentPlayer;
  }

  function togglePlayer() {
    if (_currentPlayer === "X") {
      _currentPlayer = "O";
    } else {
      _currentPlayer = "X";
    }
  }

  return {
    newGame,
    getCurrentPlayer,
    togglePlayer,
    isWinner,
    winningCombination
  }
})();
