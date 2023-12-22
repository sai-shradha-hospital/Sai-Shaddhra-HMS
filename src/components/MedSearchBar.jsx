import { useState } from "react";
import { TextField } from "@mui/material";


import "./MedSearchBar.css";

export const MedSearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:8080/medicine/getAll")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((getAll) => {
          return (
            value &&
            getAll &&
            getAll.mname &&
            getAll.mname.toLowerCase().includes(value)
          );
        
        });
        setResults(results);
      });
    }; 
  

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Search Medicines"
                onChange={(e) => handleChange(e.target.value)}
                name="complaints"
                sx={{ gridColumn: "span 4", marginTop: "30px" }}
                
              />
  );
};