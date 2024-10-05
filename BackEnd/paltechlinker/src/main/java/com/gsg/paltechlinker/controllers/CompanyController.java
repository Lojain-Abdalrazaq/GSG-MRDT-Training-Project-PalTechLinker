package com.gsg.paltechlinker.controllers;

import org.springframework.web.bind.annotation.*;
import com.gsg.paltechlinker.domain.dto.CompanyDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.mappers.Mapper;
import com.gsg.paltechlinker.services.CompanyService;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private CompanyService companyService;
    private Mapper<CompanyEntity, CompanyDto> mapper;


    public CompanyController(CompanyService companyService, Mapper<CompanyEntity, CompanyDto> mapper) {
        this.companyService = companyService;
        this.mapper = mapper;
    }
    

    @PostMapping("/create")
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

    @PutMapping("/update/{id}")
    public ResponseEntity<CompanyDto> fullUpdateCompany(@PathVariable Long id, @RequestBody CompanyDto companyDtoWithNewData) {
        if (!companyService.isExists(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        companyDtoWithNewData.setId(id);

        CompanyEntity companyEntityWithNewData = mapper.mapFrom(companyDtoWithNewData);
        CompanyEntity updatedCompanyEntity = companyService.save(companyEntityWithNewData);
        return new ResponseEntity<>(mapper.mapTo(updatedCompanyEntity), HttpStatus.OK);
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
        companyService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // sign-up functionality
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody CompanyDto companyDto) {
        // Check if email is already registered
        if (companyService.isEmailExists(companyDto.getEmail())) {
            return new ResponseEntity<>("Email already in use. Use different Email", HttpStatus.CONFLICT);
        }
        // Save new company
        CompanyEntity companyEntity = mapper.mapFrom(companyDto);
        companyService.save(companyEntity);
        return new ResponseEntity<>("Signup successful.", HttpStatus.CREATED);
    }



}
