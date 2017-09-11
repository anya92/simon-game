import React from 'react';
import styled from 'styled-components';

const colors = {
  green: '#217C7E',
  red: '#9A3334',
  blue: '#3399FF',
  yellow: 'khaki'
};

const Circles = styled.div`
  margin: 20px auto;
  max-width: 500px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
`;

const Middle = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px auto;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  border: 10px solid ${props => colors[props.id]};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  &.clicked {
    transform: scale(1.3);
  }
`;

const GameBoard = ({ playerMove }) => {
  return (
    <Circles>
      <Top>
        <Circle id="green" />
      </Top>
      <Middle>
        <Circle id="red" />
        <Circle id="blue" />
      </Middle>
      <Bottom>
        <Circle id="yellow" />
      </Bottom>
    </Circles>
  );
};

export default GameBoard;
