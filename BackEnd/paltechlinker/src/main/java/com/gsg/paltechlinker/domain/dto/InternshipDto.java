package com.gsg.paltechlinker.domain.dto;

import com.gsg.paltechlinker.domain.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InternshipDto {

    private Long id;

    private String name;

    private String applicationLink;

    private String description;

    private ApplicationStatus status;

    private CompanyDto company;
    
}
