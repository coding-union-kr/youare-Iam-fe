import { type ChangeEventHandler, useState } from 'react';
import {
  initialOnboardingState,
  onboardingState,
} from '@/store/onboardingState';
import type { OnboardingStepProps } from './Intro';

import AnswerForm from '@/components/answer/AnswerForm';
import QuestionTitle from '@/components/answer/QuestionTitle';
import { useSSR } from '@/hooks/common/useSSR';

export default function AnswerStep({ onNext }: OnboardingStepProps) {
  const [onboardingData, setOnboardingData] = useSSR(
    onboardingState,
    initialOnboardingState
  );
  const [errorMessage, setErrorErrorMessage] = useState('');

  const onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { value } = target;

    setOnboardingData((prevState) => ({
      ...prevState,
      answer: value,
    }));

    const errorMessage = value.trim() ? '' : '답변을 입력해주세요';
    setErrorErrorMessage(errorMessage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!onboardingData.answer) {
      return;
    }

    onNext();
  };

  return (
    <>
      <QuestionTitle question={onboardingData.selectedQuestion.question} />
      <p className="text-lg font-semibold">내가 먼저 답변을 작성해볼까요?</p>
      <AnswerForm
        answer={onboardingData.answer}
        onChange={onChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
