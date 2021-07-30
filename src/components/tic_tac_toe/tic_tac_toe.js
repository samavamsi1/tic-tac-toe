import React, { useState } from 'react'
import './tic_tac_toe.css';



const TIC_TAC_TOE = () => {

  /**
   * Component State
   */

    const [currentPlayer , setCurrentPlayer] = useState('X');

    const [gameState ,  setGameState] = useState(['', '', '', '', '', '', '', '', '']);

    const [currentGameStatus , setGameStatus] = useState(true);

    const [winningConditions] =  useState([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ])

    const [statusMessage, setStatusMessage] = useState('')

  /**Used to Display the Status */

    const statusDisplayMessage  = () => {
         if(statusMessage === ''){
             return currentPlayerTurn();
         }else{
             return `${statusMessage}`
         }
    }


    /**
     * 
     * @returns Current Player Turn with Player Name
     */
    const currentPlayerTurn = () => { return (`It's ${currentPlayer}'s turn` ) } ;

    /**
     * 
     * @returns Return Winning Player Text
     */
    const winningMessage = () => `Game Won by ${currentPlayer} player!!!`;

    /**
     * 
     * @returns Draw Message
     */
    const drawMessage = () => `It's a draw Game!`;

   /**
    * Player Change Tracking
    */

   const handlePlayerChange = () => {
       let  currentPlyer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(currentPlyer);
    }
    
    /**
     * 
     * Validating result
     */

    const handleResultValidation = () =>  {
        let roundWon = false;
        for (let i = 0; i <= winningConditions.length - 1; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            let message =  winningMessage();
            setStatusMessage(message);
            setGameStatus(false);
            return;
        }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            let message =  drawMessage();
            setStatusMessage(message);
            setGameStatus(false);
            return;
        }

        handlePlayerChange();
    }

    /**
     * 
     * @param {playerSelectedBox} clickedBox 
     * @param {indexOfPlayerSelectTag} clickedBoxIndex 
     */
    const handleBoxPlayed = (clickedBox, clickedBoxIndex) =>  {
        gameState[clickedBoxIndex] = currentPlayer;
        clickedBox.innerHTML = currentPlayer;
    }

   /**
    * 
    * @param {event} e 
    * @returns 
    */
    const  handleBoxClick = (e) =>  {
        console.log(e);
        const clickedBox = e.target;
        const clickedBoxIndex = parseInt(
            clickedBox.getAttribute('data-index')
        );

        if (gameState[clickedBoxIndex] !== '' || !currentGameStatus) {
            return;
        }

        handleBoxPlayed(clickedBox, clickedBoxIndex);
        handleResultValidation();
    }

    /**
     * Reset the Current States
     */

    const handleRestartGame = () =>  {

        setCurrentPlayer('X');
        setGameStatus(true);
        setGameState(['', '', '', '', '', '', '', '', ''])
        setStatusMessage('')
   
        document.querySelectorAll('.box').forEach(box => (box.innerHTML = ''));
    }



    return (
        <div className="center">
        <section>
        <h1 className="heading-cstm">Tic Tac Toe</h1>
        <div className="container">
            <div data-index="0" className="box" onClick={ (e) => {handleBoxClick(e)}} ></div>
            <div data-index="1" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
            <div data-index="2" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
            <div data-index="3" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
            <div data-index="4" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
            <div data-index="5" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
            <div data-index="6" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
            <div data-index="7" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
            <div data-index="8" className="box" onClick={ (e) => {handleBoxClick(e)}}></div>
        </div>
        <h2 className="status" > {statusDisplayMessage()}</h2>
        <button className="restart" onClick={handleRestartGame} >Restart Game</button>
       </section>
        </div>
    )
}

export default TIC_TAC_TOE
