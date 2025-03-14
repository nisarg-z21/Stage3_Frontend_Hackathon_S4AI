// import React from "react";
// // import useAxios from "../api/useAxios";
// import DataTable from "../components/DataTable";
// import { Typography } from "@mui/material";
// import complains from "../data/dummy_complaints.json";

// const Complains = () => {
//   // const [complains, setComplains] = useState([]);

//   // const fetchComplains = async () => {
//   //   try {
//   //     const response = await fetch("/data/dummy_complaints.json");
//   //     const data = await response.json();
//   //     setComplains(data);
//   //   } catch (error) {
//   //     console.error("Error fetching complains:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchComplains();
//   // }, []);

//   const columnOrder = [
//     "complainId",
//     "mobileNo",
//     "description",
//     "uploadedFiles",
//     "category",
//     "subcategory",
//   ];

//   //   const menuItems = [
//   //     {
//   //       label: "Edit",
//   //       onClick: (row) => {
//   //         console.log("Edit clicked, user_id:", row.user_id);
//   //       },
//   //     },
//   //     {
//   //       label: "Delete",
//   //       onClick: (row) => {
//   //         console.log("Delete clicked, user_id:", row.user_id);
//   //       },
//   //     },
//   //   ];

//   return (
//     <section id="complain" style={{ margin: "20px" }}>
//       <Typography
//         variant="h4"
//         style={{ marginTop: "20px", marginBottom: "20px" }}
//         gutterBottom
//       >
//         Complain Table :
//       </Typography>
//       <DataTable
//         data={complains}
//         columnOrder={columnOrder}
//         // showAction={true}
//         message="No orders found."
//         // menuItems={menuItems}
//       />
//     </section>
//   );
// };

// export default Complains;

import React from "react";
import DataTable from "../components/DataTable";
import { Typography, Box } from "@mui/material";
import complains from "../data/dummy_complaints.json";

const Complains = () => {
  const columnOrder = [
    "complainId",
    "mobileNo",
    "description",
    "uploadedFiles",
    "category",
    "subcategory",
  ];

  return (
    <Box
      id="complain"
      sx={{
        margin: "20px",
        padding: "20px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
        gutterBottom
      >
        Complain Table :
      </Typography>
      <DataTable
        data={complains}
        columnOrder={columnOrder}
        message="No orders found."
      />
    </Box>
  );
};

export default Complains;
