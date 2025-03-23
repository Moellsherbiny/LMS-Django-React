import React from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import moment from "moment";

const AssignmentList = ({ assignments }) => {
  // Function to determine assignment status and badge properties
  const getStatusBadge = (assignment) => {
    const now = moment();
    const dueDate = moment(assignment.dueDate);
    const isOverdue = now.isAfter(dueDate) && !assignment.submitted;
    const dueSoon = dueDate.diff(now, "days") <= 2 && !assignment.submitted;

    if (assignment.submitted) {
      return {
        text: "Submitted",
        variant: "success",
        icon: <FaCheckCircle className="me-1" />,
      };
    } else if (isOverdue) {
      return {
        text: "Overdue",
        variant: "danger",
        icon: <FaExclamationTriangle className="me-1" />,
      };
    } else if (dueSoon) {
      return {
        text: "Due Soon",
        variant: "warning",
        icon: <FaClock className="me-1" />,
      };
    } else {
      return {
        text: "Pending",
        variant: "primary",
        icon: <FaFileAlt className="me-1" />,
      };
    }
  };

  // Function to format the due date
  const formatDueDate = (dueDate) => {
    const now = moment();
    const due = moment(dueDate);

    if (due.isSame(now, "day")) {
      return `Today, ${due.format("h:mm A")}`;
    } else if (due.isSame(now.clone().add(1, "day"), "day")) {
      return `Tomorrow, ${due.format("h:mm A")}`;
    } else if (due.diff(now, "days") < 7) {
      return due.format("dddd, h:mm A");
    } else {
      return due.format("MMM D, YYYY, h:mm A");
    }
  };

  return (
    <>
      {assignments.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted mb-0">No assignments found</p>
        </div>
      ) : (
        <ListGroup>
          {assignments.map((assignment) => {
            const status = getStatusBadge(assignment);

            return (
              <ListGroup.Item
                key={assignment.id}
                className="d-flex justify-content-between align-items-center py-3"
              >
                <div className="d-flex align-items-center">
                  <div
                    className="me-3 p-2 rounded-circle"
                    style={{ backgroundColor: "var(--light-blue)" }}
                  >
                    <FaFileAlt size={20} color="var(--primary-blue)" />
                  </div>
                  <div>
                    <h6 className="mb-0">{assignment.title}</h6>
                    <small className="text-muted d-flex align-items-center mt-1">
                      <FaClock className="me-1" size={12} />
                      Due: {formatDueDate(assignment.dueDate)}
                    </small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Badge
                    bg={status.variant}
                    className="d-flex align-items-center me-3"
                  >
                    {status.icon} {status.text}
                  </Badge>
                  <Link
                    to={`/assignments/${assignment.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    {assignment.submitted ? "View" : "Start"}
                  </Link>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
};

export default AssignmentList;
