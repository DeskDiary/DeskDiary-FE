// email 형식 확인
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// password 조건 확인
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/;
  return passwordRegex.test(password);
};

// nickname 조건 확인
export const validateNickname = (nickname: string): boolean => {
  const regex = /^[a-zA-Z가-힣0-9._-]{2,8}$/;
  return regex.test(nickname);
};
