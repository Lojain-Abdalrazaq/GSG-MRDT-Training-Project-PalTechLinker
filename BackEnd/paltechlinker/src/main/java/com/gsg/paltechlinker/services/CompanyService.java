package com.gsg.paltechlinker.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gsg.paltechlinker.domain.entities.CompanyEntity;

public interface CompanyService {
    
        CompanyEntity save(CompanyEntity companyEntity);

        CompanyEntity partialUpdate(Long id, CompanyEntity companyNewData);

        Optional<CompanyEntity> findOne(Long id);

        Page<CompanyEntity> findAll(Pageable pageable);

        void delete(Long id);

        boolean isExists(Long id);

        boolean isEmailExists(String email);

}
