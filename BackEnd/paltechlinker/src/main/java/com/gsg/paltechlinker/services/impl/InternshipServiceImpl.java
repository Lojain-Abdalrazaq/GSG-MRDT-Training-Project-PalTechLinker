package com.gsg.paltechlinker.services.impl;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import com.gsg.paltechlinker.repositories.InternshipRepository;
import com.gsg.paltechlinker.services.InternshipService;

@Service
public class InternshipServiceImpl implements InternshipService {

    private InternshipRepository internshipRepository;


    public InternshipServiceImpl(InternshipRepository internshipRepository) {
        this.internshipRepository = internshipRepository;
    }
    

    @Override
    public InternshipEntity save(InternshipEntity internshipEntity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public InternshipEntity partialUpdate(Long id, InternshipEntity internshipEntity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'partialUpdate'");
    }

    @Override
    public Optional<InternshipEntity> findOne(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findOne'");
    }

    @Override
    public Page<InternshipEntity> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public boolean isExists(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'isExists'");
    }
    
}
