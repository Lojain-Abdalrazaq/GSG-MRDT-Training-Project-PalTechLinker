package com.gsg.paltechlinker.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gsg.paltechlinker.domain.entities.CompanyEntity;

public interface CompanyService {
    
        CompanyEntity save(CompanyEntity companyEntity);

        CompanyEntity partialUpdate(Long id, CompanyEntity companyNewData);

        Page<CompanyEntity> findAll(Pageable pageable);

        void delete(Long id);

}
