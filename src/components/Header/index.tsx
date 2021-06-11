import React, { useMemo } from "react";
import styled from "styled-components";
import { Badge, Button, Input, Space, Tooltip } from "antd";
import { useMessagesStream } from "../../adapters/documents";
import {
  HomeOutlined,
  NotificationOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import SignOut from "../SignOut";
import AddModal from "../students/add";
import { actions } from "../../modules/Users";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";

const { Search } = Input;

const StyledSearch = styled(Search)`
  min-width: 200px;
  input:focus {
    min-width: 500px;
  }
`;

const HeaderContainer = styled.div`
  height: 4rem;
  background-color: #212738;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  text-transform: uppercase;
  box-shadow: 0 0 20px 0 rgba(69, 90, 100, 0.9);
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;
const Span = styled.span`
  font-weight: 500;
  font-size: 1.25rem;
  color: rgba(228, 204, 255, 0.64);
`;
const Header = () => {
  const dispatch = useDispatch();
  const onSearch = (value: string) => {
    dispatch(
      actions.get.request({
        limit: 25,
        filterStr: value,
      })
    );
  };
  const { pathname } = useLocation();

  const renderType = useMemo(() => pathname.includes("documents"), [pathname]);
  const pendings = useMessagesStream();

  return (
    <HeaderContainer>
      <LeftSide>
        <Link to={"/"}>
          <Span>სტუდენტის პორტალი</Span>
        </Link>
        <Link to={"/"}>
          <Button
            type={renderType ? "link" : "primary"}
            ghost
            icon={<HomeOutlined />}
          >
            მთავარი
          </Button>
        </Link>
        <Link to={"/documents"}>
          <Button
            type={renderType ? "primary" : "link"}
            ghost
            icon={<ProfileOutlined />}
          >
            დოკუმენტები
          </Button>
        </Link>
      </LeftSide>
      <Space>
        <Actions>
          {!renderType && (
            <StyledSearch
              placeholder="იპოვე სტუდენტი (სახელით, ელ. ფოსტით, კორპუსით ან პირადი ნომრით)"
              onSearch={onSearch}
              enterButton
            />
          )}
          <AddModal />
          <Tooltip title="განსახილი დოკუმენტები" placement="bottom">
            <Link to={"/documents?status=Pending"}>
              <Badge count={pendings?.length}>
                <NotificationOutlined
                  style={{ fontSize: "1.25rem", color: "#fff", marginTop: 5 }}
                />
              </Badge>
            </Link>
          </Tooltip>
          <SignOut />
        </Actions>
      </Space>
    </HeaderContainer>
  );
};

export default Header;
