/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */

import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MDBox from "components/MDBox";

function machinesData() {
  const [machines, setMachines] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMachineData, setEditMachineData] = useState(null);

  const handleEdit = (machineData) => {
    setIsEditModalOpen(true);
    setEditMachineData(machineData);
  };

  const fetchMachines = async () => {
    try {
      const response = await fetch("http://localhost:4000/showMachines");

      if (response.ok) {
        const data = await response.json();
        setMachines(data);
      } else {
        console.error("Failed to fetch machines:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching machines:", error);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const rows = machines.map((machine) => ({
    name: machine.name,
    supplier: machine.supplier,
    category: machine.category,
    shrinkCategory: machine.shrinkCategory,
    action: (
      <MDBox>
        <span style={{ fontSize: "20px", marginRight: "1rem" }}>
          <EditIcon onClick={() => handleEdit(machine)} />
        </span>
        <span style={{ fontSize: "20px" }}>
          <DeleteIcon />
        </span>
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "name", accessor: "name", width: "25%" },
      { Header: "supplier", accessor: "supplier", width: "25%" },
      { Header: "shrink Category", accessor: "shrinkCategory", width: "25%" },
      { Header: "category", accessor: "category" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
    fetchMachines,
    isEditModalOpen,
    setIsEditModalOpen,
    editMachineData,
  };
}

export default machinesData;
