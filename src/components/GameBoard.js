import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const colors = {
  green: '#217C7E',
  red: '#9A3334',
  blue: '#3399FF',
  yellow: 'khaki'
};

const Circles = styled.div`
  margin: 20px auto;
  width: 300px;
  height: 300px;
  max-width: 500px;
  position: relative;
  border: 10px solid #000;
  border-radius: 50%;
  @media all and (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`;

const Circle = styled.div`
  width: calc(100% / 2 - 10px);
  height: calc(100% / 2 - 10px);
  float: left;
  background-color: ${props => colors[props.id]};
  border-radius: ${props => 
    props.top && props.left ? '300px 0 0 0' 
    : props.top && props.right ? '0 300px 0 0' 
    : props.bottom && props.left ? '0 0 0 300px' 
    : '0 0 300px 0' 
  };
  border: 5px solid #000;
  cursor: pointer;
  transition: all 0.2s;
  &.clicked {
    transform: scale(1.3);
  }
`;

const Info = styled.div`
  width: 50%;
  height: 50%;
  background-color: #000;
  color: #fff;
  font-size: 18px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  span {
    color: #9A3334;
    font-size: 1.5rem;
  }
`;

const GameBoard = ({ playerMove, message, strictMode, count }) => {
  return (
    <Circles>
      <Circle id="green" top left onClick={() => playerMove('green')}/>
      <Circle id="red" top right onClick={() => playerMove('red')} />
      <Circle id="blue" bottom left onClick={() => playerMove('blue')} />
      <Circle id="yellow" bottom right onClick={() => playerMove('yellow')} />
      <Info>
        { 
          message || 
          <div>
            poziom trundości: {strictMode ? <span>trudny</span> : <span> normalny</span>} <br/><br/>
            Level: <span>{count}</span>
          </div>
        }
      </Info>
    </Circles>
  );
};

GameBoard.propTypes = {
  playerMove: PropTypes.func.isRequired,
  message: PropTypes.string,
  strictMode: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired
};

export default GameBoard;
