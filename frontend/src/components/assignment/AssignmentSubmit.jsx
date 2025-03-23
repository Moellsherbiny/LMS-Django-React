import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitAssignment } from "../../redux/slices/assignmentsSlices";
import {
  Card,
  Button,
  Form,
  ProgressBar,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const AssignmentSubmission = ({ assignmentId }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { submitting, submissionSuccess, submissionError } = useSelector(
    (state) => state.assignments
  );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignment", assignmentId);
    dispatch(submitAssignment({ assignmentId, formData }));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Submit Assignment</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* File upload area */}
                <div
                  className={`border rounded p-4 mb-4 text-center ${
                    dragActive ? "bg-light border-primary" : ""
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="mb-3">
                    <i
                      className="bi bi-cloud-upload text-primary"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <p className="mb-2">
                      Drag & drop your file here or click to browse
                    </p>
                    <small className="text-muted">Max file size: 10MB</small>
                  </div>

                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    className="d-none"
                    id="file-upload"
                  />
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                  >
                    Browse Files
                  </Button>
                </div>

                {/* File preview */}
                {file && (
                  <Alert variant="info" className="mb-4">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i
                          className="bi bi-file-earmark-text"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-truncate">{file.name}</div>
                        <small>{formatFileSize(file.size)}</small>
                      </div>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => setFile(null)}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </div>
                  </Alert>
                )}

                {/* Submission status */}
                {submitting && (
                  <div className="mb-4">
                    <p className="mb-2 text-center">Uploading file...</p>
                    <ProgressBar animated now={100} />
                  </div>
                )}

                {submissionSuccess && (
                  <Alert variant="success" className="mb-4">
                    <i className="bi bi-check-circle me-2"></i>
                    Your assignment has been submitted successfully!
                  </Alert>
                )}

                {submissionError && (
                  <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Error: {submissionError}
                  </Alert>
                )}

                {/* Submit button */}
                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!file || submitting}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Assignment"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              <small>
                <i className="bi bi-info-circle me-1"></i>
                Supported file formats: PDF, DOCX, ZIP (Max: 10MB)
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignmentSubmission;
