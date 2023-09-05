import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { OpulentSips } from "../../context/OpulentSipsContext";

const Datatable = () => {
  const { getAllOrder, getAllUser } = useContext(OpulentSips);

  const [data, setData] = useState(userRows);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    let data = await getAllUser();
    if (data) {
      const usersWithIds = data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setUsers(usersWithIds);
      setError(false);
    } else {
      setError(true);
      console.log("nope");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">Users</div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns}
        // columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
