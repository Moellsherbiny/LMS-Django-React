import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const QuizCard = ({ id, title, description }) => {
  return (
    <Card className="shadow text-center">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button as={Link} to={`/quiz/${id}`} variant="warning">
          بدء الاختبار
        </Button>
      </Card.Body>
    </Card>
  );
};

export default QuizCard;
