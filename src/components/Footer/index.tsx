import React from "react";
import styled from "styled-components";
import {HeartTwoTone} from '@ant-design/icons';

const FooterContainer = styled.div`
  height: 4rem;
  background-color: transparent;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
`;

const A = styled.a`
  text-decoration: none;
  margin-right: .5rem;
  font-weight: 500;
  font-size: 1.25rem;
  color: rgba(235, 47, 150, .3);
`

const Header = () => {
    return (
        <FooterContainer>
            <div>
                <A href={'https://github.com/dunkman32/student-campus'}>
                    made by noZZa, Givi & Lasha with
                </A>
                <HeartTwoTone style={{fontSize: '1.25rem',position: 'relative', top: 1}} twoToneColor="#eb2f96"/>
            </div>
        </FooterContainer>
    )
}


export default Header
