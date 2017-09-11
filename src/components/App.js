import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

import Controlers from './Controlers';
import GameBoard from './GameBoard';

import soundRed from '../sounds/simonSound1.mp3';
import soundBlue from '../sounds/simonSound2.mp3';
import soundYellow from '../sounds/simonSound3.mp3';
import soundGreen from '../sounds/simonSound4.mp3';

const audio = {
  red: new Audio(soundRed),
  blue: new Audio(soundBlue),
  yellow: new Audio(soundYellow),
  green: new Audio(soundGreen)
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
  font-size: 45px;
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
      // clear playerMoves array
        this.setState({
          playerMoves: [],
          yourTurn: true
        });
      }
    }, 600);
  }

  playMove = color => {
    // audio effect
    audio[color].play();
    // visual effect
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
      this.playMove(color);
    }
  }

  checkPlayer = color => {
    let { playerMoves, gameMoves, strictMode, count } = this.state;
    if (playerMoves[playerMoves.length - 1] !== gameMoves[playerMoves.length - 1]) { // wrong move
      if (strictMode) {
        this.renderMessage('Spróbuj ponownie! Od początku...');
        setTimeout(() => this.resetGame(), 1000);
      } else {
        this.renderMessage('Spróbuj ponownie!');
        this.setState({
          yourTurn: false
        });
        setTimeout(() => this.showMoves(), 1000);
      }
    } else { // ok
      if (playerMoves.length === gameMoves.length) {
        if (count === 20) { // game is over
          this.renderMessage('Wygrałeś!!! Gratulacje!');
          setTimeout(() => this.resetGame(), 1000);
        } else { // next round
          this.renderMessage('Dobrze! Następna runda.');
          this.setState({
            yourTurn: false
          });
          setTimeout(() => this.generateMove(), 600);
        }
      }
    }
  }

  renderMessage = message => {
    this.setState({ message });
    setTimeout(() => this.setState({ message: '' }), 1000);
  }

  render() {
    return (
      <div>
        <Title>simon game</Title>
        <Game>
          <GameBoard 
            playerMove={this.playerMove}
            message={this.state.message}
            strictMode={this.state.strictMode}
            count={this.state.count}
          />
          <Controlers 
            gameIsPlaying={this.state.gameIsPlaying}
            strictMode={this.state.strictMode}
            startGame={this.startGame}
            setStrictMode={this.setStrictMode}
            resetGame={this.resetGame}
          />
        </Game>
      </div>
    );
  }
}

export default App;
