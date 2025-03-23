// src/pages/CourseStudyPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "../redux/slices/courseSlice";
import CourseContent from "../components/courses/CourseContent";
import LessonViewer from "../components/learning/LessonViewer";
import Loader from "../components/common/Loader";

const CourseStudyPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector((state) => state.courses);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    dispatch(getCourseDetails(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (course && course.lessons && course.lessons.length > 0) {
      setActiveLesson(course.lessons[0]);
    }
  }, [course]);

  const handleLessonSelect = (lesson) => {
    setActiveLesson(lesson);
  };

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!course) return <div className="alert alert-info">المقرر غير موجود</div>;

  return (
    <div className="course-study-page">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <p className="card-text text-muted">
                <i className="fas fa-user-tie me-2"></i>
                {course.instructor}
              </p>
              <div className="progress mb-3" style={{ height: "10px" }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${course.progress || 0}%` }}
                  aria-valuenow={course.progress || 0}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <small className="text-muted">
                  إكمال: {course.progress || 0}%
                </small>
                <small className="text-muted">
                  {course.completedLessons || 0} من {course.totalLessons || 0}{" "}
                  درس
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              {activeLesson ? (
                <LessonViewer lesson={activeLesson} courseId={courseId} />
              ) : (
                // Continuing src/pages/CourseStudyPage.js
                <div className="p-5 text-center">
                  <i className="fas fa-book-open fa-3x text-muted mb-3"></i>
                  <h4>لم يتم تحديد درس</h4>
                  <p>يرجى اختيار درس من قائمة المحتوى</p>
                </div>
              )}
            </div>
          </div>

          {activeLesson && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>المناقشات</h4>
                <button className="btn btn-outline-primary btn-sm">
                  <i className="fas fa-plus me-1"></i> إضافة سؤال
                </button>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="discussion-list">
                    {activeLesson.discussions &&
                    activeLesson.discussions.length > 0 ? (
                      activeLesson.discussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          className="discussion-item border-bottom pb-3 mb-3"
                        >
                          <div className="d-flex">
                            <img
                              src={
                                discussion.user.avatar ||
                                "/assets/images/avatar.png"
                              }
                              className="rounded-circle me-2"
                              width="40"
                              height="40"
                              alt={discussion.user.name}
                            />
                            <div>
                              <h6 className="mb-1">{discussion.user.name}</h6>
                              <p className="mb-1">{discussion.content}</p>
                              <div className="d-flex align-items-center">
                                <small className="text-muted">
                                  {discussion.date}
                                </small>
                                <button className="btn btn-link btn-sm p-0 ms-3">
                                  رد
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted">
                        لا توجد مناقشات حتى الآن
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: "1rem" }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">محتوى المقرر</h5>
            </div>
            <div className="card-body p-0">
              <CourseContent
                modules={course.modules}
                activeLesson={activeLesson}
                onLessonSelect={handleLessonSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStudyPage;
