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
    public Optional<CompanyEntity> findOne(Long id) {
        return companyRepository.findById(id);
    }
    
    @Override
    public Page<CompanyEntity> findAll(Pageable pageable) {
        return companyRepository.findAll(pageable);
    }

    @Override
    public boolean isExists(Long id) {
        return companyRepository.existsById(id);
    }

    @Override
    public boolean isEmailExists(String email) {
        Optional<CompanyEntity> companyEntity = companyRepository.findByEmail(email);
        return companyEntity.isPresent();  // it will returns true if a company with the given email exists
    }

    // implementing the Login logic
    @Override
    public Optional<CompanyEntity> authenticate(String email, String password) {
        Optional<CompanyEntity> company = companyRepository.findByEmail(email);
        if (company.isPresent() && company.get().getPassword().equals(password)) {
            return company;
        }
        return Optional.empty();
    }
}
