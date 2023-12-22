import {
  Box,
  Button,
  TextField,
  IconButton,
  useTheme,
  Typography,
  Card,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MedSearchBar } from "../../components/MedSearchBar";
import { SearchResultsList } from "../../components/SearchResultsList";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

const Opd = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [bloodgrp, setBloodgrp] = useState("");
  const [weight, setWeight] = useState("");
  const [heartrate, setHeartrate] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [complaints, setComplaints] = useState("");
  const [prescription, setPrescription] = useState("");
  const [patient, setPatient] = useState([]);
  const [urldata, setUrlData] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [medicineNames, setMedicineNames] = useState([]);
  const [currentMedicine, setCurrentMedicine] = useState("");
  const [followup, setDate] = useState("")
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const url = "http://localhost:8080/patient/byContact/";
  const [result, setResults] = useState([]);
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;

  const refreshPage = ()=>{
    window.location.reload(false);
  }

  const cancelCourse = () => { 
    setPatient({
      name:"",
      age:"",
      sex:"",
      bloodgrp:"",
      weight:"",
      heartrate:"",
      contact:"",
      email:"",
      address:""
  })
    
    
  };

  useEffect(() => {
    if (buttonClicked) {
      // Place your fetch logic here
      fetch(url + urldata)
        .then((res) => res.json())
        .then((result) => {
          setPatient(result);
        });
    }
  }, [buttonClicked]);

  const handleAddMedicine = () => {
    setMedicineNames([...medicineNames, currentMedicine]);
    setCurrentMedicine("");
  };

  const handleButtonClick = () => {
    // Update the buttonClicked state to trigger the useEffect
    setButtonClicked(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const patient = {
      name,
      age,
      sex,
      bloodgrp,
      weight,
      heartrate,
      contact,
      email,
      address,
      complaints,
      prescription,
    };
    console.log(patient);
    fetch("http://localhost:8080/patient/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    }).then(() => {
      console.log("New Patient added");
    });
  };

  const [loader, setLoader] = useState(false);
  const downloadPDF = () => {
    const capture = document.querySelector(".template");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Crocin", 159, 1, 6, "Daily"),
    createData("Dolo", 237, 1, 6, "Daily"),
    createData("Sinarest", 262, 1, 9, "Daily"),
    createData("Alex", 305, 2, 12, "Daily"),
    createData("Paracetamol", 356, 2, 12, "Daily"),
  ];
  const gender = [
    {
      value: "male",
      label: "M",
    },
    {
      value: "female",
      label: "F",
    },
  ];

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  return (
    <Box m="20px">
      <Header title="OPD" subtitle="Outpatient Department" />
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        marginBottom="20px"
      >
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Search"
          onChange={(e) => setUrlData(e.target.value)}
          name="urldata"
          sx={{ gridColumn: "span 1" }}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleButtonClick}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Formik
        id="patientform"
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                id="Name"
                type="text"
                value={patient.name !== "" ? patient.name : ""}
                placeholder="Name"
                onBlur={handleBlur}
                onChange={(e) => setName(e.target.value)}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                value={patient.age !== "" ? patient.age : ""}
                placeholder="Age"
                onBlur={handleBlur}
                onChange={(e) => setAge(e.target.value)}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={patient.sex !== "" ? patient.sex : ""}
                placeholder="Sex"
                
                onBlur={handleBlur}
                onChange={(e) => setSex(e.target.value)}
                name="sex"
                error={!!touched.sex && !!errors.sex}
                helperText={touched.sex && errors.sex}
                sx={{ gridColumn: "span 1" }}
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={patient.bloodgrp !== "" ? patient.bloodgrp : ""}
                placeholder="Blood Group"
                onBlur={handleBlur}
                onChange={(e) => setBloodgrp(e.target.value)}
                name="bloodgrp"
                error={!!touched.bloodgrp && !!errors.bloodgrp}
                helperText={touched.bloodgrp && errors.bloodgrp}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                value={patient.contact !== "" ? patient.contact : ""}
                placeholder="Phone No."
                
                onBlur={handleBlur}
                onChange={(e) => setContact(e.target.value)}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                value={patient.email !== "" ? patient.email : ""}
                placeholder="Email"                
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={patient.address !== "" ? patient.address : ""}
                placeholder="Address"
                onBlur={handleBlur}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="float"
                value={patient.weight !== "" ? patient.weight : ""}
                placeholder="Weight"
                onBlur={handleBlur}
                onChange={(e)=>setWeight(e.target.value)}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="float"
                value={patient.heartrate !== "" ? patient.heartrate : ""}
                placeholder="Heart Rate"
                onBlur={handleBlur}
                onChange={(e)=>setHeartrate(e.target.value)}
                name="heartrate"
                error={!!touched.heartrate && !!errors.heartrate}
                helperText={touched.heartrate && errors.heartrate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Follow Up Visit"
                onChange={(e)=>setDate(e.target.value)}
                
                name="followup"
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Complaints"
                value={transcript}
                onBlur={handleBlur}
                onChange={(e) => setComplaints(e.target.value)}
                name="complaints"
                error={!!touched.complaints && !!errors.complaints}
                helperText={touched.complaints && errors.complaints}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <MedSearchBar setResults={setResults} />
            <SearchResultsList
              results={result}
              medicineNames={medicineNames}
              setMedicineNames={setMedicineNames}
            />
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={refreshPage}
              >
                Reset
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleClick}
              >
                Save Patient
              </Button>
              <Button onClick={startListening}>Start Listening</Button>
              {/* <Button onClick={SpeechRecognition.stopListening}>
                Stop Listening
              </Button> */}
            </Box>
          </form>
        )}
      </Formik>

      <Box>
        <Header title="Prescription" />
        <div className="template">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <Box sx={{ bgcolor: "white", height: "150vh" }}>
                <img
                  src={`../../assets/letterhead.png`}
                  alt="letter-head"
                  width={"1150px"}
                  height={"300px"}
                />
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  display="inline-block"
                  marginRight="760px"
                  marginTop="40px"
                >
                  Name : {patient.name}<br/>
                  Phone no. : {patient.contact}<br/>
                  Heart Rate : {heartrate}<br/>
                  Weight : {weight}
                </Typography>
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  display="inline-block"
                  justifyContent="end"
                >
                  Date : {currentDate}
                </Typography>
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  marginTop="20px"
                  marginBottom="40px"
                >
                  Complaints : {transcript}
                </Typography>
                <Typography variant="h3" color={colors.grey[100]}>
                  Rx
                </Typography>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, bgcolor: "white" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                      <TableCell                          
                          sx={{
                            color: "text.primary",
                            typography: "body1",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Sr No.&nbsp;
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "text.primary",
                            typography: "body1",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Medicine Name
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "text.primary",
                            typography: "body1",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          <div>Frequency</div>
                          <div>Breakfast Lunch Snack Dinner</div>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "text.primary",
                            typography: "body1",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Duration&nbsp;
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {medicineNames.map((medicineName, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },                    
                          }}
                          
                        >
                          <TableCell
                            align="center"
                            sx={{ color: "text.primary" }}
                           
                          >
                             {index+1}
                          </TableCell>
                          <TableCell
                            align="center"
                            component="th"
                            scope="row"
                            sx={{ color: "text.primary", fontSize: "20px" }}
                          >
                            {medicineName.toUpperCase()}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "text.primary" }}
                          >
                            <Checkbox {...label} />
                            <Checkbox {...label} />
                            <Checkbox {...label} />
                            <Checkbox {...label} />
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: "text.primary" }}
                          >
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                              <OutlinedInput
                                id="outlined-adornment-days"
                                endAdornment={<InputAdornment position="end">Days</InputAdornment>}
                                aria-describedby="outlined-days-helper-text"
                                type="number"
                                inputProps={{
                                  'aria-label': 'weight',
                                }}
                              />
                            </FormControl>
                          </TableCell>
                          
                          <TableCell
                            align="center"
                            sx={{ color: "text.primary" }}
                          >
                            
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br/>
                <h2>Follow up date : {followup}</h2>
              </Box>
            </Container>
          </React.Fragment>
        </div>
        <Button
          className="receipt-modal-download-button"
          color="secondary"
          variant="contained"
          onClick={downloadPDF}
          disabled={!(loader === false)}
        >
          {loader ? <span>Downloading</span> : <span>Download</span>}
        </Button>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  // name: yup.string().required("required"),
  // age: yup.string().required("required"),
  // sex: yup.string().required("required"),
  // weight: yup.string().required("required"),
  // heartrate: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // address: yup.string().required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // complaints: yup.string().required("required"),
  // prescription: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Opd;
