package com.TE_project.Hospital.service;



import com.TE_project.Hospital.model.Patient;


import java.util.List;
import java.util.Optional;

public interface PatientService {
    public Patient savePatient(Patient patient);

    public List<Patient> getAllPatients();

    List<String> getAllPatientNames();

    public Optional<Patient> getById(int id);


    Patient getPatientbyName(String name);

    Patient getPatientbyContact(String contact);

    public String deletePatientByName(String name);

    void updatePatient(String name, Patient updatedPatient);
}
