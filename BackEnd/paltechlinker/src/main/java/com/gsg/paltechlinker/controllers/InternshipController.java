package com.gsg.paltechlinker.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gsg.paltechlinker.domain.dto.CompanyDto;
import com.gsg.paltechlinker.domain.dto.InternshipDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import com.gsg.paltechlinker.mappers.Mapper;
import com.gsg.paltechlinker.services.CompanyService;
import com.gsg.paltechlinker.services.InternshipService;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/interns")
public class InternshipController {

    private InternshipService internshipService;
    private Mapper<InternshipEntity, InternshipDto> mapper;


    public InternshipController(InternshipService internshipService, Mapper<InternshipEntity, InternshipDto> mapper) {
        this.internshipService = internshipService;
        this.mapper = mapper;
    }

    @PostMapping("/create")
    public ResponseEntity<InternshipDto> create(@RequestBody InternshipDto internshipDto) {
        InternshipEntity internshipEntity = mapper.mapFrom(internshipDto);
        InternshipEntity savedInternshipEntity = internshipService.save(internshipEntity);
        return new ResponseEntity<>(mapper.mapTo(savedInternshipEntity), HttpStatus.CREATED);
    }
    
    @GetMapping("/read/{id}")
    public ResponseEntity<CompanyDto> getCompany(@PathVariable Long id) {
        Optional<CompanyEntity> foundCompanyEntity = companyService.findOne(id);
        return foundCompanyEntity.map(companyEntity -> {
            return new ResponseEntity<>(mapper.mapTo(companyEntity), HttpStatus.OK);

        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
}
