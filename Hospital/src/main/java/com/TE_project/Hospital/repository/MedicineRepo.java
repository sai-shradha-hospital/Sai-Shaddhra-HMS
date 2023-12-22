package com.TE_project.Hospital.repository;

import com.TE_project.Hospital.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepo extends JpaRepository<Medicine,Integer> {




    Medicine findByMname(String mname);
}
