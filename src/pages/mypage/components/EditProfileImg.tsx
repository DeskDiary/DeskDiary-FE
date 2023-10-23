import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
import MainTop from '../../../components/layout/main/MainTop';
import { profile } from '../../../images';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../../../recoil/UserAtom';

import { useQuery } from 'react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { RoomAtom } from '../../../recoil/RoomAtom';
import { fetchUser } from '../../../axios/api';
import { getCookie, setTokenCookie } from '../../../auth/cookie';

type EditProfileImgProps = {};

// 썸네일 등록 버튼 스타일
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EditProfileImg: React.FC<EditProfileImgProps> = () => {
  const token = getCookie('token');
  const [image, setImage] = useState('');
  const [user, setUser] = useRecoilState(UserAtom);

  const [formData, setFormData] = useRecoilState(RoomAtom);

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const { data, error, isLoading } = useQuery<user, Error>('user', fetchUser);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    console.log('51번째 줄', image);

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const base64 = reader.result;
        setImage(base64 as string);
        updateFormData('image', base64 as string);
      };
    }

    e.preventDefault();
    console.log('저장?');

    // FormData 객체 생성
    const formData = new FormData();

    if (image) {
      console.log('이미지 있음');
      formData.append('image', image);
    }

    formData.append('image', user.file);

    console.log('프로필 이미지 선택', formData.get('image'));

    try {
      console.log('try');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // JWT 토큰을 여기에 삽입해주세요
        },
      };
      console.log('===')
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL!}/auth/profile/image`,
        formData,
        config,
      );

      console.log('프로필 수정 서버로 전송', response.data);

      // 성공시 로직
      if (response.data.success) {
        console.log('성공');
        alert('프로필 수정 성공!');
      } else {
        console.log('실패ddzz', response.data);
      }
    } catch (error) {
      console.log('프로필 수정 실패', error);
    }
  };

  return (
    <Button
      component="label"
      sx={{
        color: 'gray',
        '&:hover': {
          backgroundColor: 'initial', // 여기서 'initial' 대신 원래 배경색을 넣어도 돼
          boxShadow: 'none', // 그림자 효과 제거
        },
      }}
    >
      썸네일 등록
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
};
export default EditProfileImg;
