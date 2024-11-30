import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Navbar from "../Navbar";
import { useState } from "react";
import './css/userreport.css'; // Import your custom CSS for user report styling

const Userreport = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Librarian' },
    { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com', role: 'User' },
  ]);

  return (
    <>
      <Navbar />
      <div className="user-report-container">
        <Grid container justifyContent="center">
          <Grid item sm={10}>
            <h1 className="user-report-title">User Report</h1>
            <hr className="user-report-divider" />
            <TableContainer className="user-report-table-container">
              <Table className="user-report-table" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell className="user-report-table-header" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell className="user-report-table-header" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell className="user-report-table-header" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell className="user-report-table-header" sx={{ fontWeight: 'bold' }}>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell className="user-report-table-cell">{user.id}</TableCell>
                      <TableCell className="user-report-table-cell">{user.name}</TableCell>
                      <TableCell className="user-report-table-cell">{user.email}</TableCell>
                      <TableCell className="user-report-table-cell">{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Userreport;