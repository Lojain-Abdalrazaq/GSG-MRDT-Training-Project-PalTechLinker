package com.gsg.paltechlinker.domain.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyDto {

    private Long id;
    
    private String name;
    
    private String email;
    
    private String password;
    
    private String address;
    
    private String description;
    
    private String websiteLink;
    
    private String phoneNumber;
    
    private String contactEmail;
    
    private String imageUrl;
    
    private Integer numberOfEmployees;
    
    private String socialAccount;

}
