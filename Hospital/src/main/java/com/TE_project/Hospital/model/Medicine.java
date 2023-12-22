package com.TE_project.Hospital.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String mname;
    private String power;
    private String type;

    private String msymptoms1;
    private String msymptoms2;
    private String msymptoms3;

    public Medicine() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMsymptoms1() {
        return msymptoms1;
    }

    public void setMsymptoms1(String msymptoms1) {
        this.msymptoms1 = msymptoms1;
    }

    public String getMsymptoms2() {
        return msymptoms2;
    }

    public void setMsymptoms2(String msymptoms2) {
        this.msymptoms2 = msymptoms2;
    }

    public String getMsymptoms3() {
        return msymptoms3;
    }

    public void setMsymptoms3(String msymptoms3) {
        this.msymptoms3 = msymptoms3;
    }
}




