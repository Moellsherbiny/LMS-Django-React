import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const LessonCard = ({ id, title, videoId }) => {
  return (
    <Card className="shadow text-center">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
        ></iframe>
        <Button as={Link} to={`/lesson/${id}`} variant="success" className="mt-3">
          مشاهدة الدرس
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LessonCard;
