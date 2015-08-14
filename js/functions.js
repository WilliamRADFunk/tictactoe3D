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
    // Checks to make sure legitimate player number was passed.
    if (pTurn != "1" && pTurn != "2")
    {
        console.log("ERROR: Player number has exceeded bounds!");
        return false;
    }
    // Checks all win scenarios.
    if( (board[0] != 0 && board[0] == board[1] && board[1] == board[2]) || //X-Z Wins
        (board[0] != 0 && board[0] == board[4] && board[4] == board[8]) || //X-Z Wins
        (board[0] != 0 && board[0] == board[3] && board[3] == board[6]) || //X-Z Wins
        (board[1] != 0 && board[1] == board[4] && board[4] == board[7]) || //X-Z Wins
        (board[2] != 0 && board[2] == board[5] && board[5] == board[8]) || //X-Z Wins
        (board[2] != 0 && board[2] == board[4] && board[4] == board[6]) || //X-Z Wins
        (board[3] != 0 && board[3] == board[4] && board[4] == board[5]) || //X-Z Wins
        (board[6] != 0 && board[6] == board[7] && board[7] == board[8]) || //X-Z Wins
        (board[9] != 0 && board[9] == board[10] && board[10] == board[11]) || //X-Z Wins
        (board[9] != 0 && board[9] == board[13] && board[13] == board[17]) || //X-Z Wins
        (board[9] != 0 && board[9] == board[12] && board[12] == board[15]) || //X-Z Wins
        (board[10] != 0 && board[10] == board[13] && board[13] == board[16]) || //X-Z Wins
        (board[11] != 0 && board[11] == board[14] && board[14] == board[17]) || //X-Z Wins
        (board[11] != 0 && board[11] == board[13] && board[13] == board[15]) || //X-Z Wins
        (board[12] != 0 && board[12] == board[13] && board[13] == board[14]) || //X-Z Wins
        (board[15] != 0 && board[15] == board[16] && board[16] == board[17]) || //X-Z Wins
        (board[18] != 0 && board[18] == board[19] && board[19] == board[20]) || //X-Z Wins
        (board[18] != 0 && board[18] == board[22] && board[22] == board[26]) || //X-Z Wins
        (board[18] != 0 && board[18] == board[21] && board[21] == board[24]) || //X-Z Wins
        (board[19] != 0 && board[19] == board[22] && board[22] == board[25]) || //X-Z Wins
        (board[20] != 0 && board[20] == board[23] && board[23] == board[26]) || //X-Z Wins
        (board[20] != 0 && board[20] == board[22] && board[22] == board[24]) || //X-Z Wins
        (board[21] != 0 && board[21] == board[22] && board[22] == board[23]) || //X-Z Wins
        (board[24] != 0 && board[24] == board[25] && board[25] == board[26]) || //X-Z Wins
        (board[0] != 0 && board[0] == board[9] && board[9] == board[18]) || //X-Y Wins
        (board[1] != 0 && board[1] == board[10] && board[10] == board[19]) || //X-Y Wins
        (board[2] != 0 && board[2] == board[11] && board[11] == board[20]) || //X-Y Wins
        (board[0] != 0 && board[0] == board[10] && board[10] == board[20]) || //X-Y Wins
        (board[2] != 0 && board[2] == board[10] && board[10] == board[18]) || //X-Y Wins
        (board[3] != 0 && board[3] == board[12] && board[12] == board[21]) || //X-Y Wins
        (board[4] != 0 && board[4] == board[13] && board[13] == board[22]) || //X-Y Wins
        (board[5] != 0 && board[5] == board[14] && board[14] == board[23]) || //X-Y Wins
        (board[3] != 0 && board[3] == board[13] && board[13] == board[23]) || //X-Y Wins
        (board[5] != 0 && board[5] == board[13] && board[13] == board[21]) || //X-Y Wins
        (board[6] != 0 && board[6] == board[15] && board[15] == board[24]) || //X-Y Wins
        (board[7] != 0 && board[7] == board[16] && board[16] == board[25]) || //X-Y Wins
        (board[8] != 0 && board[8] == board[17] && board[17] == board[26]) || //X-Y Wins
        (board[6] != 0 && board[6] == board[16] && board[16] == board[26]) || //X-Y Wins
        (board[8] != 0 && board[8] == board[16] && board[16] == board[24]) || //X-Y Wins
        (board[0] != 0 && board[0] == board[13] && board[13] == board[26]) || //X-Y Wins
        (board[6] != 0 && board[6] == board[13] && board[13] == board[20]) || //X-Y Wins
        (board[2] != 0 && board[2] == board[13] && board[13] == board[24]) || //X-Y Wins
        (board[8] != 0 && board[8] == board[13] && board[13] == board[18]) || //X-Y Wins
        (board[0] != 0 && board[0] == board[12] && board[12] == board[24]) || //Y-Z Wins
        (board[6] != 0 && board[6] == board[12] && board[12] == board[18]) || //Y-Z Wins
        (board[1] != 0 && board[1] == board[13] && board[13] == board[25]) || //Y-Z Wins
        (board[7] != 0 && board[7] == board[13] && board[13] == board[19]) || //Y-Z Wins
        (board[2] != 0 && board[2] == board[14] && board[14] == board[26]) || //Y-Z Wins
        (board[8] != 0 && board[8] == board[14] && board[14] == board[20]) )  //Y-Z Wins
    {
        return true;
    }
    else
    {
        return false;
    }
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
        var start = new Date().getTime();
        var nextMove = AIchoice(board);
        pTurn = selectSquare(AIchoice(board), board, pTurn);
        var end = new Date().getTime();
        console.log(end - start);
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