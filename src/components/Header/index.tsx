import React, {useCallback, useMemo} from "react";
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
import logo from '../../static/images/logo.png'
const { Search } = Input;
const size = 25;

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
const Image = styled.img`
  width: 50px;
`;

const Span = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--blue);
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: .325rem;
  justify-content: space-between;
  align-items: center;
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
  const callTake = useCallback(() => {
    dispatch(
        actions.get.request({
          limit: size,
        })
    );
  }, [dispatch]);
  return (
    <HeaderContainer>
      <LeftSide>
        <StyledLink to={"/"}>
          <Image src={logo} alt='logo' />
          <Span>სტუდენტური პორტალი</Span>
        </StyledLink>
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
          <AddModal callTake={callTake}/>
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
