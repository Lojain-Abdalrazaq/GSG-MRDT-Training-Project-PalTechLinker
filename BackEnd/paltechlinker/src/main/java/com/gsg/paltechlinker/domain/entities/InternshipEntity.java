package com.gsg.paltechlinker.domain.entities;

import com.gsg.paltechlinker.domain.enums.ApplicationStatus;

import com.gsg.paltechlinker.domain.enums.InternshipType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "internship")
public class InternshipEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "intern_seq")
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(name = "application_link", length = 255)
    private String applicationLink;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @Enumerated(EnumType.STRING)
    private InternshipType type;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "company_id")
    private CompanyEntity company;
}
