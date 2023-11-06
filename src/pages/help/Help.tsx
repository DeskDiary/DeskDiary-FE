import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../images/logo-2.svg';
type HelpProps = {};

const Help: React.FC<HelpProps> = () => {
  useEffect(() => {
    document.title = '책상일기 - 문의';
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <img src={logo} alt="로고" />
          <p>고객센터</p>
        </div>
        <div>
          <p>자주 묻는 질문</p>
          <p>공지사항</p>
        </div>
      </Header>
      <Search>
        <p>책상일기 고객센터</p>
        <div>
          <input type="text" placeholder="무엇이든 찾아보세요" />
        </div>
        <div>
          <p>추천 키워드</p>
          <button>방 만들기</button>
          <button>방 조회</button>
          <button>이용방법</button>
          <button>가격</button>
        </div>
      </Search>
      <Contents>
        <Questions>
          <p>자주 묻는 질문</p>
          <QuestionList>
            <QuestionTitle>
              <p>이용방법</p>
              <p>책상 기록의 레벨은 어떻게 측정되나요?</p>
            </QuestionTitle>
            <QuestionContent>
              <p>책상 기록의 레벨 측정 방식은 다음과 같습니다.</p>
              <p>Lv 0. 1달 기준 누적시간 기록이 없을 때</p>
              <p>Lv 1. 1달 기준 누적시간 기록이 있을 때</p>
              <p>Lv 2. 1달 기준 누적시간 기록이 24시간 이상일 때</p>
              <p>Lv 3. 1달 기준 누적시간 기록이 168(7일)시간 이상일 때</p>
              <p>Lv 4. 1달 기준 누적시간 기록이 336(14일)시간 이상일 때</p>
            </QuestionContent>
          </QuestionList>
        </Questions>
      </Contents>
      <Footer>푸터</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100vw;
`;
const Header = styled.div`
  padding: 10px 50px;
  display: flex;
  background-color: #1a81e8;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100vw - 100px);
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      color: white;
    }
  }
  div:first-child {
    img {
      width: 30px;
    }
  }
`;
const Search = styled.div`
  margin-top: 55px;
  background-color: #1a81e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  > p:first-child {
    font-size: 40px;
    font-weight: 700;
    color: white;
  }
  div {
    display: flex;
  }
  div:nth-child(2) {
    width: 40%;
    height: 56px;
    border-radius: 28px;
    padding: 0px 40px;
    background-color: white;
  }
  width: 100vw;
  height: 450px;
  div > p {
    color: white;
    font-weight: 600;
  }
  button {
    color: white;
    background-color: transparent;
    border: none;
  }
  input {
    border: none;
  }
  input:focus {
    outline: none;
    width: 100%;
  }
`;

const Contents = styled.div`
  margin-right: 150px;
  margin-left: 150px;
`;
const Questions = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  > p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 50px;
  }
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuestionTitle = styled.div`
  display: flex;
  gap: 20px;
  font-size: 18px;
  border-bottom: 1px solid rgb(129, 137, 143);
  padding: 10px 15px;
  p {
    color: rgb(58, 62, 65);
  }
`;
const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 10px 15px;
  gap: 3px;
  p {
    color: rgb(58, 62, 65);
  }
`;
const Footer = styled.div``;
export default Help;
