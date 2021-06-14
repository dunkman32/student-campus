import React from "react";
import styled, {keyframes} from "styled-components";
import {HeartTwoTone} from '@ant-design/icons';

const FooterContainer = styled.div`
  height: 4rem;
  background-color: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
`;

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(1.15, 1.15, 1.15);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`;

const Icon = styled(HeartTwoTone)`
  animation: ${pulse} 1s linear infinite;
`
const A = styled.a`
  text-decoration: none;
  margin-right: .5rem;
  font-weight: 500;
  font-size: 1.25rem;
  color: var(--blue);
  font-family: 'Pacifico', cursive;
`

const Footer = () => {
    return (
        <FooterContainer>
            <div>
                <A href={'https://github.com/dunkman32/student-campus'}>
                    made by noZZa, givi & lasha with
                </A>
                <Icon style={{fontSize: '1.25rem',position: 'relative', top: 1}} twoToneColor="#bd104d"/>
            </div>
        </FooterContainer>
    )
}


export default Footer
