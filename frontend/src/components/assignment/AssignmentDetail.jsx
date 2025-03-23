import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssignmentDetails } from "../../redux/slices/assignmentsSlices";
import AssignmentSubmission from "./AssignmentSubmit";

const AssignmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentAssignment, loading, error } = useSelector(
    (state) => state.assignments
  );

  useEffect(() => {
    dispatch(fetchAssignmentDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading assignment details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{currentAssignment?.title}</h2>
      <p>{currentAssignment?.description}</p>
      <p>Due Date: {new Date(currentAssignment?.due_date).toLocaleString()}</p>
      <AssignmentSubmission assignmentId={id} />
    </div>
  );
};

export default AssignmentDetail;
