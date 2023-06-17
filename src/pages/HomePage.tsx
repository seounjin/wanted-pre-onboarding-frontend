import { Link } from "react-router-dom";
import { styled } from "styled-components";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";

const StyledLink = styled(Link)`
    font-size: 20px;
    margin-bottom: 20px;
`;


const HomePage = () => {
  return (
    <HomeLayout>
        <StyledLink to='/signin'>로그인</StyledLink>
        <StyledLink to='/signup'>회원가입</StyledLink>
        <StyledLink to='/todo'>투두리스트</StyledLink>
    </HomeLayout>
  )
}

export default HomePage;