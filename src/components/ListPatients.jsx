import React, { Component } from 'react'
import PatientService from '../services/PatientService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default class ListPatients extends Component {
  constructor(props){
      super(props)
      this.state={
          patients: []
      }
  }
  
  
  
  componentDidMount(){
        PatientService.getPatients().then((res) =>{
            this.setState({ patients: res.data});
        });
  }
    render() {
        const patients = [
            { field: "id", headerName: "ID" },
            {
              field: "name",
              headerName: "Name",
              flex: 1,
              cellClassName: "name-column--cell",
            },
            {
              field: "age",
              headerName: "Age",
              flex: 1,
              cellClassName: "name-column--cell",
            },
            {
              field: "sex",
              headerName: "Sex",
              flex: 1,
              
            },
            {
              field: "bloodgrp",
              headerName: "Blood Group",
              flex: 1,
            },
            {
              field: "contact",
              headerName: "Contact",
              flex: 1,
            },
            {
              field: "email",
              headerName: "Email",
              flex: 1,
            },
            {
              field: "address",
              headerName: "Address",
              flex: 1,
            },
          ];
    return (
      <div>
        <h2 className='text-center'> Patient List</h2>
        <TableContainer component={Paper} >
                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableHead>
                     <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Sex</TableCell>
                      <TableCell align="right">Blood Group</TableCell>
                      <TableCell align="right">Contact</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address</TableCell>
                      {/* <TableCell align="right">Total&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.patients.map((patient) => (
                      <TableRow
                        key={patient.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{patient.name}</TableCell>
                        <TableCell align="right">{patient.age}</TableCell>
                        <TableCell align="right">{patient.sex}</TableCell>
                        <TableCell align="right">{patient.bloodgrp}</TableCell>
                        <TableCell align="right">{patient.contact}</TableCell>
                        <TableCell align="right">{patient.email}</TableCell>
                        <TableCell align="left">{patient.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        

        </div>
        
      
    )
  }
}
