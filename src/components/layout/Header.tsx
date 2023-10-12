import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'sonner';
import styled from '@emotion/styled';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();

  // const isLogged = Boolean(Cookies.get('accessToken'));
  const isLogged = false;

  const [isFocused, setIsFocused] = useState(false);

  const clickSearch = () => {
    setIsFocused(true);
  };

  const blurSearch = () => {
    setIsFocused(false);
  };

  const onclickSearch = () => {
    toast.message('search click');
  };

  const handleMyPageClick = () => {
    if (isLogged) {
      navigate('/mypage');
    } else {
      toast.error('로그인을 먼저 해주세요!');
    }
  };

  return (
    <NavHeader>
      <NavContent justify="space-between">
        <Logo>
          <Link to="/">
            <img src="/images/Logo.png" />
          </Link>
        </Logo>
        <NavMenu>
          <NavCategory to="/room">방</NavCategory>
          <NavCategory to="/mypage">마이페이지</NavCategory>
        </NavMenu>
        <NavUser gap="20px">
          <Search isFocused={isFocused} justify="space-between">
            <SearchInput onFocus={clickSearch} onBlur={blurSearch} />
            <SearchButton onClick={onclickSearch}>
              <SearchIcon />
            </SearchButton>
          </Search>
          <User gap="10px">
            {isLogged ? (
              <div onClick={handleMyPageClick}>
                <Link to="/logout">LOGOUT</Link>
              </div>
            ) : (
              <>
                <Link to="/auth/login">LOGIN</Link>
                <Link to="/auth/join">JOIN</Link>
              </>
            )}
          </User>
        </NavUser>
      </NavContent>
    </NavHeader>
  );
};

const FlexContainer = styled.div<{
  column?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
`;

const NavCategory = styled(NavLink)`
  height: 100%;
  position: relative;
  padding: 0 15px;

  display: flex;
  align-items: center;
  &[aria-current] {
    font-weight: bold;
    border-bottom: 2px solid black;
  }
`;

const NavMenu = styled(FlexContainer)`
  height: 100%;
  gap: 20px;
  margin-right: auto;
  margin-left: 50px;
`;

const NavUser = styled(FlexContainer)``;

const User = styled(FlexContainer)``;

const NavHeader = styled(FlexContainer)`
  width: 100vw;
  height: 76px;
  background-color: white;
  box-shadow: 0px 2px 6px 0px #e8e8e8;
  z-index: 100;

  position: fixed;
  top: 0;
  left: 0;
`;

const NavContent = styled(FlexContainer)`
  width: 1200px;
  height: 100%;
`;

const Search = styled(FlexContainer)<{ isFocused: boolean }>`
  width: 200px;
  height: 30px;
  border: 1px solid black;
  border-color: ${props => (props.isFocused ? 'green' : 'black')};

  &:focus {
    border: 1px solid green;
  }
`;

const SearchInput = styled.input`
  width: 150px;
  height: 25px;
  border: none;
  font-size: 18px;
  padding-left: 5px;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.div`
  cursor: pointer;
`;

const Logo = styled.div`
  width: 100px;
`;

export default Header;
