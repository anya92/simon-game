import React from 'react';
import styled from 'styled-components';

const Buttons = styled.div`
  margin: 0 auto;
`;

const Button = styled.button`

`;

const Controlers = ({ gameIsPlaying, strictMode, startGame, setStrictMode, resetGame }) => {
  return (
    <Buttons>
      {
        !gameIsPlaying
        ? (
            <div>
              <Button onClick={() => startGame()}>Start</Button>
              <Button onClick={() => setStrictMode()}>
                { 
                  strictMode 
                  ? <span>Normal </span> 
                  : <span>Strict </span> 
                } Mode
              </Button>
            </div>
          )
        : <Button onClick={() => resetGame()}>Reset</Button>
        }
    </Buttons>
  );
};

export default Controlers;
