import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

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

  render() {
    return (
      <div>
        <Title>Simon Game</Title>
      </div>
    );
  }
}

export default App;
