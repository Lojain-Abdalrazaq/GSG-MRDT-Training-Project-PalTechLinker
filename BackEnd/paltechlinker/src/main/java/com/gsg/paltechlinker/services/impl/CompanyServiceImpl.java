package com.gsg.paltechlinker.services.impl;

import org.springframework.stereotype.Service;
import com.gsg.paltechlinker.repositories.CompanyRepository;
import com.gsg.paltechlinker.services.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {

    private CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
    
}
