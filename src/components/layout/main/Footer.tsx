import styled from '@emotion/styled';
import React from 'react';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return <StFooter>Footer 입니당~!~!~!~!~!</StFooter>;
};

const StFooter = styled.div`
  width: 100%;
  height: 200px;
  min-height: screen-height;
  position: absolute;
  background-color: #e8e8e8;
  bottom: 0px;
  display: flex;
`;
export default Footer;
