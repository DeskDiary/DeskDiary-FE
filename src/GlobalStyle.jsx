import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    scroll-behavior: smooth;
    overflow-y: hidden;
  }

  *{
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    line-height: 123.5%; /* 29.64px */
    letter-spacing: 0.25px;
    font-feature-settings: 'clig' off, 'liga' off;
  }



`;
export default GlobalStyle;
