package com.gsg.paltechlinker.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import jakarta.transaction.Transactional;

@Repository
public interface InternshipRepository extends CrudRepository<InternshipEntity, Long>,
                                            PagingAndSortingRepository<InternshipEntity, Long> {    

    List<InternshipEntity> findByCompanyId(Long companyId);

    @Transactional
    void deleteByCompanyId(Long companyId);

}
