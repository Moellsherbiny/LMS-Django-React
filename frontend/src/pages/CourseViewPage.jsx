import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../redux/slices/coursesSlice";
import { Card, Button, Alert, ListGroup } from "react-bootstrap";
import YouTube from "react-youtube";

const CourseView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, loading, error } = useSelector(
    (state) => state.courses
  );
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [completed, setCompleted] = useState(false);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/embed\/([^?]+)/);
    return match ? match[1] : null;
  };
  useEffect(() => {
    dispatch(fetchCourse(id));
  }, [dispatch, id]);

  const handleCompleteLesson = () => {
    setCompleted(true);
    setTimeout(() => setCompleted(false), 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!currentCourse) return null;

  return (
    <div className="container mt-4">
      <Card>
        <Card.Img
          variant="top"
          src={currentCourse.course_img}
          alt={currentCourse.title}
        />
        <Card.Body>
          <Card.Title>{currentCourse.title}</Card.Title>
          <Card.Text>{currentCourse.description}</Card.Text>
          <p>
            <strong>Instructor:</strong> {currentCourse.teacher_name}
          </p>
          <p>
            <strong>Difficulty:</strong> {currentCourse.difficulty}
          </p>
        </Card.Body>
      </Card>

      <div className="row mt-4">
        <div className="col-md-4">
          <h5>Chapters</h5>
          <ListGroup>
            {currentCourse.chapters.map((chapter) => (
              <ListGroup.Item
                key={chapter.id}
                action
                onClick={() => setSelectedChapter(chapter)}
              >
                {chapter.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div className="col-md-8">
          {selectedChapter ? (
            <Card>
              <Card.Body>
                <Card.Title>{selectedChapter.title}</Card.Title>
                <Card.Text>{selectedChapter.content}</Card.Text>
                {selectedChapter.video_url ? (
                  <YouTube videoId={getYouTubeId(selectedChapter.video_url)} />
                ) : (
                  <p>No video available</p>
                )}
                <Button
                  variant="success"
                  onClick={handleCompleteLesson}
                  className="mt-3"
                >
                  Complete Lesson
                </Button>
                {completed && (
                  <Alert variant="success" className="mt-2">
                    Lesson Completed!
                  </Alert>
                )}
              </Card.Body>
            </Card>
          ) : (
            <p>Select a chapter to view</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseView;
