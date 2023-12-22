package com.TE_project.Hospital.repository;

import com.TE_project.Hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepo extends JpaRepository<Patient,Integer> {
    Patient findByName(String name);

    Patient findByContact(String contact);
}
