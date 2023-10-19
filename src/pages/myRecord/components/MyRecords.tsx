import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type MyRecordsProps = {};

type MenuType = 'today' | '7days' | '30days';

const MyRecords: React.FC<MyRecordsProps> = () => {
  const [menu, SetMenu] = useState<'today' | '7days' | '30days'>('today');

  const menus: { title: string; menuType: MenuType }[] = [
    {
      title: '오늘의 기록',
      menuType: 'today',
    },
    {
      title: '7일의 기록',
      menuType: '7days',
    },
    {
      title: '30일의 기록',
      menuType: '30days',
    },
  ];

  const handleMenuChange = (menuType: 'today' | '7days' | '30days') => {
    SetMenu(menuType);
  };

  return (
    <Container col gap="15px">
      <Label>책상 기록</Label>

      <RecordBox>
        <DayMenus col align="start">
          {menus.map((day, index) => (
            <DaysMenu
              type="button"
              key={index}
              onClick={() => handleMenuChange(day.menuType)}
              menu={menu === day.menuType}
            >
              {day.title}
            </DaysMenu>
          ))}
        </DayMenus>
        {menu === 'today' && <RecordContent>today</RecordContent>}
        {menu === '7days' && <RecordContent>7days</RecordContent>}
        {menu === '30days' && <RecordContent>30days</RecordContent>}
      </RecordBox>
    </Container>
  );
};

const FlexContainer = styled.div<{
  col?: boolean;
  align?: string;
  justify?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => (props.col ? 'column' : 'row')};
  align-items: ${props => (props.align ? props.align : 'center')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  gap: ${props => props.gap || '0'};
  width: 100%;
`;

const RecordBox = styled(FlexContainer)`
  height: 100%;
  width: 100%;
`;

const RecordContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
  border: 1px solid black;
  border-left: none;
  padding: 20px;
`;

const Label = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 150%; /* 36px */
  margin-right: auto;
`;

const DayMenus = styled(FlexContainer)`
  width: 250px;
  height: 100%;
`;

const DaysMenu = styled.button.withConfig({
  shouldForwardProp: (prop) => !['menu'].includes(prop)
})<{ menu?: boolean }>`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: rgba(217, 217, 217, ${props => (props.menu ? '1' : '0.5')});
  border-right: ${props => props.menu ?  'none' : ''}
`;

const Container = styled(FlexContainer)`
  width: 100%;
  height: 250px;
`;
export default MyRecords;
