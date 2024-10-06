package com.gsg.paltechlinker.services.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import com.gsg.paltechlinker.repositories.InternshipRepository;
import com.gsg.paltechlinker.services.InternshipService;

import jakarta.transaction.Transactional;

@Service
public class InternshipServiceImpl implements InternshipService {

    private InternshipRepository internshipRepository;


    public InternshipServiceImpl(InternshipRepository internshipRepository) {
        this.internshipRepository = internshipRepository;
    }


    @Override
    public InternshipEntity save(InternshipEntity internshipEntity) {
        return internshipRepository.save(internshipEntity);
    }

    @Override
    public InternshipEntity partialUpdate(Long id, InternshipEntity internshipNewData) {
        return internshipRepository.findById(id).map(storedInternship -> {
            Optional.ofNullable(internshipNewData.getName()).ifPresent(storedInternship::setName);
            Optional.ofNullable(internshipNewData.getDescription()).ifPresent(storedInternship::setDescription);
            Optional.ofNullable(internshipNewData.getApplicationLink()).ifPresent(storedInternship::setApplicationLink);
            Optional.ofNullable(internshipNewData.getStatus()).ifPresent(storedInternship::setStatus);
            Optional.ofNullable(internshipNewData.getType()).ifPresent(storedInternship::setType);
            return internshipRepository.save(storedInternship);
        }).orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    @Override
    public Optional<InternshipEntity> findOne(Long id) {
        return internshipRepository.findById(id);
    }

    @Override
    public Page<InternshipEntity> findAll(Pageable pageable) {
        return internshipRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
        internshipRepository.deleteById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return internshipRepository.existsById(id);
    }

    @Override
    public List<InternshipEntity> findByCompanyId(Long companyId) {
        return internshipRepository.findByCompanyId(companyId);
    }


    @Transactional
    @Override
    public void deleteByCompanyId(Long companyId) {
        internshipRepository.deleteByCompanyId(companyId);
    }
    
}
