package com.gsg.paltechlinker.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gsg.paltechlinker.domain.dto.InternshipDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import com.gsg.paltechlinker.mappers.Mapper;
import com.gsg.paltechlinker.services.CompanyService;
import com.gsg.paltechlinker.services.InternshipService;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/interns")
public class InternshipController {

    private InternshipService internshipService;
    private CompanyService companyService;
    private Mapper<InternshipEntity, InternshipDto> mapper;


    public InternshipController(InternshipService internshipService, CompanyService companyService, Mapper<InternshipEntity, InternshipDto> mapper) {
        this.internshipService = internshipService;
        this.companyService = companyService;
        this.mapper = mapper;
    }

    @PostMapping("/create")
    public ResponseEntity<InternshipDto> create(@RequestBody InternshipDto internshipDto) {
        InternshipEntity internshipEntity = mapper.mapFrom(internshipDto);
        Optional<CompanyEntity> companyEntity = companyService.findOne(internshipDto.getCompany().getId());
        internshipEntity.setCompany(companyEntity.get());
        InternshipEntity savedInternshipEntity = internshipService.save(internshipEntity);
        return new ResponseEntity<>(mapper.mapTo(savedInternshipEntity), HttpStatus.CREATED);
    }
    
    @GetMapping("/read/{id}")
    public ResponseEntity<InternshipDto> getInternship(@PathVariable Long id) {
        Optional<InternshipEntity> foundInternshipEntity = internshipService.findOne(id);
        return foundInternshipEntity.map(internshipEntity -> {
            return new ResponseEntity<>(mapper.mapTo(internshipEntity), HttpStatus.OK);

        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/read/all")
    public Page<InternshipDto> listInternships(Pageable pageable) {
        Page<InternshipEntity> interns = internshipService.findAll(pageable);
        return interns.map(mapper::mapTo);
    }

    @GetMapping("/read/all/company/{companyId}")
    public ResponseEntity<List<InternshipDto>> getInternshipsByCompanyId(@PathVariable Long companyId) {
        List<InternshipEntity> internships = internshipService.findByCompanyId(companyId);
        List<InternshipDto> internshipDtos = internships.stream()
            .map(mapper::mapTo)
            .toList();
        return ResponseEntity.ok(internshipDtos);
    }

    @PatchMapping("/update/partial/{id}")
    public ResponseEntity<InternshipDto> partialUpdateInternship(@PathVariable Long id, @RequestBody InternshipDto internshipDtoWithNewData) {
        if (!internshipService.isExists(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  

        InternshipEntity internshipEntityWithNewData = mapper.mapFrom(internshipDtoWithNewData);
        InternshipEntity updatedInternshipEntity = internshipService.partialUpdate(id, internshipEntityWithNewData);
        return new ResponseEntity<>(mapper.mapTo(updatedInternshipEntity), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable Long id) {
        internshipService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
