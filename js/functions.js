/*
TicTacToe Javascript v1.0
Last Updated: 2015-07-28
Author: William R.A.D. Funk - http://WilliamRobertFunk.com 
*/

/** @var {Array} board - The TicTacToe board. */
var board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
/** @var {String} square - The state of a specific TicTacToe square. */
var square = 0;
/** @var {Number} p1score - Player 1's score */
var p1score = 0;
/** @var {Number} p2score - Player 2's score */
var p2score = 0;
/** @var {String} pTurn - Keeps track of which player's turn it is */
var pTurn = "1";
/** @var {String} pType - Is opponent human or AI */
var pType;
/** @var {Canvas} canvas - Where the interactive board goes */
var canvas;

/**
 * Checks to see if chosen square is already taken.
 * @param {Array} board - The state of the TicTacToe board.
 * @param {String} square - Is the chosen square empty.
 * @returns {Boolean} - True is empty, False is already taken.
 * @author William R.A.D. Funk
 */
function checkIfAvailable(board, square)
{
    if (board[square] == 1 || board[square] == 2)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * Places player's mark on chosen square.
 * @param {String} cellId - HTML square's ID.
 * @param {String} pTurn - Current player.
 * @param {String} square - Chosen square.
 * @param {Array} board - The TicTacToe board.
 * @returns {Array} board - Updated TicTacToe board.
 * @author William R.A.D. Funk
 */
function attachPlayerToCell(pTurn, square, board)
{
    var cellIdx = "#c" + square + "-x";
    var cellIdy = "#c" + square + "-y";
    var cellIdz = "#c" + square + "-z";
    if (pTurn == "1")
    {
        $(cellIdx).css("fill", "#99FF99");
        $(cellIdy).css("fill", "#99FF99");
        $(cellIdz).css("fill", "#99FF99");
        board[square] = 1;
        return board;
    }
    else if (pTurn == "2")
    {
        $(cellIdx).css("fill", "#FF99FF");
        $(cellIdy).css("fill", "#FF99FF");
        $(cellIdz).css("fill", "#FF99FF");
        board[square] = 2;
        return board;
    }
    else
    {
        console.log("ERROR: Player number has exceeded bounds!");
        return board;
    }
}

/**
 * Changes the turn after previous move is completed.
 * @param {String} pTurn - Current player.
 * @returns {String} - Next player's turn.
 * @author William R.A.D. Funk
 */
function changeTurn(pTurn)
{
    /** @var {String} player1Color - Background color for player 1. */
    var player1Color = "#99FF99";
    /** @var {String} player2Color - Background color for player 2. */
    var player2Color = "#FF99FF";
    if (pTurn === "1")
    {
        $("h2 span.p-number").html("2");
        $("h2 span.p-token").html("O");
        $("h2").css("text-align", 'right');
        $("body").css("background-color", player2Color);
        return "2";
    }
    else if (pTurn === "2")
    {
        $("h2 span.p-number").html("1");
        $("h2 span.p-token").html("X");
        $("h2").css("text-align", 'left');
        $("body").css("background-color", player1Color);
        return "1";
    }
    else
    {
        console.log("ERROR: Player number has exceeded bounds!");
    }
}

/**
 * Checks to see if recent move resulted in a win.
 * @param {Array} board - The TicTacToe board.
 * @param {String} pTurn - Current player.
 * @returns {Boolean} - True is win, False if no win.
 * @author William R.A.D. Funk
 */
function checkForWin(board, pTurn)
{
    var start = new Date().getTime();
    // Checks to make sure legitimate player number was passed.
    if (pTurn != "1" && pTurn != "2")
    {
        console.log("ERROR: Player number has exceeded bounds!");
        return false;
    }
    var i = 0, j = 0;
    /** @var {Array} wins - A double array of all win scenarios to check against. */
    var wins = [ [0, 1, 2], [0, 4, 8], [0, 3, 6], [0, 9, 18], [0, 10, 20], [0, 13, 26], [0, 12, 24], [1, 4, 7], [1, 10, 19],
                 [1, 13, 25], [2, 5, 8], [2, 4, 6], [2, 11, 20], [2, 10, 18], [2, 13, 24], [2, 14, 26], [3, 4, 5], [3, 12, 21],
                 [3, 13, 23], [4, 13, 22], [5, 14, 23], [5, 13, 21], [6, 7, 8], [6, 15, 24], [6, 16, 26], [6, 13, 20],
                 [6, 12, 18], [7, 16, 25], [7, 13, 19], [8, 17, 26], [8, 16, 24], [8, 13, 18], [8, 14, 20], [9, 10, 11],
                 [9, 13, 17], [9, 12, 15], [10, 13, 16], [11, 14, 17], [11, 13, 15], [12, 13, 14], [15, 16, 17], [18, 19, 20],
                 [18, 22, 26], [18, 21, 24], [19, 22, 25], [20, 23, 26], [20, 22, 24], [21, 22, 23], [24, 25, 26] ];
    // Checks all win scenarios.
    for(i = 0; i < 49; i++)
    {
        // Skipping all 0-combos if not player's square
        if(i == 0 && board[wins[i][0]] != pTurn)
        {
            i = 6;
        }
        // Skipping all 1-combos, 3-combos, 9-combos, and 18-combos if not player's square
        else if( (i == 7 || i == 16 || i == 33 || i == 41) && (board[wins[i][0]] != pTurn) )
        {
            i += 2;
        }
        // Skipping all 2-combos if not player's square
        else if(i == 10 && board[wins[i][0]] != pTurn)
        {
            i = 15;
        }
        // Skipping all 4-combos, 10-combos, 12-combos, 15-combos, 19-combos, 21-combos, and 24-combos if not player's square
        else if( (i == 19 || i == 36 || i == 39 || i == 40 || i == 44 || i == 47 || i == 48) && board[wins[i][0]] != pTurn)
        {
            // Skip
        }
        // Skipping all 5-combos, 7-combos, 11-combos, and 20-combos if not player's square
        else if( (i == 20 || i == 27 || i == 37 || i == 45) && board[wins[i][0]] != pTurn)
        {
            i++;
        }
        // Skipping all 6-combos if not player's square
        else if(i == 22 && board[wins[i][0]] != pTurn)
        {
            i = 26;
        }
        // Skipping all 8-combos if not player's square
        else if(i == 29 && board[wins[i][0]] != pTurn)
        {
            i = 32;
        }
        // Player has at least one of squares.
        // Check all the combinations involving that square.
        else
        {
            var flag = true;
            for(j = 0; j < 3; j++)
            {
                if(board[wins[i][j]] != pTurn)
                {
                    flag = false;
                    break;
                }
            }
            if(flag == true)
            {
                var end = new Date().getTime();
                console.log(end - start);
                return true;
            }
        }
    }
    var end = new Date().getTime();
    console.log(end - start);
    return false;
}

/**
 * Checks to see if recent move resulted in a tie.
 * @param {Array} board - The TicTacToe board.
 * @returns {Boolean} - True is tie, False if no tie.
 * @author William R.A.D. Funk
 */
function checkForTie(board)
{
    for(i = 0; i < 27; i++)
    {
        if(board[i] == 0)
        {
            return false;
        }
    }
    return true;
}

/**
 * Increases a player's score after a win. 10 is max.
 * @param {String} pTurn - Current player.
 * @var {Number} p1score - Player 1's score.
 * @var {Number} p2score - Player 2's score.
 * @author William R.A.D. Funk
 */
function increaseScore(pTurn)
{
    if (pTurn == "1")
    {
        p1score += 1;
        $("#p1-score span").html(p1score);
    }
    else if (pTurn == "2")
    {
        p2score += 1;
        $("#p2-score span").html(p2score);
    }
    else 
    {
        console.log("ERROR: increaseScore(pTurn) called with invalid pTurn argument");
    }

    if (p1score >= 10 || p2score >= 10)
    {
        alert("Congratulations!\n\nPlayer " + pTurn + " has won.\n\n");
        $("#p1-score span").html("0");
        $("#p2-score span").html("0");
        p1score = 0;
        p2score = 0;
    }
}

/**
 * Resets board is win, tie, or reset button press.
 * @var {Array} board - The TicTacToe board.
 * @author William R.A.D. Funk
 */
function resetBoard(board)
{
    for(i = 0; i < 27; i++)
    {
        var cellIdx = "#c" + i + "-x";
        var cellIdy = "#c" + i + "-y";
        var cellIdz = "#c" + i + "-z";
        board[i] = 0;
        $(cellIdx).css("fill", "#FFFFFF");
        $(cellIdy).css("fill", "#FFFFFF");
        $(cellIdz).css("fill", "#FFFFFF");
    }
    return board;
}

/**
 * Controls modal visibility for human or computer opponent choice.
 * @author William R.A.D. Funk
 */
function overlay()
{
    document.getElementById("human-or-comp").style.visibility = "hidden";
}

/**
 * When a square is selected and updated.
 * @param {String} cellId - HTML square's ID.
 * @param {Array} board - The TicTacToe board.
 * @param {String} pTurn - Current player.
 * @returns {String} pTurn - Next player's turn.
 * @author William R.A.D. Funk
 */
function selectSquare(cellIndex, board, pTurn)
{
    if(checkIfAvailable(board, cellIndex))
    {
        // Update the board.
        board = attachPlayerToCell(pTurn, cellIndex, board);
        // Was the move a winner?
        if(checkForWin(board, pTurn))
        {
            alert("Player " + pTurn + " wins the round!\n\n");
            increaseScore(pTurn);
            board = resetBoard(board);
        }
        // Was the move a tie?
        else if(checkForTie(board))
        {
            alert("Tie Game! No points awarded.");
            board = resetBoard(board);
        }
        // Next player's turn.
        pTurn = changeTurn(pTurn);
    }
    // If computer opponent, computer makes move.
    if(pType == "computer" && pTurn == "2")
    {
        var nextMove = AIchoice(board);
        pTurn = selectSquare(AIchoice(board), board, pTurn);
        return pTurn;
    }
    // If human opponent, person gets to make a move.
    else
    {
        return pTurn;
    }
}

/**
 * Takes cellId, and gets cell number.
 * @param {String} cellId - HTML Id of chosen square.
 * @returns {Number} - numerical index of chosen square.
 * @author William R.A.D. Funk
 */
function getCellNum(cellId)
{
    return cellId.substring(2, cellId.length-2);
}

/**
 * ActionListeners activated when page is finished loading.
 * @author William R.A.D. Funk
 */
$( document ).ready(function()
{
    /**
     * ActionListeners specific to the cells of the TicTacToe board.
     * @author William R.A.D. Funk
     */

     $("svg polygon")
        .click(function(event)
        {
            var cellId = event.target.id;
            cellId = "#" + cellId;

            pTurn = selectSquare(getCellNum(cellId), board, pTurn);
        })
        .mouseover(function(event)
        {
            var cellId = event.target.id;
            cellId = "#" + cellId;


            if (checkIfAvailable(board, getCellNum(cellId)))
            {
                $(cellId).css("opacity", '0.5');
            }
        })
        .mouseout(function(event)
        {
            var cellId = event.target.id;
            cellId = "#" + cellId;
            $(cellId).css("opacity", '1.0');
        });
        
     /**
     * ActionListeners specific to the buttons ("Reset Board" and "AI or Human Opponent")
     * @author William R.A.D. Funk
     */
    $("button")
        .click(function(event)
        {
            if(this.id == "btn-reset")
            {
                board = resetBoard(board);
                $("#p1-score span").html("0");
                $("#p2-score span").html("0");
                changeTurn("2");
            }
            else if(this.id == "human" || this.id == "computer")
            {
                overlay();
                pType = (this.id == "computer") ? "computer" : "human";
            }
        });
});