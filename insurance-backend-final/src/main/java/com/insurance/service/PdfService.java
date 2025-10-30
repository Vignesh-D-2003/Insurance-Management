package com.insurance.service;

import com.insurance.entity.InsurancePolicy;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;

@Service
public class PdfService {

    @Autowired
    private InsurancePolicyService policyService;

    public byte[] generatePolicyDocument(Long policyId) throws IOException {
        InsurancePolicy policy = policyService.getPolicyById(policyId);
        
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        // Add title
        Paragraph title = new Paragraph("INSURANCE POLICY DOCUMENT")
                .setFontSize(18)
                .setBold();
        document.add(title);

        // Add policy details
        document.add(new Paragraph("\n"));
        document.add(new Paragraph("Policy Details").setBold());
        
        Table policyTable = new Table(2);
        policyTable.addCell("Policy Number:");
        policyTable.addCell(policy.getPolicyNumber());
        policyTable.addCell("Insurance Type:");
        policyTable.addCell(policy.getInsuranceType().toString());
        policyTable.addCell("Premium Amount:");
        policyTable.addCell("₹" + policy.getPremiumAmount());
        policyTable.addCell("Coverage Amount:");
        policyTable.addCell("₹" + policy.getCoverageAmount());
        policyTable.addCell("Policy Start Date:");
        policyTable.addCell(policy.getPolicyStartDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
        policyTable.addCell("Policy End Date:");
        policyTable.addCell(policy.getPolicyEndDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")));
        policyTable.addCell("Policy Status:");
        policyTable.addCell(policy.getPolicyStatus().toString());
        
        document.add(policyTable);

        // Add policyholder details
        document.add(new Paragraph("\n"));
        document.add(new Paragraph("Policyholder Details").setBold());
        
        Table holderTable = new Table(2);
        holderTable.addCell("Name:");
        holderTable.addCell(policy.getUser().getFullName());
        holderTable.addCell("Email:");
        holderTable.addCell(policy.getUser().getEmail());
        holderTable.addCell("Phone:");
        holderTable.addCell(policy.getUser().getPhoneNumber());
        holderTable.addCell("Address:");
        holderTable.addCell(policy.getUser().getAddress());
        
        document.add(holderTable);

        // Add type-specific details
        addTypeSpecificDetails(document, policy);

        // Add footer
        document.add(new Paragraph("\n"));
        Paragraph footer = new Paragraph("This is a computer-generated document and does not require signature.")
                .setFontSize(10);
        document.add(footer);

        document.close();
        return byteArrayOutputStream.toByteArray();
    }

    private void addTypeSpecificDetails(Document document, InsurancePolicy policy) {
        document.add(new Paragraph("\n"));
        
        switch (policy.getInsuranceType()) {
            case BIKE:
            case CAR:
                if (policy instanceof com.insurance.entity.VehicleInsurance) {
                    com.insurance.entity.VehicleInsurance vehiclePolicy = 
                        (com.insurance.entity.VehicleInsurance) policy;
                    document.add(new Paragraph("Vehicle Details").setBold());
                    
                    Table vehicleTable = new Table(2);
                    vehicleTable.addCell("Vehicle Number:");
                    vehicleTable.addCell(vehiclePolicy.getVehicleNumber());
                    vehicleTable.addCell("Chassis Number:");
                    vehicleTable.addCell(vehiclePolicy.getChassisNumber());
                    vehicleTable.addCell("Registration Date:");
                    vehicleTable.addCell(vehiclePolicy.getRegistrationDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
                    vehicleTable.addCell("Make:");
                    vehicleTable.addCell(vehiclePolicy.getVehicleMake());
                    vehicleTable.addCell("Model:");
                    vehicleTable.addCell(vehiclePolicy.getVehicleModel());
                    
                    document.add(vehicleTable);
                }
                break;
                
            case HEALTH:
                if (policy instanceof com.insurance.entity.HealthInsurance) {
                    com.insurance.entity.HealthInsurance healthPolicy = 
                        (com.insurance.entity.HealthInsurance) policy;
                    document.add(new Paragraph("Health Insurance Details").setBold());
                    
                    Table healthTable = new Table(2);
                    healthTable.addCell("Policy Type:");
                    healthTable.addCell(healthPolicy.getPolicyType());
                    healthTable.addCell("Hospital Network:");
                    healthTable.addCell(healthPolicy.getHospitalNetwork());
                    healthTable.addCell("Room Rent Limit:");
                    healthTable.addCell("₹" + healthPolicy.getRoomRentLimit());
                    healthTable.addCell("Ambulance Cover:");
                    healthTable.addCell(healthPolicy.getAmbulanceCover() ? "Yes" : "No");
                    
                    document.add(healthTable);
                }
                break;
                
            case TERM_LIFE:
                if (policy instanceof com.insurance.entity.TermLifeInsurance) {
                    com.insurance.entity.TermLifeInsurance termPolicy = 
                        (com.insurance.entity.TermLifeInsurance) policy;
                    document.add(new Paragraph("Term Life Insurance Details").setBold());
                    
                    Table termTable = new Table(2);
                    termTable.addCell("Nominee Name:");
                    termTable.addCell(termPolicy.getNomineeName());
                    termTable.addCell("Nominee Relation:");
                    termTable.addCell(termPolicy.getNomineeRelation());
                    termTable.addCell("Term Years:");
                    termTable.addCell(termPolicy.getTermYears().toString());
                    termTable.addCell("Critical Illness Cover:");
                    termTable.addCell(termPolicy.getCriticalIllnessCover() ? "Yes" : "No");
                    
                    document.add(termTable);
                }
                break;
        }
    }
}