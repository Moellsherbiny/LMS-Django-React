// src/components/learning/LessonViewer.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { markLessonCompleted } from "../../redux/slices/courseSlice";
import VideoPlayer from "./VideoPlayer";
import DocumentViewer from "./DocumentViewer";
import QuizComponent from "./QuizComponent";
import AssignmentSubmission from "../assignments/AssignmentSubmission";

const LessonViewer = ({ lesson, courseId }) => {
  const [lessonContent, setLessonContent] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lesson) {
      setLessonContent(lesson);
    }
  }, [lesson]);

  const handleLessonCompleted = () => {
    dispatch(markLessonCompleted({ courseId, lessonId: lesson.id }));
  };

  const renderLessonContent = () => {
    if (!lessonContent) return null;

    switch (lessonContent.type) {
      case "video":
        return (
          <VideoPlayer
            videoUrl={lessonContent.videoUrl}
            onComplete={handleLessonCompleted}
          />
        );
      case "document":
        return (
          <DocumentViewer
            content={lessonContent.content}
            onComplete={handleLessonCompleted}
          />
        );
      case "quiz":
        return (
          <QuizComponent
            quiz={lessonContent.quiz}
            onComplete={handleLessonCompleted}
          />
        );
      case "assignment":
        return (
          <AssignmentSubmission
            assignment={lessonContent.assignment}
            onComplete={handleLessonCompleted}
          />
        );
      default:
        return (
          <div className="p-4 text-center">
            <p>نوع المحتوى غير معروف</p>
          </div>
        );
    }
  };

  if (!lessonContent) {
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-viewer">
      <div className="lesson-header p-3 bg-light border-bottom">
        <h4 className="mb-0">{lessonContent.title}</h4>
      </div>
      <div className="lessson-content">{renderLessonContent()}</div>
      <div className="lesson-footer p-3 border-top">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {lessonContent.completed ? (
              <span className="badge bg-success">
                <i className="fas fa-check me-1"></i> مكتمل
              </span>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleLessonCompleted}
              >
                تحديد كمكتمل
              </button>
            )}
          </div>
          <div className="btn-group">
            <button
              className="btn btn-outline-secondary"
              disabled={!lessonContent.prevLessonId}
            >
              <i className="fas fa-chevron-right me-1"></i> السابق
            </button>
            <button
              className="btn btn-outline-secondary"
              disabled={!lessonContent.nextLessonId}
            >
              التالي <i className="fas fa-chevron-left ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
