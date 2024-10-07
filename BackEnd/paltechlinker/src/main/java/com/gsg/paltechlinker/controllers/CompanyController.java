package com.gsg.paltechlinker.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.gsg.paltechlinker.domain.dto.CompanyDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.mappers.Mapper;
import com.gsg.paltechlinker.services.CompanyService;
import com.gsg.paltechlinker.services.InternshipService;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.nio.file.*;
import java.io.*;
import java.util.UUID;


@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private static final String UPLOAD_DIR = "uploads/";

    private CompanyService companyService;
    private InternshipService internshipService;
    private Mapper<CompanyEntity, CompanyDto> mapper;


    public CompanyController(CompanyService companyService, InternshipService internshipService, Mapper<CompanyEntity, CompanyDto> mapper) {
        this.companyService = companyService;
        this.internshipService = internshipService;
        this.mapper = mapper;
    }
    

    @PostMapping(path = "/create")
    public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto) {
        CompanyEntity companyEntity = mapper.mapFrom(companyDto);
        CompanyEntity savedCompanyEntity = companyService.save(companyEntity);
        return new ResponseEntity<>(mapper.mapTo(savedCompanyEntity), HttpStatus.CREATED);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<CompanyDto> getCompany(@PathVariable Long id) {
        Optional<CompanyEntity> foundCompanyEntity = companyService.findOne(id);
        return foundCompanyEntity.map(companyEntity -> {
            return new ResponseEntity<>(mapper.mapTo(companyEntity), HttpStatus.OK);

        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/read/all")
    public Page<CompanyDto> listCompanies(Pageable pageable) {
        Page<CompanyEntity> companies = companyService.findAll(pageable);
        return companies.map(mapper::mapTo);
    }

    @PatchMapping("/update/partial/{id}")
    public ResponseEntity<CompanyDto> partialUpdateCompany(@PathVariable Long id, @RequestBody CompanyDto companyDtoWithNewData) {
        if (!companyService.isExists(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        CompanyEntity companyEntityWithNewData = mapper.mapFrom(companyDtoWithNewData);
        CompanyEntity  updatedCompanyEntity = companyService.partialUpdate(id, companyEntityWithNewData);
        return new ResponseEntity<>(mapper.mapTo(updatedCompanyEntity), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        internshipService.deleteByCompanyId(id);
        companyService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping(path = "/signup", consumes = "multipart/form-data")
    public ResponseEntity<String> signup(@RequestParam("file") MultipartFile file, @RequestBody CompanyDto companyDto) throws IOException {
        // Check if email is already registered
        if (companyService.isEmailExists(companyDto.getEmail())) {
            return new ResponseEntity<>("Email already in use. Use different Email", HttpStatus.CONFLICT);
        }
        // Save new company
        CompanyEntity companyEntity = mapper.mapFrom(companyDto);
        
        String fileName = saveFile(file);
        companyEntity.setImageUrl("http://localhost:8081/uploads/" + fileName);

        companyService.save(companyEntity);
        return new ResponseEntity<>("Signup successful.", HttpStatus.CREATED);
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Create a unique file name
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Save the file to the uploads directory
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.createDirectories(filePath.getParent());  // Ensure the directory exists
        Files.copy(file.getInputStream(), filePath);

        return fileName;  // Return the file name for URL construction
    }

}
