import styled from '@emotion/styled';
import React, { ChangeEvent, useState, useEffect } from 'react';
import MainTop from '../../../components/layout/main/MainTop';
import { edit } from '../../../images/mypage';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../../../recoil/UserAtom';

import { useQuery } from 'react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { RoomAtom } from '../../../recoil/RoomAtom';
import { fetchUser } from '../../../axios/api';
import { getCookie, setTokenCookie } from '../../../auth/cookie';
import { toast } from 'sonner';
import { profile } from '../../../images';

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

  const { data, refetch } = useQuery<user, Error>('mypageUser', fetchUser, {
    refetchOnWindowFocus: false,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      // console.log('이미지확인', image);
      reader.onload = () => {
        const base64 = reader.result;
        setImage(base64 as string);
        updateFormData('image', base64 as string);
      };
    }

    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();

    if (image) {
      // console.log('이미지 있음');
      formData.append('image', image);
    }

    // console.log('프로필 이미지 선택', formData.get('image'));

    try {
      // console.log('try');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // JWT 토큰을 여기에 삽입해주세요
        },
      };
      // console.log('===')
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL!}/me/profile/image`,
        formData,
        config,
      );
      // console.log('프로필 수정 서버로 전송', response.data);

      // 성공시 로직
      if (response.data.success) {
        // console.log('성공');
        toast.success('프로필 수정 성공🤗');
      } else {
        // console.log('실패ddzz', response.data);
      }
    } catch (error) {
      // console.log('프로필 수정 실패', error);
    }
  };


  return (
    <>
      <ProfileImg
        src={data?.profileImage ? image : profile}
        alt="profile image"
      ></ProfileImg>
      <Button
        component="label"
        sx={{
          color: 'var(--primary-01)',
          '&:hover': {
            backgroundColor: 'initial',
            boxShadow: 'none',
          },
        }}
      >
        사진 수정
        <EditIcon src={edit} alt="edit profile image" />
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </>
  );
};

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const EditIcon = styled.img`
  width: 18px;
`;
export default EditProfileImg;
