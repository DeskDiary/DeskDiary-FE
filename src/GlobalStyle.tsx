import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  } */

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

      --font-a: "PrePretendard"

    }
  body {
    width: 100vw;
    scroll-behavior: smooth;
    overflow-x: hidden;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    line-height: 123.5%; /* 29.64px */
    letter-spacing: 0.25px;
    font-feature-settings: 'clig' off, 'liga' off;
  }

  *{
    font-family: Pretendard;
    /* font-family: NotoSansKR-Regular; */
    font-style: normal;
    font-weight: 900;
    line-height: 123.5%; /* 29.64px */
    letter-spacing: 0.25px;
    font-feature-settings: 'clig' off, 'liga' off;
  }

   /* 스크롤바 트랙(배경) 디자인 */
   ::-webkit-scrollbar-track {
    background: rgba(0, 197, 255, 0.2);
  }

  /* 스크롤바 핸들 디자인 */
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 197, 255, 0.4);
    border-radius: 10px;
  }

  /* 스크롤바 핸들 호버 상태 */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* 스크롤바의 넓이 */
  ::-webkit-scrollbar {
    width: 10px;
  }



`;
export default GlobalStyle;
