import { Table } from "react-bootstrap";

const AttendanceTable = ({ attendance }) => {
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>التاريخ</th>
          <th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((record, index) => (
          <tr key={index}>
            <td>{record.date}</td>
            <td>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AttendanceTable;
