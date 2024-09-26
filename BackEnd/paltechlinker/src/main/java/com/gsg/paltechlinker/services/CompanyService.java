package com.gsg.paltechlinker.services;

import com.gsg.paltechlinker.domain.entities.CompanyEntity;

public interface CompanyService {
    
        CompanyEntity save(CompanyEntity companyEntity);

        CompanyEntity partialUpdate(Long id, CompanyEntity companyNewData);

}
