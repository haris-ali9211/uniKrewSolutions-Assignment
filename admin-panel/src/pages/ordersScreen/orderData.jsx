import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { OpulentSips } from "../../context/OpulentSipsContext";

export const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 120,
    renderCell: (params) => {
      const firstFiveOrders = params.formattedValue.slice(0, 5);
      const lastFiveOrders = params.formattedValue.slice(-5);
      let actualNumber = `${firstFiveOrders}...${lastFiveOrders}`;
      return <div>{actualNumber}</div>;
    },
  },
  // {
  //   field: "user",
  //   headerName: "User",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.img} alt="avatar" />
  //         {params.row.username}
  //       </div>
  //     );
  //   },
  // },
  {
    field: "beverageName",
    headerName: "Name",
    width: 130,
  },

  {
    field: "sugarLevel",
    headerName: "Sugar Level",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.formattedValue}`}>
          {params.formattedValue}
        </div>
      );
    },
  },
  {
    field: "cupCapacity",
    headerName: "Cup Capacity",
    width: 100,
    renderCell: (params) => {
      return (
        <div
          className={`cellWithStatusCup ${params.formattedValue}`}
        >{` ${params.formattedValue}`}</div>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 70,
    renderCell: (params) => {
      return (
        <div
          className={`cellWithStatus active`}
        >{` ${params.formattedValue}`}</div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 50,
  },
  {
    field: "recurringSchedules",
    headerName: "Recurring Schedules",
    width: 250,
    renderCell: (params) => {
      if (params.row.recurringOrder) {
        return (
          <div style={{ fontSize: "14px", color: "#333" }}>
            {params.row.recurringSchedules.length > 0 ? (
              <ul style={{ listStyleType: "disc" }}>
                {params.row.recurringSchedules.map((schedule) => (
                  <li key={schedule._id}>
                    {schedule.dayOfWeek} at {schedule.deliveryTime}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ fontStyle: "italic", color: "#777" }}>
                No recurring schedules
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div style={{ listStyleType: "disc", fontWeight: "bold" }}>
            {" "}
            No recurring schedules
          </div>
        );
      }
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

const Datatable = () => {
  const { getAllOrder, getAllUser } = useContext(OpulentSips);

  const [data, setData] = useState(userRows);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    let data = await getAllOrder();
    if (data) {
      const ordersWithIds = data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));

      setOrder(ordersWithIds);
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Orders
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={order}
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
