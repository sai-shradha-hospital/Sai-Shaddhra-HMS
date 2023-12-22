package com.TE_project.Hospital.service;

import com.TE_project.Hospital.model.Medicine;
import com.TE_project.Hospital.model.Patient;

import java.util.List;

public interface MedicineService {
    public Medicine saveMedicine(Medicine medicine);
    public List<Medicine> getAllMedicine();

    public Medicine getMedicinebyName(String mname);

    public String deleteMedicineByName(String mname);







}
