import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ product, setProduct }) => {
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];

  const smallNumber = (number) => {
    const firstFiveOrders = number.slice(0, 5);
    const lastFiveOrders = number.slice(-5);
    let actualNumber = `${firstFiveOrders}...${lastFiveOrders}`;
    return actualNumber;
  };

  const convertDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = `${dateObject
      .toString()
      .substring(0, 15)} ${dateObject.getHours()}:${dateObject.getMinutes()}`;

    return formattedDate;
  };
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product &&
            product.map((data, index) => {
              return (
                <TableRow key={data.id}>
                  <TableCell className="tableCell">
                    #{smallNumber(data._id)}
                  </TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={data.img} alt="" className="image" />
                      {data.product}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">
                    {data.beverageName}
                  </TableCell>
                  <TableCell className="tableCell">
                    {convertDate(data.deliveryTime)}
                  </TableCell>
                  <TableCell className="tableCell">{data.price}</TableCell>
                  <TableCell className="tableCell">Cash</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status Approved`}>Approved</span>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
