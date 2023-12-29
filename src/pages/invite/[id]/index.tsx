import Image from 'next/image';
import BasicLayout from '@/components/layout/BasicLayout';
import type { NextPageWithLayout } from '@/types/page';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { KAKAO_AUTH_URL } from '@/constants/kakaoAuth';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext } from 'next';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import usePostInviteAnswer from '@/hooks/feature/usePostInviteAnswer';
import { useQueryClient } from '@tanstack/react-query';
import { get } from '@/libs/api';

type Data = {
  data: {
    question: string;
    invitedPersonName: string;
  };
  id: string;
};

const Page: NextPageWithLayout<Data> = ({ data, id }) => {
  const [text, setText] = useState('');
  const router = useRouter();
  const { mutate: postInviteAnswer } = usePostInviteAnswer();
  const queryClient = useQueryClient();

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmitAnswer = () => {
    const isLogin = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT, text);

    if (!isLogin) {
      window.location.href = KAKAO_AUTH_URL;
    } else {
      postInviteAnswer(
        { linkKey: id, answer: text },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            router.push('/chatroom');
          },
          onError: (error) => {
            throw error;
          },
        }
      );
    }
  };

  useEffect(() => {
    const storedText = window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT
    );
    if (storedText) {
      setText(storedText);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.PREV_URL, router.asPath);
  }, [router.asPath]);

  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <div>{data?.invitedPersonName} 님이</div>
        <div>초대 링크를 보냈어요!</div>
      </div>
      <ListItem
        question={data?.question}
        className="mt-5 bg-white flex justify-center items-center text-lg"
      />
      <Image
        src="/logo.png"
        priority
        alt="service-logo"
        width="100"
        height="100"
        style={{ margin: '1rem' }}
      />
      <div className="mb-5">
        <div>답변을 작성해 볼까요?</div>
      </div>
      <TextArea
        value={text}
        onChange={handleChangeText}
        className="min-h-[15rem]"
      />
      <Button
        onClick={handleSubmitAnswer}
        variant="primary"
        size="wide"
        className="mt-5"
      >
        답변 등록
      </Button>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <BasicLayout className="bg-[#F7CBC3] justify-center">{page}</BasicLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  try {
    const response = await get(`/api/v1/members/invite/info/${id}`);
    const data = response.data;
    return { props: { data, id } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { invitedName: [] } };
  }
};

export default Page;
