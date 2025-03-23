import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../redux/slices/quizzesSlices";
import { Container, Table, Button, Modal } from "react-bootstrap";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const { quizResults, quizResult, status } = useSelector(
    (state) => state.quizzes
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);


  return (
    <Container className="mt-4">
      <h2 className="mb-4">📊 نتائج الاختبارات</h2>

      {status === "loading" && <p>⏳ جاري تحميل النتائج...</p>}
      {status === "failed" && (
        <p className="text-danger">❌ فشل تحميل النتائج.</p>
      )}

      {quizResults.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>📌 اسم الاختبار</th>
              <th>🎯 الدرجة</th>
              <th>📅 التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {quizResults.map((result, index) => (
              <tr key={result.id}>
                <td>{index + 1}</td>
                <td>{result.quiz_title}</td>
                <td>
                  {result.score} / {result.total_questions}
                </td>
                <td>{new Date(result.completed_at).toLocaleDateString()}</td>
              
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>⚠️ لا توجد نتائج حتى الآن.</p>
      )}

      {/* 🔹 Modal for result details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📜 تفاصيل النتيجة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {quizResult ? (
            <div>
              <h5>{quizResult.quiz_name}</h5>
              <p>
                <strong>🔢 الدرجة:</strong> {quizResult.score} /{" "}
                {quizResult.total_score}
              </p>
              <p>
                <strong>📅 التاريخ:</strong>{" "}
                {new Date(quizResult.date).toLocaleString()}
              </p>
              <h6>📝 الإجابات:</h6>
              <ul>
                {quizResult.answers.map((answer, idx) => (
                  <li key={idx}>
                    <strong>سؤال:</strong> {answer.question} <br />
                    <strong>إجابتك:</strong> {answer.user_answer}
                    {answer.is_correct ? " ✅" : " ❌"}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>⏳ جاري تحميل التفاصيل...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ResultsPage;
