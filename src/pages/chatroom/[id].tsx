import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/ui/Modal';
import QuestionBar from '@/components/ui/QuestionBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const dummyQuestions = [
  {
    isRegisterQuestion: false,
    selectQuestionId: 1,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 2,
    question: '같이 해보고 싶은 버킷리스트가 있나요? ',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 3,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? ',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 4,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 5,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 6,
    question: '같이 해보고 싶은 버킷리스트가 있나요? ',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 7,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? ',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 8,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 9,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 10,
    question: '같이 해보고 싶은 버킷리스트가 있나요? ',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 11,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? ',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 12,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 13,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 14,
    question: '같이 해보고 싶은 버킷리스트가 있나요? ',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 15,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? ',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 16,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 17,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 18,
    question: '같이 해보고 싶은 버킷리스트가 있나요? ',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 19,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? ',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 20,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 21,
    question: '상대방을 사랑하는 마음을 수치로 표현하면?',
    createdAt: 231223,
    answerCount: 1,
    isMyAnswer: false,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 22,
    question: '같이 해보고 싶은 버킷리스트가 있나요? ',
    createdAt: 231225,
    answerCount: 1,
    isMyAnswer: true,
  },
  {
    isRegisterQuestion: true,
    selectQuestionId: 23,
    question: '상대방의 어떤 점이 사랑스러운가요? ',
    createdAt: 231227,
    answerCount: 0,
  },
  {
    isRegisterQuestion: false,
    selectQuestionId: 24,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요? ',
    createdAt: 231226,
    answerCount: 2,
    answer: [
      {
        memberId: 1,
        memberName: '이몽룡',
        answer: '소리지르기',
        createdAt: 231226,
      },
      {
        memberId: 2,
        memberName: '성춘향',
        answer: '잠수타기',
        createdAt: 231226,
      },
    ],
  },
];

type Letters = {
  letters: LetterType[];
};

type LetterType = {
  selectQuestionId: number;
  question: string;
  createdAt: number;
  answerCount: number;
  isMyAnswer?: boolean;
  isRegisterQuestion: boolean;
  answers?: {
    memberId: number;
    memberName: string;
    answer: string;
    createdAt: number;
  }[];
};

type ModalInfo = {
  actionText: string;
  cancelText: string;
  bodyText: string;
  handleAction: () => void;
};

const mockServerURL =
  'https://cc7831bd-6881-44ff-9534-f344d05bc5ad.mock.pstmn.io';
const path = '/api/v1/letters?size=10';
const apiEndpoint = `${mockServerURL}${path}`;

const Page: NextPageWithLayout<Letters> = ({ letters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });

  const router = useRouter();

  const handleQuestionBarClick = ({ letter }: { letter: LetterType }) => {
    if (letter.answerCount === 0) {
      setModalInfo({
        actionText: '답변 작성하러 가기',
        cancelText: '되돌아가기',
        bodyText: '둘의 답변을 기다리고 있어요.<br>먼저 답변을 작성해볼까요?',
        handleAction: () => {
          router.push(`/answer/${letter.selectQuestionId}`);
        },
      });
      setIsModalOpen(true);
    } else if (letter.answerCount === 2) {
      setIsModalOpen(false);
    } else if (letter.answerCount === 1) {
      if (letter.isMyAnswer) {
        setModalInfo({
          actionText: '수정하기',
          cancelText: '되돌아가기',
          bodyText:
            '상대가 답변을 등록하지 않았어요.<br>기존 답변을 수정하시겠어요?',
          handleAction: () => {
            console.log('수정하기 action');
          },
        });
      } else {
        setModalInfo({
          actionText: '답변 작성하러 가기',
          cancelText: '되돌아가기',
          bodyText:
            '내가 아직 답변을 등록하지 않았어요.<br>답변을 등록하러 가볼까요?',
          handleAction: () => {
            router.push(`/answer/${letter.selectQuestionId}`);
          },
        });
      }
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    console.log('isModalOpen', isModalOpen);
  }, [isModalOpen]);

  return (
    <div className="pb-[5rem]">
      {isModalOpen && (
        <Modal
          modalInfo={modalInfo}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      {/* 추후에 아래의 dummyQuestions를 letters로 바꿔야 함(api 연동 후) */}
      {dummyQuestions.map((letter: LetterType, index: number) => {
        return (
          <QuestionBar
            key={index}
            letter={letter}
            onClick={() => handleQuestionBarClick({ letter })}
          />
        );
      })}
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    const letters = response.data;
    console.log('letters: ', letters);
    return { props: { letters } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { letters: [] } };
  }
};

export default Page;
