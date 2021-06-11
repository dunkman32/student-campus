import styled from "styled-components";
import {Table} from "antd";

const StyledTable = styled(Table)`
  margin: 0 auto;
`

const StyledHeader = styled.div`
  background-image: url("https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #eee;
  height: 250px;
  i {
    position: relative;
    cursor: pointer;
    right: -96%;
    top: 25px;
    font-size: 18px !important;
    color: #fff;
  }

  @media (max-width: 800px) {
    header {
      height: 150px;
    }

    header i {
      right: -90%;
    }
  }
`

const Container = styled.div`
  box-shadow: -1px -1px 6px 1px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  background-color: #282c34;
  padding: 2rem 5rem;
  display: grid;
  grid-template-columns: 1.2fr 3fr;
  justify-content: space-between;
`

const Photo = styled.img`
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 50%;
  border: 4px solid #fff;
`
const Image = styled.img`
  width: 150px;
  max-height: 300px;
`
const Username = styled.h4`
  margin-top: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 18pt;
  color: #13c2c2;
`
const Info = styled.p`
  margin-top: -5px;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11pt;
  color: #aaa;
`
const InfoDiv = styled.div`
  text-align: center;
`

const Docs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
`

const ImageWrapper = styled.div`
  text-align: center;
`

const ImageName = styled.span`
  display: block;
  color: #aaa;
  padding: .325rem;
`

export {
    Photo,
    Username,
    InfoDiv, Docs,
    Image, Info,
    StyledTable,
    StyledHeader,
    Container,
    ImageWrapper,
    ImageName
}

