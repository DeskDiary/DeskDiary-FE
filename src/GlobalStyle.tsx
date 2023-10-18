import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
      --gray-01: #FAFAFA;
      --gray-02: #F5F5F5;
      --gray-03: #EEE;
      --gray-04: #E0E0E0;
      --gray-05: #BDBDBD;
      --gray-06: #9E9E9E;
      --gray-07: #757575;
      --gray-08: #616161;
      --gray-09: #424242;

      --primary-01: #00C5FF;
      --primary-02: #0DBEF2;
      --primary-03: #1AB7E5;
      --primary-04: #26B0D9;
      --primary-05: #33A9CC;
      --primary-06: #40A2BF;
      --primary-07: #4C9BB2;
      --primary-08: #5994A6;
      --primary-09: #668D99;
      --primary-10: #73868C;

      --bw-whtie: #FEFEFE;

      --bw-back: #212121;

      --system-error: #D32F2F

    }
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
