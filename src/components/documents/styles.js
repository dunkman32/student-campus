import styled from "styled-components";
import {Table} from "antd";

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`


const StyledTable = styled(Table)`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 98%;
  }
`

export {
    Img,
    StyledTable,
}

