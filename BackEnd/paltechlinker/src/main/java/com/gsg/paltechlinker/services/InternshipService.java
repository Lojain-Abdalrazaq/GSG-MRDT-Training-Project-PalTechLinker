package com.gsg.paltechlinker.services;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gsg.paltechlinker.domain.entities.InternshipEntity;

public interface InternshipService {
    
    InternshipEntity save(InternshipEntity internshipEntity);

    InternshipEntity partialUpdate(Long id, InternshipEntity internshipEntity);

    Optional<InternshipEntity> findOne(Long id);

    Page<InternshipEntity> findAll(Pageable pageable);

    void delete(Long id);

    boolean isExists(Long id);

    List<InternshipEntity> findByCompanyId(Long companyId);
}
