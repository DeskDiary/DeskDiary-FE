import styled from '@emotion/styled';
import React from 'react';

type MypageProps = {};

const Mypage: React.FC<MypageProps> = () => {
  return <Container>마이페이지입니당~!~!~!</Container>;
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
  width: 100%;
`;

const Container = styled(FlexContainer)`
  width: 70%;
  background-color: lightblue;
`;
export default Mypage;
