package com.TE_project.Hospital.controller;

import com.TE_project.Hospital.model.Patient;
import com.TE_project.Hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {
    @Autowired
    private PatientService patientService;

    @PostMapping("/add")
    public String add(@RequestBody Patient patient){
        patientService.savePatient(patient);
        return "Patient added successfully";
    }

    @GetMapping("/getAllbyName")
    public List<String> getAllPatientNames(){
        return patientService.getAllPatientNames();
    }

    @GetMapping("/getAll")
    public List<Patient> getAllPatients(){
        return patientService.getAllPatients();
    }

    @GetMapping("/byId/{id}")
    public Optional<Patient> getById(@PathVariable int id){
        return patientService.getById(id);
                //.orElseThrow(()->new PatientNotFoundException(id));
    }

    @GetMapping("/byName/{name}")
    public Patient getPatientByName(@PathVariable String name) {
        return patientService.getPatientbyName(name);
    }

    @GetMapping("/byContact/{contact}")
    public Patient getPatientByContact(@PathVariable String contact) {
        return patientService.getPatientbyContact(contact);
    }

    @DeleteMapping("/{name}")
    public String deletePatientByName(@PathVariable String name) {
        patientService.deletePatientByName(name);
        return "Patient " + name + " deleted";
    }

  //  @PutMapping("/{name}")
   // public Patient updatePatient(@RequestBody Patient newPatient, @PathVariable String name){
     //   return patientRepo.getPatientbyName(name)


    //}
    @PutMapping("/{name}")
    public void updatePatient(@PathVariable String name, @RequestBody Patient updatedPatient) {
        patientService.updatePatient(name, updatedPatient);
    }

}
