package com.TE_project.Hospital.service;

import com.TE_project.Hospital.model.Patient;
import com.TE_project.Hospital.repository.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepo patientRepo;

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepo.save(patient);
    }

    @Override
    public List<String> getAllPatientNames() {
        List<Patient> patients = patientRepo.findAll();
        List<String> names = new ArrayList<>();

        for (Patient patient : patients) {
            names.add(patient.getName());
        }
        return names;
    }


    @Override
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    @Override
    public Optional<Patient> getById(int id) {
        return patientRepo.findById(id);
    }



    @Override
    public Patient getPatientbyContact(String contact) {
        return patientRepo.findByContact(contact);
    }

    @Override
    public Patient getPatientbyName(String name) {
        return patientRepo.findByName(name);
    }
    @Override
    public String deletePatientByName(String name) {
        Patient patient = patientRepo.findByName(name);
        if (patient != null) {
            patientRepo.delete(patient);
        } else {
            // Handle the case when the patient is not found
            throw new RuntimeException("Patient not found with name: " + name);
        }
        return name;
    }

    public void updatePatient(String name, Patient updatedPatient) {
        Patient patient = patientRepo.findByName(name);
        if (patient != null) {
            patient.setName(updatedPatient.getName());

            patientRepo.save(patient);
        } else {
            // Handle the case when the patient is not found
            throw new RuntimeException("Patient not found with name: " + name);
        }

    }



}