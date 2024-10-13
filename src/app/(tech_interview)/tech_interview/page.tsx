import React from 'react';
import { createClient } from './../../../utils/supabase/server';

const TechInterviewPage = async () => {
  const supabase = createClient();

  const { data: questions, error } = await supabase.from('questions').select('*');

  if (error) {
    console.log('테스트 문항을 불러오는 중 오류가 발생했습니다.', error);
  }

  const shuffledQuestions = questions?.sort(() => 0.5 - Math.random()).slice(0, 5);

  console.log(shuffledQuestions);

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold text-center mb-6">기술 면접 질문</h1>
      <div className="space-y-8">
        {shuffledQuestions?.map((shuffledQuestion) => (
          <div
            key={shuffledQuestion.question_id}
            className="bg-slate-100 shadow-md rounded-lg p-6 border border-gray-200"
          >
            <div className="text-lg font-semibold text-gray-800 mb-4">{shuffledQuestion.question_text}</div>
            <div>
              <textarea
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                placeholder="답변을 입력하세요"
                required
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechInterviewPage;
