import styled from 'styled-components';

import { FaVideoSlash } from 'react-icons/fa';

const DefaultScreen = (): JSX.Element => {
  return (
    <Default>
      <FaVideoSlash style={{ fontSize: '50px', color: '#ad0101' }} />
    </Default>
  );
};

const Default = styled.div`
  height: 300px;
  width: 400px;
  background: black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    margin: auto;
  }
`;

export default DefaultScreen;
