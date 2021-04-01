import styled from "styled-components";
import {Button, Form, Input} from "antd";
import Orange from "../../static/images/circleOrange.svg";

const StyledDiv = styled.div`
  background: linear-gradient(#FCFCFD, #6EC1E4);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledForm = styled(Form)`
  position: relative;
  width: 100%;
  box-shadow: 0 24px 56px 0 rgba(5, 57, 236, 0.04);
  background-color: #FFFFFF99;
  padding: 2rem 1rem;
  border-radius: 5px;
  -webkit-box-shadow: 0 24px 56px 0 rgba(5, 57, 236, 0.04);
  -moz-box-shadow: 0 24px 56px 0 rgba(5, 57, 236, 0.04);
  z-index: 1;
`;

const CircleGreenDiv = styled.div`
  position: absolute;
  bottom: -200px;
  left: 40px;
`

const CircleBlueDiv = styled.div`
  position: absolute;
  top: -200px;
  left: -200px;
    //background-image: url(${Orange});
`

const CircleOrangeDiv = styled.div`
  position: absolute;
  bottom: -25px;
  right: -25px;
`

const Div = styled.div`
  width: 25%;
  @media only screen and (max-width: 1280px) {
    width: 40%;
  }
  @media only screen and (max-width: 960px) {
    width: 50%;
  }
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
  position: relative;
`

const StyledInput = styled(Input)`
  height: 2.5rem;
  border-radius: 5px;
  padding: 2px 5px;
`

const StyledButton = styled(Button)`
  background-color: #6EC1E4;
`
export {
    StyledDiv,
    StyledForm,
    CircleGreenDiv,
    CircleBlueDiv,
    CircleOrangeDiv,
    Div,
    StyledInput,
    StyledButton
}