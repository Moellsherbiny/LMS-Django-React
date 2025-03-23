import { Card } from "react-bootstrap";

const FeedbackCard = ({ teacher, message, date }) => {
  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>المعلم: {teacher}</Card.Title>
        <Card.Text>{message}</Card.Text>
        <Card.Footer className="text-muted">التاريخ: {date}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default FeedbackCard;
