import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  margin: 0 10px;
  border: none;
  padding: 5px;
  font-size: 20px;
  font-family: 'Sarpanch';
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const Controlers = ({ gameIsPlaying, strictMode, startGame, setStrictMode, resetGame }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {
        !gameIsPlaying
        ? (
            <div>
              <Button onClick={() => startGame()}>Start</Button>
              <Button onClick={() => setStrictMode()}>
                Poziom { !strictMode ? <span> trudny</span> : <span> normalny</span> }
              </Button>
            </div>
          )
        : <Button onClick={() => resetGame()}>Reset</Button>
        }
    </div>
  );
};

Controlers.propTypes = {
  gameIsPlaying: PropTypes.bool.isRequired,
  strictMode: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  setStrictMode: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
};

export default Controlers;
