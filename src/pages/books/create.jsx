import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useState } from "react";
import Layout from "../../components/Layout";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjc3MjI5NzkxLCJleHAiOjE2NzcyMzMzOTF9.9fjXkh0uTsxFNwH4X6Q-1GYF2VDlpfHR-LBKuh3pr4M";

const Create = ({ categoryList }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    image: "Images",
    category: "",
    published: null,
    price: "",
    stock: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://tokobooks-production-4868.up.railway.app/api/v1/books`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.data) {
        setAlert({ show: true, type: "success", msg: res.data.message });
      }
    } catch (err) {
      console.log(err);
      setAlert({ show: true, type: "error", msg: err.message });
    }
  };
  return (
    <Layout>
      <Box sx={{ bgcolor: "white", padding: "16px", borderRadius: "8px" }}>
        <Typography variant="title" component="h1" gutterBottom>
          Input New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="title" label="Title" fullWidth margin="dense" onChange={handleChange} />
          <TextField name="author" label="Author" fullWidth margin="dense" onChange={handleChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select labelId="demo-simple-select-label" name="category" id="demo-simple-select" label="Category" onChange={handleChange}>
              {categoryList?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Published Date" value={form.published} onChange={(newValue) => setForm({ ...form, published: newValue })} renderInput={(params) => <TextField name="published" {...params} />} />
            </LocalizationProvider>
          </FormControl>

          <TextField name="price" label="Price" fullWidth type="number" margin="dense" onChange={handleChange} />
          <TextField name="stock" label="Stock" fullWidth type="number" margin="dense" onChange={handleChange} />
          <Button type="submit" variant="contained" sx={{ marginY: 2 }} startIcon={<AddIcon />}>
            Add New Book
          </Button>
        </form>
        <Snackbar open={alert.show} autoHideDuration={3000} onClose={() => setAlert({ ...form, show: false })} message="Note archived">
          <Alert onClose={() => setAlert({ ...form, show: false })} severity={alert.type} sx={{ width: "100%" }}>
            {alert.msg}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default Create;

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { title, category } = context.query;

  console.log("first", category);
  let categoryList = [];

  try {
    const cat = await axios.get(`https://tokobooks-production-4868.up.railway.app/api/v1/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    categoryList = cat.data.data;
  } catch (error) {
    console.log(error);
  }
  // Pass data to the page via props
  return { props: { categoryList } };
}
