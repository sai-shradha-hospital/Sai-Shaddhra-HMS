package com.TE_project.Hospital.service;

import com.TE_project.Hospital.model.Medicine;
import com.TE_project.Hospital.repository.MedicineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService{
    @Autowired
    private MedicineRepo medicineRepo;

    @Override
    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepo.save(medicine);
    }

    @Override
    public List<Medicine> getAllMedicine() {
        return medicineRepo.findAll();
    }


    @Override
    public Medicine getMedicinebyName(String mname) {
        return medicineRepo.findByMname(mname);
    }


    @Override
    public String deleteMedicineByName(String mname) {
        Medicine medicine = medicineRepo.findByMname(mname);
        if (medicine != null) {
            medicineRepo.delete(medicine);
        } else {
            // Handle the case when the patient is not found
            throw new RuntimeException("Patient not found with name: " + mname);
        }
        return mname;
    }
}
