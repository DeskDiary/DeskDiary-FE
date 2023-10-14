import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'sonner';
import styled from '@emotion/styled';
import CreateRoomModal from './CreateRoomModal';

type MainTopProps = {};

const MainTop: React.FC<MainTopProps> = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

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
    <NavHeader justify="start">
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

      <CreateRoomBtton type="button" onClick={onClickCreateRoomButton}>
        방만들기
      </CreateRoomBtton>
      {openCreateRoom && <CreateRoomModal setOpenCreateRoom={setOpenCreateRoom}/>}
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

const CreateRoomBtton = styled.button`
  display: flex;
  width: 292px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  margin-left: 241px;

  background-color: #e8e8e8;
  border: none;

  color: #000;

  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;
`;

const NavHeader = styled(FlexContainer)`
  width: calc(100vw - 200px);
  margin-top: 28px;
`;

const Search = styled(FlexContainer)<{ isFocused: boolean }>`
  width: 576px;
  height: 28px;
  border-radius: 100px;
  border: 1px solid var(--gray-07, #757575);
  padding: 10px 8px 10px 15px;
  margin-left: 469px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 19px;
  border: none;

  color: #000;

  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.5%; /* 18.525px */
  letter-spacing: 0.25px;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const SearchButton = styled.div`
  cursor: pointer;
`;

export default MainTop;
