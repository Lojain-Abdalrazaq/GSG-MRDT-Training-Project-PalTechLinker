package com.gsg.paltechlinker.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;

import java.util.Optional;

@Repository
public interface CompanyRepository extends CrudRepository<CompanyEntity, Long>,
                                            PagingAndSortingRepository<CompanyEntity, Long> {
    // for company's email
    Optional<CompanyEntity> findByEmail(String email);
}
