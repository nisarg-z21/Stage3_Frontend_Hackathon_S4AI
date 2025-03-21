import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DataTable = ({
  data,
  columnOrder = [],
  rowsPerPageOptions = [5, 10, 15],
  defaultRowsPerPage = 10,
  showAction = false,
  message = "No data found.",
  menuItems = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to format column labels
  const formatColumnLabel = (label) => {
    return label
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Handle camelCase and PascalCase
      .replace(/_/g, " ") // Handle snake_case
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  // Extract columns from data and apply custom order if provided
  const extractedColumns = data.length > 0 ? Object.keys(data[0]) : [];
  const columns =
    columnOrder.length > 0
      ? columnOrder.map((key) => ({
        id: key,
        label: formatColumnLabel(key),
      }))
      : extractedColumns.map((key) => ({
        id: key,
        label: formatColumnLabel(key),
      }));

  // Function to properly format cell values
  // const formatCellValue = (value) => {
  //   if (typeof value === "boolean") return value ? "Yes" : "No"; // Convert boolean to "Yes"/"No"
  //   if (value === null || value === undefined) return "-"; // Handle null/undefined cases
  //   return value; // Return other types as is
  // };

  const handleRowClick = (row) => {
    if (row.complainId) {
      navigate(`/complains/complainScreen/${row.complainId}`); // Navigate to the complain screen
    }
  };

  const formatCellValue = (value) => {
    if (typeof value === "boolean") return value ? "Yes" : "No"; // Convert boolean to "Yes"/"No"
    if (value === null || value === undefined) return "-"; // Handle null/undefined cases
    if (typeof value === "string" && value.length > 500) {
      return value.substring(0, 500) + "..."; // Truncate string to 200 characters and add "..."
    }
    return value; // Return other types as is
  };

  return (
    // <Paper style={{ width: "100%", overflow: "hidden" }}>
    //   <TableContainer style={{ overflowX: "auto" }}>
    //     <Table>
    //       <TableHead>
    //         <TableRow>
    //           {columns.map((column) => (
    //             <TableCell key={column.id} style={{ fontWeight: "bold" }}>
    //               {column.label}
    //             </TableCell>
    //           ))}
    //           {showAction && (
    //             <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
    //           )}
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {data.length > 0 ? (
    //           data
    //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //             .map((row, index) => (
    //               <TableRow
    //                 key={index}
    //                 onClick={() => handleRowClick(row)}
    //                 style={{ cursor: "pointer" }} // Add pointer cursor for UX
    //               >
    //                 {columns.map((column) => (
    //                   <TableCell key={column.id}>
    //                     {formatCellValue(row[column.id])}
    //                   </TableCell>
    //                 ))}
    //                 {showAction && (
    //                   <TableCell>
    //                     <IconButton
    //                       onClick={(event) => handleClick(event, row)}
    //                     >
    //                       <MoreVertIcon />
    //                     </IconButton>
    //                     <Menu
    //                       anchorEl={anchorEl}
    //                       open={Boolean(anchorEl)}
    //                       onClose={handleClose}
    //                     >
    //                       {menuItems.map((menuItem, idx) => (
    //                         <MenuItem
    //                           key={idx}
    //                           onClick={() => {
    //                             menuItem.onClick(selectedRow);
    //                             handleClose();
    //                           }}
    //                         >
    //                           {menuItem.label}
    //                         </MenuItem>
    //                       ))}
    //                     </Menu>
    //                   </TableCell>
    //                 )}
    //               </TableRow>
    //             ))
    //         ) : (
    //           <TableRow>
    //             <TableCell
    //               colSpan={columns.length + 1}
    //               style={{ textAlign: "center", color: "#777" }}
    //             >
    //               {message}
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    //   <TablePagination
    //     rowsPerPageOptions={rowsPerPageOptions}
    //     component="div"
    //     count={data.length}
    //     rowsPerPage={rowsPerPage}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </Paper>
    <Paper style={{ width: "100%", overflow: "hidden" }}>
      <TableContainer style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ fontWeight: "bold" }}>
                  {column.label}
                </TableCell>
              ))}
              {showAction && (
                <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(row)}
                    style={{ cursor: "pointer" }} // Add pointer cursor for UX
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {formatCellValue(row[column.id])}
                      </TableCell>
                    ))}
                    {showAction && (
                      <TableCell>
                        <IconButton onClick={(event) => handleClick(event, row)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          {menuItems.map((menuItem, idx) => (
                            <MenuItem
                              key={idx}
                              onClick={() => {
                                menuItem.onClick(row);
                                handleClose();
                              }}
                            >
                              {menuItem.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  style={{ textAlign: "center", color: "#777" }}
                >
                  {message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
