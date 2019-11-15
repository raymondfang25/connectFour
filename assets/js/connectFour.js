var player1 = prompt("Player One: Enter your name. You will be Blue") || "Player One";
var player1Color = "rgb(86, 151, 255)";

var player2 = prompt("Player Two: Enter your name. You will be Red") || "Player Two";
var player2Color = "rgb(237, 45, 73)";

var game_on = true;
var table = $("table tr");

function reportWin(rowNum, colNum) {
  console.log("You won starting at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

$(".btn").on("click", function() {
  $(".board button").css({ background: "gray" });
  game_on = true;
  $('h1').text('Welcome to Connect Four!')
  $('h3').text(player1 + ": it is your turn, please pick a column to drop your blue chip.")

});

function changeColor(rowIndex, colIndex, color) {
  if (game_on) {
    return table
      .eq(rowIndex)
      .find("td")
      .eq(colIndex)
      .find("button")
      .css("background-color", color);
  }
}

function returnColor(rowIndex, colIndex) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === "rgb(128, 128, 128)") {
      return row;
    }
  }
}

function colorMathCheck(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(128, 128, 128)" &&
    one
  );
}

function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (
        colorMathCheck(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        console.log("horiz");
        reportWin(row, col);
        game_on = false;
        return true;
      } else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (
        colorMathCheck(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        console.log("vert");
        reportWin(row, col);
        game_on = false;
        return true;
      } else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (
        colorMathCheck(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        console.log("diag");
        reportWin(row, col);
        return true;
      } else if (
        colorMathCheck(
          returnColor(row, col),
          returnColor(row - 1, col + 1),
          returnColor(row - 2, col + 2),
          returnColor(row - 3, col + 3)
        )
      ) {
        console.log("diag");
        reportWin(row, col);
        game_on = false;
        return true;
      } else {
        continue;
      }
    }
  }
}

function gameEnd(winningPlayer) {
  $("h3").text("");
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $("h1").text(winningPlayer + " has won!");
    }
  }
}

function playGame() {
  if (game_on) {
    var col = $(this)
      .closest("td")
      .index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentColor);
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
      gameEnd(currentName);
    } else {
        currentPlayer = currentPlayer * -1;
        if (currentPlayer === 1) {
          currentName = player1;
          $("h3").text(
            currentName +
              ": it is your turn, please pick a column to drop your blue chip."
          );
          currentColor = player1Color;
        } else {
          currentName = player2;
          $("h3").text(
            currentName +
              ": it is your turn, please pick a column to drop your red chip."
          );
          currentColor = player2Color;
        }
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$("h3").text(
  player1 + ": it is your turn, please pick a column to drop your blue chip."
);
$(".board button").on("click", playGame);