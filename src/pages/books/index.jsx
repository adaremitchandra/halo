import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import Layout from "../../components/Layout";

const columns = [
  { id: "id", label: "ID", minWidth: 1 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 90 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "author", label: "Author", minWidth: 100 },
  { id: "published", label: "Published", minWidth: 80, align: "center" },
  { id: "price", label: "Price", minWidth: 100, align: "center" },
  { id: "stock", label: "Stock", minWidth: 80, align: "center" },
  { id: "action", label: "Action", minWidth: 80, align: "center" },
];

function createData(
  id,
  title,
  image,
  category,
  author,
  published,
  price,
  stock,
  action
) {
  const date = new Date(published);
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("id-ID", options); // 18 Februari 2023

  return {
    id,
    title,
    image,
    category,
    author,
    published: formattedDate,
    price,
    stock,
    action,
  };
}

const Books = ({ bookList }) => {
  const rows = bookList.map((item) => {
    const action = <Button variant="contained">Update</Button>;
    return createData(
      item.id,
      item.title,
      item.image,
      item.Category.name,
      item.author,
      item.published,
      item.price,
      item.stock,
      action
    );
  });

  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "white",
          padding: "16px",
          marginBottom: "16px",
          borderRadius: "8px",
        }}
      >
        <Typography>Filter</Typography>
        <Grid container marginY={1} spacing={2}>
          <Grid item>
            <TextField label="Title" />
          </Grid>
          <Grid item>
            <TextField label="Category" />
          </Grid>
          <Grid item>
            <TextField label="Author" />
          </Grid>
          <Grid item>
            <TextField label="Author" />
          </Grid>
        </Grid>
        <Button variant="contained">Filter</Button>
      </Box>
      <Box sx={{ marginBottom: "32px" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      style={{ backgroundColor: index % 2 === 0 && "#f9f9f9" }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Books;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjc3MTcxMjQ0LCJleHAiOjE2NzcxNzQ4NDR9.IvYOB5Hoqjs20wWXoIrItnJpOof6MuYW8YjgSCk2YGw";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(
    `https://tokobooks-production-4868.up.railway.app/api/v1/books`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const bookList = res.data.data;
  // Pass data to the page via props
  return { props: { bookList } };
}
