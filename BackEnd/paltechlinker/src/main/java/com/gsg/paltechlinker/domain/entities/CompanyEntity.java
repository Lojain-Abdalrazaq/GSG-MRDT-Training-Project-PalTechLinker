package com.gsg.paltechlinker.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "company")
public class CompanyEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "companies_seq")
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;  // Store hashed password

    @Column(length = 255)
    private String address;

    @Column(length = 500)
    private String description;

    @Column(name = "website_link", length = 255)
    private String websiteLink;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "number_of_employees")
    private Integer numberOfEmployees;

    @Column(name = "social_account")
    private String socialAccount;
}
