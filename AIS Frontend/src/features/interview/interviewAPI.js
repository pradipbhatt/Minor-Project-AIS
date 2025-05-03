import api from "../../api";

export const fetchQuestions = async (interviewId) => {
  const res = await api.get(`/question/${interviewId}`);
  return res.data;
};

export const submitAnswer = async (questionId, answerText) => {
  const res = await api.post(`/answer/${questionId}`, { answerText });
  return res.data;
};
