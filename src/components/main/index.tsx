import React, { useEffect } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { selectors as authSelectors } from "../../modules/Auth";
import styled from "styled-components";
import { Typography } from "antd";
import Header from "../Header";

import Table from "../students/table";

const { Title } = Typography;

const StyledTitle = styled(Title)`
  text-align: center;
  font-style: italic;
  color: #001529 !important;
  margin-top: 0.5rem;
`;

const Index = () => {
  const user = useSelector(authSelectors.selectUser);
  return (
    <div className="App">
      <StyledTitle type="secondary" level={4}>
        Welcome back {user.name} your role is {user.role || "admin"}
      </StyledTitle>
      <hr />
      <Table />
    </div>
  );
};

export default Index;
