package com.gsg.paltechlinker.services.impl;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.repositories.CompanyRepository;
import com.gsg.paltechlinker.services.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {

    private CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public CompanyEntity save(CompanyEntity companyEntity) {
        return companyRepository.save(companyEntity);
    }

    @Override
    public CompanyEntity partialUpdate(Long id, CompanyEntity companyNewData) {
        return companyRepository.findById(id).map(storedCompany -> {
            Optional.ofNullable(companyNewData.getName()).ifPresent(storedCompany::setName);
            Optional.ofNullable(companyNewData.getAddress()).ifPresent(storedCompany::setAddress);
            Optional.ofNullable(companyNewData.getDescription()).ifPresent(storedCompany::setDescription);
            Optional.ofNullable(companyNewData.getWebsiteLink()).ifPresent(storedCompany::setWebsiteLink);
            Optional.ofNullable(companyNewData.getPhoneNumber()).ifPresent(storedCompany::setPhoneNumber);
            Optional.ofNullable(companyNewData.getContactEmail()).ifPresent(storedCompany::setContactEmail);
            Optional.ofNullable(companyNewData.getImageUrl()).ifPresent(storedCompany::setImageUrl);
            Optional.ofNullable(companyNewData.getNumberOfEmployees()).ifPresent(storedCompany::setNumberOfEmployees);
            Optional.ofNullable(companyNewData.getSocialAccount()).ifPresent(storedCompany::setSocialAccount);
            return companyRepository.save(storedCompany);
        }).orElseThrow(() -> new RuntimeException("Company doesn't exist"));
    }

    @Override
    public void delete(Long id) {
        companyRepository.deleteById(id);
    }

    @Override
    public Page<CompanyEntity> findAll(Pageable pageable) {
        return companyRepository.findAll(pageable);
    }
    
}
