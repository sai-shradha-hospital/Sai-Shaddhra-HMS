import axios from "axios";

const getallURL="http://localhost:8080/patient/getAll";


class PatientService{

    getPatients(){
        return axios.get(getallURL);
    
    }
}

export default new PatientService()