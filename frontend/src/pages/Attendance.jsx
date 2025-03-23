import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAttendance } from "../redux/actions/attendanceActions";
// import { RootState } from "../redux/store";

const Attendance = () => {
  const dispatch = useDispatch();
  const { attendanceRecords } = useSelector((state) => state.attendance);

  useEffect(() => {
    // dispatch(fetchAttendance());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="text-center my-4">سجل الحضور</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Attendance;
