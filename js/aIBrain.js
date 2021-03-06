/**
 *TicTacToe Javascript v1.0
 *Last Updated: 2015-07-28
 *Author: William R.A.D. Funk - http://WilliamRobertFunk.com 
*/

var memoBoard = [];

/**
 * Chooses the best move for the AI player
 * @param {array} board - The state of the TicTacToe board before decision.
 * @var {Array} pBoard - A copy of the gameboard where hypothetical moves are tested.
 * @var {Number} moveValue - Keeps track of current move's score.
 * @var {Number} beta - Part of alpha-beta pruning to avoid unnecessary recursive calls.
 * @var {Number} alpha - Part of alpha-beta pruning to avoid unnecessary recursive calls.
 * @returns {Number} bestIndex - The AI choice of moves with highest score.
 * @author William R.A.D. Funk
 */
function AIchoice(board)
{
    var bestIndex = -1;
    var bestScore = -10000;
    var alpha = Number.NEGATIVE_INFINITY;
    var beta = Number.POSITIVE_INFINITY;
    var startTime = new Date().getTime();
    var cutOffTime = startTime + 120000;
    var moveValue;
    var n = 0;

    for(n = 0; n < 27; n++)
    {
        if(board[n] == 0)
        {
            var pBoard = [];
            pBoard = board.slice(0);
            pBoard[n] = 2;
            // Finds the score for this move.
            moveValue = minimax(pBoard, 0, 2, alpha, beta, cutOffTime);
            pBoard[n] = 0;

            if(moveValue > alpha)
            {
                alpha = moveValue;
            }

            if(moveValue > bestScore)
            {
                bestScore = moveValue;
                bestIndex = n;
            }
        }
    }
    return bestIndex;
}
/**
 * Uses recursive minimax to determine score of each chosen move.
 * @param {Array} tboard - The state of the TicTacToe board before decision.
 * @param {Number} depth - Number of levels down from original move.
 * @param {String} pTurn - Which player is making the move at that level.
 * @param {Number} alpha - Part of alpha-beta pruning to avoid unnecessary recursive calls.
 * @param {Number} beta - Part of alpha-beta pruning to avoid unnecessary recursive calls.
 * @var {Array} possibleMoves - keeps track of possible moves at each recursive layer.
 * @var {Array} scores - keeps track of scores at each recursive layer.
 * @var {Array} theoreticalBoard - A clone of the gameboard where hypothetical moves are tested.
 * @var {Number} moveValue - Score for that index at this level.
 * @returns {Number} max - If at an odd numbered level, the max score is returned.
 * @returns {Number} min - If at an even numbered level, the min score is returned.
 * @author William R.A.D. Funk
 */
function minimax(tboard, depth, pTurn, alpha, beta, cutOffTime)
{
    // Ensures computer takes the immediate win when present.
    if( (depth == 0) && (checkForWin(tboard, pTurn)) )
    {
        return 1000000;
    }
    // If this board layout has been searched before,
    // use previously acquired score value.
    else if( !( typeof memoBoard[getKey(tboard)] === "undefined") )
    {
        var scores = getHash(getKey(tboard));
    }
    else
    {
        // Resetting iterative variables separately from for loops for recursion.
        var h = 0, i = 0, q = 0, v = 0;
        var possibleMoves = [];
        var scores = [  -10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000,
                        -10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000,
                        -10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000 ];
        // It's a new turn, change players.
        pTurn = (depth % 2 == 0) ? "1" : "2"
        // Gets all the possible moves.
        for(h = 0; h < 27; h++)
        {
            if(tboard[h] == 0)
            {
                possibleMoves.push(h);
            }
        }
        for(i = 0; i < possibleMoves.length; i++)
        {
            var currTime = new Date().getTime();
            // A copy of the gameboard where hypothetical
            // moves are tested.
            var theoreticalBoard = [];
            theoreticalBoard = tboard.slice(0);
            theoreticalBoard[possibleMoves[i]] = pTurn;
            var moveValue;
            // Somebody won: negative if not computer, positive otherwise.
            if(checkForWin(theoreticalBoard, pTurn))
            {
                moveValue = (depth % 2 == 0) ? (-1000 + depth) : (1000 - depth);
            }
            // It's a draw
            else if(checkForTie(theoreticalBoard))
            {
                moveValue = (0 - depth);
            }
            // Computer ran out of time.
            else if(currTime >= cutOffTime)
            {
                moveValue = (0 - depth);
            }
            // Computer can't think any further ahead.
            else if(depth >= 6)
            {
                moveValue = (0 - depth);
            }
            //Prune remaining branches.
            else if( (depth % 2 == 0) && (alpha >= beta) )
            {
                moveValue = beta;
            }
            // Recursively test remaining moves.
            else
            {
                moveValue = minimax(theoreticalBoard, depth + 1, pTurn, alpha, beta, cutOffTime);
            }
            // Reset board clone to avoid recursive variable conflict.
            theoreticalBoard = tboard.slice(0);
            // Score for that move is registered.
            scores[possibleMoves[i]] = moveValue;

            if( (depth % 2 == 1) && (moveValue > alpha) )
            {
                alpha = moveValue;
            }
            else if( (depth % 2 == 0) && (moveValue < beta) )
            {
                beta = moveValue;
            }
        }
        // Add this board layout to the memoBoard.
        putHash(tboard, scores);
    }
    // If it's a computer layer, the maximum is chosen.
    // Shows how computer will always choose most beneficial
    // move for itself.
    if(depth % 2 == 1)
    {
        var max = -10000;
        for(k = 0; k < 27; k++)
        {
            // 3 signals an inert block
            if( (scores[k] > -10000) && (scores[k] > max) && (tboard[k] != 3) )
            {
                max = scores[k];
            }
        }
        return max;
    }
    // If it's a non-computer layer, the minimum score is returned.
    // Shows how computer's opponent will choose the least beneficial
    // move for computer.
    else
    {
        var min = 10000;
        for(v = 0; v < 27; v++)
        {
            // 3 signals an inert block
            if( (scores[v] > -10000) && (scores[v] < min)  && (tboard[v] != 3) )
            {
                min = scores[v];
            }
        }
        return min;
    }
}

function getKey(theoreticalBoard)
{
    var key = "1";
    var i = 0;

    for(i = 0; i < 27; i++)
    {
        key = key.concat(theoreticalBoard[i]);
    }
    return key;
}

function getHash(key)
{
    return memoBoard[key];
}

function putHash(theoreticalBoard, score)
{
    memoBoard[getKey(theoreticalBoard)] = score;
}