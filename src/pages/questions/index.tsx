import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';

import ListItem from '@/components/ui/ListItem';

const dummyQuestionList = [
  {
    questionId: 1,
    question: '같이 해보고 싶은 버킷리스트가 있나요?',
  },
  {
    questionId: 2,
    question: '다툼이 생겼을 때 절대 안 했으면 하는 것이 있다면 무엇인가요?',
  },
  {
    questionId: 3,
    question: '서로를 마음껏 자랑해보아요! 무엇이든 좋아요',
  },
  {
    questionId: 4,
    question: '산타를 몇살까지 믿었나요?',
  },
];

const Page: NextPageWithLayout = () => {
  return (
    <div className="py-20">
      {dummyQuestionList.map((question) => (
        <div
          key={question.questionId}
          className="flex flex-col justify-center items-center"
        >
          <ListItem question={question.question} />
        </div>
      ))}
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
