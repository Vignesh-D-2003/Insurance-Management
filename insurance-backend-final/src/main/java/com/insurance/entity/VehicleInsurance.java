package com.insurance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "vehicle_insurance")
public class VehicleInsurance extends InsurancePolicy {
    
    @NotBlank
    @Size(max = 20)
    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @NotBlank
    @Size(max = 50)
    @Column(name = "chassis_number")
    private String chassisNumber;

    @NotNull
    @Column(name = "registration_date")
    private java.time.LocalDate registrationDate;

    @Size(max = 100)
    @Column(name = "vehicle_make")
    private String vehicleMake;

    @Size(max = 100)
    @Column(name = "vehicle_model")
    private String vehicleModel;

    @Column(name = "vehicle_year")
    private Integer vehicleYear;

    @Size(max = 20)
    @Column(name = "engine_number")
    private String engineNumber;

    // Constructors
    public VehicleInsurance() {
        super();
    }

    public VehicleInsurance(String vehicleNumber, String chassisNumber, java.time.LocalDate registrationDate) {
        super();
        this.vehicleNumber = vehicleNumber;
        this.chassisNumber = chassisNumber;
        this.registrationDate = registrationDate;
    }

    // Getters and Setters
    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getChassisNumber() { return chassisNumber; }
    public void setChassisNumber(String chassisNumber) { this.chassisNumber = chassisNumber; }

    public java.time.LocalDate getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(java.time.LocalDate registrationDate) { this.registrationDate = registrationDate; }

    public String getVehicleMake() { return vehicleMake; }
    public void setVehicleMake(String vehicleMake) { this.vehicleMake = vehicleMake; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public Integer getVehicleYear() { return vehicleYear; }
    public void setVehicleYear(Integer vehicleYear) { this.vehicleYear = vehicleYear; }

    public String getEngineNumber() { return engineNumber; }
    public void setEngineNumber(String engineNumber) { this.engineNumber = engineNumber; }
}