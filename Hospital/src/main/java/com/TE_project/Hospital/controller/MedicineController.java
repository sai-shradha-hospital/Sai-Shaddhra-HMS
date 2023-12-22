package com.TE_project.Hospital.controller;

import com.TE_project.Hospital.model.Medicine;
import com.TE_project.Hospital.model.Patient;
import com.TE_project.Hospital.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicine")
@CrossOrigin
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @PostMapping("/add")
    public String add(@RequestBody Medicine medicine){
        medicineService.saveMedicine(medicine);
        return "Medicine Added";
    }


    @GetMapping("/getAll")
    public List<Medicine> getAllMedicine(){
        return medicineService.getAllMedicine();
    }

    @GetMapping("/byName/{name}")
    public Medicine getMedicineByName(@PathVariable String name) {
        return medicineService.getMedicinebyName(name);
    }

    @DeleteMapping("/{mname}")
    public String deleteMedicineByName(@PathVariable String mname) {
        medicineService.deleteMedicineByName(mname);
        return "Medicine " + mname + " deleted";
    }

}
