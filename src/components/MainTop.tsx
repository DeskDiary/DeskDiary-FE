import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'sonner';
import styled from '@emotion/styled';
import CreateRoomModal from '../pages/CreateRoomModal';
import { getCookie, setTokenCookie } from '../auth/cookie';
import addroom from '../images/addroom.svg'

type MainTopProps = {};

const MainTop: React.FC<MainTopProps> = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  const token = getCookie('token');

  const onClickCreateRoomButton = () => {
    setOpenCreateRoom(!openCreateRoom);
  };

  const clickSearch = () => {
    setIsFocused(true);
  };

  const blurSearch = () => {
    setIsFocused(false);
  };

  const onclickSearch = () => {
    toast.message('search click');
  };

  return (
    <NavHeader justify="space-between">
      {token ? (
          <User to="/mypage/:id">
            <img></img>
            <p>박서현</p>님의 마이페이지
          </User>
        ) : (
          <User to="/login">
            <img></img>
            <p>
              로그인이 필요합니다.
            </p>
          </User>
        )}

      <Search isFocused={isFocused} justify="space-between">
        <SearchInput
          onFocus={clickSearch}
          onBlur={blurSearch}
          placeholder="검색어입력"
        />
        <SearchButton onClick={onclickSearch}>
          <SearchIcon />
        </SearchButton>
      </Search>

      <CreateRoomButton type="button" onClick={onClickCreateRoomButton}>
        <img src={addroom} />
        방만들기
      </CreateRoomButton>
      {openCreateRoom && (
        <CreateRoomModal setOpenCreateRoom={setOpenCreateRoom} />
      )}
    </NavHeader>
  );
};

const FlexContainer = styled.div<{
  isColumn?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.isColumn ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
`;

const User = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-07);

  > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #d9d9d9;
    margin-right: 15px;
  }

  > p {
    font-size: 14px;
    color: black;
  }
`;

const CreateRoomButton = styled.button`
  display: flex;
  width: 15%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--primary-01);
  border: none;
  font-size: 15px;

  min-width: 100px;
  color: var(--bw-whtie);

  > img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;

const NavHeader = styled(FlexContainer)`
  width: 100%;
  margin-top: 28px;
`;

const Search = styled(FlexContainer)<{ isFocused: boolean }>`
  width: 880px;
  height: 48px;
  border: 2px solid var(--gray-06);
  padding: 10px;
  border-radius: 5px;
  background-color: white;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 19px;
  border: none;
  font-size: 15px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const SearchButton = styled.div`
  cursor: pointer;
  opacity: 0.5;
`;

export default MainTop;
