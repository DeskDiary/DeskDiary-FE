import React from 'react';
import styled from 'styled-components';

type MypageListProps = {
  title: string,
  url: string
};

const MypageList:React.FC<MypageListProps> = ({title, url}) => {
  
  return <Container></Container>
}

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

const Container = styled(FlexContainer)`

`


export default MypageList;