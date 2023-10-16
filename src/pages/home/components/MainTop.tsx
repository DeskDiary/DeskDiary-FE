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
    <NavHeader justify="space-between">
      <Empty>　</Empty>

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
        방만들기
      </CreateRoomButton>
      {openCreateRoom && (
        <CreateRoomModal setOpenCreateRoom={setOpenCreateRoom} />
      )}
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

const CreateRoomButton = styled.button`
  display: flex;
  width: 15%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e8e8e8;
  border: none;
  font-size: 15px;

  min-width: 100px;
`;

const Empty = styled.div`
  width: 15%;
`;

const NavHeader = styled(FlexContainer)`
  width: 100%;
  margin-top: 28px;
`;

const Search = styled(FlexContainer)<{ isFocused: boolean }>`
  width: 570px;
  height: 28px;
  border-radius: 100px;
  border: 1px solid var(--gray-07, #757575);
  padding: 10px;
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
`;

export default MainTop;
