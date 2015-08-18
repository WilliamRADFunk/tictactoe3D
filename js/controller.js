/*
TicTacToe Javascript v1.0
Last Updated: 2015-07-28
Author: William R.A.D. Funk - http://WilliamRobertFunk.com 
*/

/** @var {Array} board - The TicTacToe board. */
var board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
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
/** @var {Number} view - Which SVG view is displayed on the screen. */
var view = 0;

/**
 * Checks to see if chosen square is already taken.
 * @param {Array} board - The state of the TicTacToe board.
 * @param {String} square - Is the chosen square empty.
 * @returns {Boolean} - True is empty, False is already taken.
 * @author William R.A.D. Funk
 */
function checkIfAvailable(board, square)
{
    // 3 signals inert cube
    if (board[square] == 1 || board[square] == 2 || board[square] == 3)
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
    var cellIda = "#c" + square + "-a";
    if (pTurn == "1")
    {
        $(cellIdx).css("fill", "#99FF99");
        $(cellIdy).css("fill", "#99FF99");
        $(cellIdz).css("fill", "#99FF99");
        $(cellIda).css("fill", "#99FF99");
        board[square] = 1;
        return board;
    }
    else if (pTurn == "2")
    {
        $(cellIdx).css("fill", "#FF99FF");
        $(cellIdy).css("fill", "#FF99FF");
        $(cellIdz).css("fill", "#FF99FF");
        $(cellIda).css("fill", "#FF99FF");
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
 * @var {String} player1Color - Background color for player 1.
 * @var {String} player2Color - Background color for player 2.
 * @returns {String} - Next player's turn.
 * @author William R.A.D. Funk
 */
function changeTurn(pTurn)
{
    var player1Color = "#99FF99";
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
    // Checks all win scenarios involving index 0, if player has that square.
    if(board[0] == pTurn)
        if( (board[1]  == pTurn && board[2]  == pTurn) || //X-Z Wins
            (board[3]  == pTurn && board[6]  == pTurn) || //X-Z Wins
            (board[4]  == pTurn && board[8]  == pTurn) || //X-Z Wins
            (board[9]  == pTurn && board[18] == pTurn) || //X-Y Wins
            (board[10] == pTurn && board[20] == pTurn) || //X-Y Wins
            (board[12] == pTurn && board[24] == pTurn) )  //Y-Z Wins
        {
            return true;
        }
    // Checks all win scenarios involving index 1, if player has that square.
    if(board[1] == pTurn)
        if( (board[4]  == pTurn && board[7]  == pTurn) || //X-Z Wins
            (board[10] == pTurn && board[19] == pTurn) )  //X-Y Wins
        {
            return true;
        }
    // Checks all win scenarios involving index 2, if player has that square.
    if(board[2] == pTurn)
        if( (board[5]  == pTurn && board[8]   == pTurn) || //X-Z Wins
            (board[4]  == pTurn && board[6]   == pTurn) || //X-Z Wins
            (board[10] == pTurn && board[18]  == pTurn) || //X-Y Wins
            (board[11] == pTurn && board[20]  == pTurn) || //X-Y Wins
            (board[14] == pTurn && board[26] == pTurn) )  //Y-Z Wins
        {
            return true;
        }
    // Checks all win scenarios involving index 3, if player has that square.
    if(board[3] == pTurn)
    {
        if( (board[4]   == pTurn && board[5]  == pTurn) || //X-Z Wins
            (board[12]  == pTurn && board[21] == pTurn) )  //X-Y Wins
        {
            return true;
        }
    }
    // Checks all win scenarios involving index 6, if player has that square.
    if(board[6] == pTurn)
        if( (board[7]  == pTurn && board[8]  == pTurn) || //X-Z Wins
            (board[12] == pTurn && board[18] == pTurn) || //Y-Z Wins
            (board[15] == pTurn && board[24] == pTurn) || //X-Y Wins
            (board[16] == pTurn && board[26] == pTurn) )  //X-Y Wins
        {
            return true;
        }
    // Checks all win scenarios involving index 8, if player has that square.
    if(board[8] == pTurn)
        if( (board[14] == pTurn && board[20] == pTurn) || //Y-Z Wins
            (board[16] == pTurn && board[24] == pTurn) || //X-Y Wins
            (board[17] == pTurn && board[26] == pTurn) )  //X-Y Wins
        {
            return true;
        }
    // Checks all win scenarios involving index 9, if player has that square.
    if(board[9] == pTurn)
        if( (board[10] == pTurn && board[11] == pTurn) || //X-Z Wins
            (board[12] == pTurn && board[15] == pTurn) ) //X-Z Wins
        {
            return true;
        }
    // Checks all win scenarios involving index 18, if player has that square.
    if(board[18] == pTurn)
        if( (board[19] == pTurn && board[20] == pTurn) || //X-Z Wins
            (board[22] == pTurn && board[26] == pTurn) || //X-Z Wins
            (board[21] == pTurn && board[24] == pTurn) )  //X-Z Wins
        {
            return true;
        }
    // Checks all win scenarios involving index 20, if player has that square.
    if(board[20] == pTurn)
        if( (board[23] == pTurn && board[26] == pTurn) || //X-Z Wins
            (board[22] == pTurn && board[24] == pTurn) )  //X-Z Wins
        {
            return true;
        }
    // Checks all non-duplicating win scenarios.
    if( (board[5]  == pTurn && board[14] == pTurn && board[23] == pTurn) || //X-Y Wins
        (board[7]  == pTurn && board[16] == pTurn && board[25] == pTurn) || //X-Y Wins
        (board[11] == pTurn && board[14] == pTurn && board[17] == pTurn) || //X-Z Wins
        (board[15] == pTurn && board[16] == pTurn && board[17] == pTurn) || //X-Z Wins
        (board[19] == pTurn && board[22] == pTurn && board[25] == pTurn) || //X-Z Wins
        (board[21] == pTurn && board[22] == pTurn && board[23] == pTurn) || //X-Z Wins
        (board[24] == pTurn && board[25] == pTurn && board[26] == pTurn) )  //X-Z Wins
    {
        return true;
    }
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
        if(board[i] != 3) // Center square is inert
        {
            var cellIdx = "#c" + i + "-x";
            var cellIdy = "#c" + i + "-y";
            var cellIdz = "#c" + i + "-z";
            var cellIda = "#c" + i + "-a";
            board[i] = 0;
            $(cellIdx).css("fill", "#B19CD9");
            $(cellIdy).css("fill", "#B19CD9");
            $(cellIdz).css("fill", "#B19CD9");
            $(cellIda).css("fill", "#B19CD9");
        }
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

$( document ).ready(function()
{
    /**
     * ActionListeners activated when page is finished loading.
     * @author William R.A.D. Funk
     */
    $("#svg-wrapper").append( getView(0) );
    $("#svg-wrapper").append( getView(1) );
    $("#svg-wrapper").append( getView(2) );
    $("#svg-wrapper").append( getView(3) );
    changeView(view);
    setViewButtonHeight(view);

    /**
     * ActionListeners activated when screen size changes.
     * @author William R.A.D. Funk
     */
    $("#wrapper")
        .resize(function(event)
        {
            setViewButtonHeight(view);
        });

    /**
     * ActionListeners specific to the cells of the TicTacToe board.
     * @author William R.A.D. Funk
     */
    $("polygon")
        .click(function(event)
        {
            var cellId = event.target.id;
            cellId = "#" + cellId;

            pTurn = selectSquare(getCellNum(cellId), board, pTurn);
            $(cellId).css("opacity", '1.0');
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
            // User wishes to start over.
            if(this.id == "btn-reset")
            {
                board = resetBoard(board);
                $("#p1-score span").html("0");
                $("#p2-score span").html("0");
                changeTurn("2");
            }
            // User chooses human or computer opponent.
            else if(this.id == "human" || this.id == "computer")
            {
                overlay();
                pType = (this.id == "computer") ? "computer" : "human";
            }
            // User changes view.
            else if(this.id == "btn-left" || this.id == "btn-right")
            {
                view = ( (this.id == "btn-left") ? (view - 1) : (view + 1) );
                if(view >= 4)
                {
                    view = 0;
                }
                else if(view <= -1)
                {
                    view = 3;
                }
                changeView(view);
                setViewButtonHeight(view);
            }
        });
});