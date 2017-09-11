import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import Controlers from './Controlers';
import GameBoard from './GameBoard';

const audio = {
  red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Sarpanch:900');
  body {
    font-family: 'Sarpanch';
    color: #333;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
  margin-top: 20px;
`;

const Game = styled.div`
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 1000px;
  margin: 20px auto;
`;

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      gameIsPlaying: false,
      strictMode: false,
      yourTurn: false,
      gameMoves: [],
      playerMoves: [],
      count: 0,
      message: ''
    };
  }

  startGame = () => {
    this.setState({ gameIsPlaying: true });
    this.generateMove();
  }

  setStrictMode = () => {
    this.setState(prevState => {
      return {
        strictMode: !prevState.strictMode
      };
    });
  }

  resetGame = () => {
    this.setState({
      gameIsPlaying: false,
      yourTurn: false,
      gameMoves: [],
      playerMoves: [],
      count: 0,
      message: ''
    });
  }

  generateMove = () => {
    let { count, gameMoves } = this.state;
    count++;
    let randomMove = ['red', 'blue', 'yellow', 'green'][Math.floor(Math.random() * 4)];
    gameMoves.push(randomMove);
    this.setState({ gameMoves, count });
    this.showMoves();
  }

  showMoves = () => {
    let { gameMoves } = this.state;
    let i = 0;
    let moves = setInterval(() => {
      this.playMove(gameMoves[i]);
      i++;
      if (i >= gameMoves.length) {
        clearInterval(moves);
      }
    }, 600);
    // clear playerMoves array
    this.setState({
      playerMoves: [],
      yourTurn: true
    });
  }

  playMove = color => {
    // audio effect
    audio[color].play();
    // visual effect
    this.visualEffect(color);
  }

  visualEffect = color => {
    let circle = document.getElementById(color);
    circle.classList.add('clicked');
    setTimeout(() => {
      circle.classList.remove('clicked');
    }, 200);
  }

  playerMove = color => {
    let { playerMoves, yourTurn } = this.state;
    if (yourTurn) {
      playerMoves.push(color);
      this.setState({ playerMoves });
      this.checkPlayer(color);
      this.visualEffect(color);
    }
  }

  checkPlayer = color => {
    let { playerMoves, gameMoves, strictMode, count, yourTurn } = this.state;
    if (playerMoves[playerMoves.length - 1] !== gameMoves[playerMoves.length - 1]) { // wrong move
      if (strictMode) {
        this.setState({ message: 'Spróbuj ponownie! Od początku...' });
        this.resetGame();
      } else {
        this.setState({
          yourTurn: false,
          message: 'Spróbuj ponownie!'
        });
        this.showMoves();
      }
    } else { // ok
      audio[color].play();
      if (playerMoves.length === gameMoves.length) {
        this.setState({ message: 'Dobrze!' });
        if (count === 20) { // game is over
          this.setState({ message: 'Wygrałeś!!!' });
        } else { // next round
          this.setState({
            yourTurn: false,
            message: 'Następna runda'
          });
          setTimeout(() => this.generateMove(), 500);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Title>simon game</Title>
        <Game>
          <Controlers 
            gameIsPlaying={this.state.gameIsPlaying}
            strictMode={this.state.strictMode}
            startGame={this.startGame}
            setStrictMode={this.setStrictMode}
            resetGame={this.resetGame}
          />
          <GameBoard 
            playerMove={this.playerMove}
          />
        </Game>
      </div>
    );
  }
}

export default App;
