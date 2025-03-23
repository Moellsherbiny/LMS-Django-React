import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizzes,
  fetchQuestions,
  submitQuiz,
} from "../redux/slices/quizzesSlices";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";

const QuizPage = () => {
  const dispatch = useDispatch();
  const { quizzes, questions, quizResult, status, error } = useSelector(
    (state) => state.quizzes
  );
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submissionError, setSubmissionError] = useState(null);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const startQuiz = (quizId) => {
    setSelectedQuiz(quizId);
    dispatch(fetchQuestions(quizId));
    setAnswers({});
    setSubmissionError(null);
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = () => {
    const unansweredQuestions = questions.some(
      (question) => !answers[question.id]
    );

    if (unansweredQuestions) {
      setSubmissionError("يجب الإجابة على جميع الأسئلة قبل الإرسال.");
      return;
    }

    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      question_id: Number(questionId),
      answer_id: answers[questionId],
    }));

    dispatch(submitQuiz({ quizId: selectedQuiz, answers: formattedAnswers }));
    setSubmissionError(null);
  };

  return (
    <Container className="mt-4" dir="rtl">
      <h2 className="mb-4 text-end">📝 اختباراتك</h2>
      {status === "loading" && <Spinner animation="border" />}
      {error && <Alert variant="danger">⚠️ {error}</Alert>}
      {submissionError && <Alert variant="warning">⚠️ {submissionError}</Alert>}

      {!selectedQuiz ? (
        <div>
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="mb-3">
              <Card.Body>
                <Card.Title className="text-end">{quiz.title}</Card.Title>
                <Card.Text className="text-end">
                  👨‍🏫 المدرس: {quiz.teacher}
                </Card.Text>
                <div className="text-end">
                  <Button variant="primary" onClick={() => startQuiz(quiz.id)}>
                    📖 بدء الاختبار
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button
            variant="secondary"
            onClick={() => setSelectedQuiz(null)}
            className="mb-3"
          >
            🔙 الرجوع إلى قائمة الاختبارات
          </Button>
          <h4 className="text-end">📌 الأسئلة:</h4>
          <Form>
            {questions.map((question) => (
              <Card key={question.id} className="mb-3">
                <Card.Body>
                  <Card.Title className="text-start">
                    {question.text}
                  </Card.Title>
                  <Form.Group className="d-flex flex-column align-items-start">
                    {question.answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="d-flex align-items-center justify-content-start w-100"
                      >
                        <Form.Check
                          type="radio"
                          name={`question-${question.id}`}
                          id={`answer-${answer.id}`}
                          checked={answers[question.id] === answer.id}
                          onChange={() =>
                            handleAnswerSelect(question.id, answer.id)
                          }
                          className="ms-2" // يجعل الراديو في اليمين والنص في اليسار
                        />
                        <Form.Label
                          htmlFor={`answer-${answer.id}`}
                          className="mb-0"
                        >
                          {answer.text}
                        </Form.Label>
                      </div>
                    ))}
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
            <div className="text-end">
              <Button variant="success" onClick={handleSubmit}>
                ✅ إرسال الإجابات
              </Button>
            </div>
          </Form>

          {quizResult && (
            <Alert variant="info" className="mt-3 text-end">
              🎯 نتيجتك: {quizResult.result_message}
            </Alert>
          )}
        </div>
      )}
    </Container>
  );
};

export default QuizPage;
