import type { OnboardingStepPros } from './Intro';
import ListItem from '../ui/ListItem';
import useInput from '@/hooks/common/useInput';
import AnswerForm from '../answer/AnswerForm';

export default function AnswerStep({ onNext }: OnboardingStepPros) {
  const [answer, onChange, errorMessage] = useInput('', (value) =>
    value.trim() ? '' : '답변을 입력해주세요'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer) {
      return;
    }

    //Todo: 답변 등록하기 기능 구현
    console.log(answer);

    // main action : onboarding 데이터로 저장하기
    onNext();
  };

  return (
    <>
      <ListItem question="선택된 질문" />
      <p>내가 먼저 답변을 작성해볼까요?</p>
      <AnswerForm
        answer={answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
