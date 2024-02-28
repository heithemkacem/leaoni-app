import React, { useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

export default function TableInput({ headers, data }) {
  const [editableRows, setEditableRows] = useState(data);

  const handleCellValueChange = (index, field, value) => {
    setEditableRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} align="center">
                <b>{header}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
        <TableBody>
          {editableRows.map((row, index) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              {Object.entries(row).map(([field, value]) => (
                <TableCell key={field} align="center">
                  {field === "name" ? (
                    <span>{value}</span>
                  ) : (
                    <TextField
                      type="number"
                      value={value}
                      onChange={(e) => handleCellValueChange(index, field, e.target.value)}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableInput.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
