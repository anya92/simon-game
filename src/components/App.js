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
    audio[color].play();
    this.visualEffect(color);
  }

  visualEffect = color => {
    let circle = document.getElementById(color);
    circle.classList.add('clicked');
    setTimeout(() => {
      circle.classList.remove('clicked');
    }, 200);
  }

  playerMove = () => {

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
