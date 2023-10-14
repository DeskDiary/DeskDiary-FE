import React from 'react';
import styled from 'styled-components';

type DeskRecoderProps = {};

const DeskRecoder: React.FC<DeskRecoderProps> = () => {
  return (
    <Container column justify="start">
      <Title>최근 책상 기록</Title>
      <Content>
        <NoContent>아직 기록된 책상시간이 없습니다.</NoContent>
      </Content>
    </Container>
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

const NoContent = styled.div`
  margin-bottom: 99px;
  margin-top: auto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 36px */
  letter-spacing: -0.24px;
`;

const Content = styled(FlexContainer)`
  height: 100%;
  width: 100%;
`;

const Container = styled(FlexContainer)`
  width: 746px;
  height: 243px;
  background-color: #d9d9d9;
  padding: 0;
`;

const Title = styled.div`
  margin: 16px auto 0 16px;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 36px */
  letter-spacing: -0.24px;
`;

export default DeskRecoder;
