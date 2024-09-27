package com.gsg.paltechlinker.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.gsg.paltechlinker.domain.dto.CompanyDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.mappers.Mapper;
import com.gsg.paltechlinker.services.CompanyService;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
public class CompanyController {

    private static final String COMPANIES = "/companies", COMPANIES_ID = "companies/{id}";

    private CompanyService companyService;
    private Mapper<CompanyEntity, CompanyDto> mapper;


    public CompanyController(CompanyService companyService, Mapper<CompanyEntity, CompanyDto> mapper) {
        this.companyService = companyService;
        this.mapper = mapper;
    }
    

    @PostMapping(COMPANIES)
    public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto) {
        CompanyEntity companyEntity = mapper.mapFrom(companyDto);
        CompanyEntity savedCompanyEntity = companyService.save(companyEntity);
        return new ResponseEntity<>(mapper.mapTo(savedCompanyEntity), HttpStatus.CREATED);
    }
    
    @GetMapping(COMPANIES_ID)
    public ResponseEntity<CompanyDto> getCompany(@PathVariable Long id) {
        Optional<CompanyEntity> foundCompanyEntity = companyService.findOne(id);
        return foundCompanyEntity.map(companyEntity -> {
            return new ResponseEntity<>(mapper.mapTo(companyEntity), HttpStatus.OK);

        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping(COMPANIES)
    public Page<CompanyDto> listCompanies(Pageable pageable) {
        Page<CompanyEntity> companies = companyService.findAll(pageable);
        return companies.map(mapper::mapTo);
    }

    @PutMapping(COMPANIES_ID)
    public ResponseEntity<CompanyDto> fullUpdateCompany(@PathVariable Long id, @RequestBody CompanyDto companyDtoWithNewData) {
        if (!companyService.isExists(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        companyDtoWithNewData.setId(id);

        CompanyEntity companyEntityWithNewData = mapper.mapFrom(companyDtoWithNewData);
        CompanyEntity saveCompanyEntity = companyService.save(companyEntityWithNewData);
        return new ResponseEntity<>(mapper.mapTo(saveCompanyEntity), HttpStatus.OK);
    }

}
