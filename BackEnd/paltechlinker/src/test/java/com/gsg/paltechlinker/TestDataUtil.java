package com.gsg.paltechlinker;

import com.gsg.paltechlinker.domain.dto.CompanyDto;
import com.gsg.paltechlinker.domain.dto.InternshipDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import com.gsg.paltechlinker.domain.enums.ApplicationStatus;
import com.gsg.paltechlinker.domain.enums.InternshipType;

public class TestDataUtil {

    private TestDataUtil() {}

    public static CompanyEntity createTestCompanyEntityA() {
        return CompanyEntity.builder()
                .id(1L)
                .name("Tech Solutions")
                .email("info@techsolutions.com")
                .password("hashed_password_123")  // Use a mock hashed password
                .address("123 Tech Park, Silicon Valley, CA")
                .description("Leading company in tech innovations.")
                .websiteLink("https://www.techsolutions.com")
                .phoneNumber("+1234567890")
                .contactEmail("contact@techsolutions.com")
                .imageUrl("https://www.techsolutions.com/logo.png")
                .numberOfEmployees(250)
                .socialAccount("https://www.linkedin.com/company/tech-solutions")
                .build();
    }
    
    public static CompanyEntity createTestCompanyEntityB() {
        return CompanyEntity.builder()
                .id(2L)
                .name("Innovate Corp")
                .email("contact@innovatecorp.com")
                .password("hashed_password_456")  // Another mock hashed password
                .address("456 Innovation Street, New York, NY")
                .description("Innovate Corp is revolutionizing the AI industry.")
                .websiteLink("https://www.innovatecorp.com")
                .phoneNumber("+1987654321")
                .contactEmail("support@innovatecorp.com")
                .imageUrl("https://www.innovatecorp.com/logo.png")
                .numberOfEmployees(500)
                .socialAccount("https://www.twitter.com/innovatecorp")
                .build();
    }    
    
    public static CompanyDto createTestCompanyDtoA() {
        return CompanyDto.builder()
                .id(1L)
                .name("Tech Solutions")
                .email("info@techsolutions.com")
                .password("hashed_password_123")  // Use a mock hashed password
                .address("123 Tech Park, Silicon Valley, CA")
                .description("Leading company in tech innovations.")
                .websiteLink("https://www.techsolutions.com")
                .phoneNumber("+1234567890")
                .contactEmail("contact@techsolutions.com")
                .imageUrl("https://www.techsolutions.com/logo.png")
                .numberOfEmployees(250)
                .socialAccount("https://www.linkedin.com/company/tech-solutions")
                .build();
    }

    public static CompanyDto createTestCompanyDtoB() {
        return CompanyDto.builder()
                .id(2L)
                .name("Innovate Corp")
                .email("contact@innovatecorp.com")
                .password("hashed_password_456")  // Another mock hashed password
                .address("456 Innovation Street, New York, NY")
                .description("Innovate Corp is revolutionizing the AI industry.")
                .websiteLink("https://www.innovatecorp.com")
                .phoneNumber("+1987654321")
                .contactEmail("support@innovatecorp.com")
                .imageUrl("https://www.innovatecorp.com/logo.png")
                .numberOfEmployees(500)
                .socialAccount("https://www.twitter.com/innovatecorp")
                .build();
    }    

    public static InternshipEntity createTestInternshipEntityA() {
        return InternshipEntity.builder()
                .id(1L)  
                .name("AI Research Internship")
                .applicationLink("https://www.innovatecorp.com/internship/apply")
                .description("This internship offers hands-on experience in AI research and development.")
                .status(ApplicationStatus.OPEN_FOR_APPLICATION)
                .type(InternshipType.HYBRID)
                .company(null)
                .build();
    }

    public static InternshipEntity createTestInternshipEntityB() {
        return InternshipEntity.builder()
                .id(2L) 
                .name("Software Development Internship")
                .applicationLink("https://www.innovatecorp.com/software-internship/apply")
                .description("Join us to develop innovative software solutions with cutting-edge technologies.")
                .status(ApplicationStatus.CANCELED) 
                .type(InternshipType.ONLINE)
                .company(null)
                .build();
    }
    
    public static InternshipDto createTestInternshipDtoA() {
        return InternshipDto.builder()
                .id(1L) 
                .name("AI Research Internship")
                .applicationLink("https://www.innovatecorp.com/internship/apply")
                .description("This internship offers hands-on experience in AI research and development.")
                .status(ApplicationStatus.OPEN_FOR_APPLICATION)
                .type(InternshipType.HYBRID)
                .company(null)
                .build();
    }

    public static InternshipDto createTestInternshipDtoB() {
        return InternshipDto.builder()
                .id(2L)  
                .name("Software Development Internship")
                .applicationLink("https://www.innovatecorp.com/software-internship/apply")
                .description("Join us to develop innovative software solutions with cutting-edge technologies.")
                .status(ApplicationStatus.CANCELED) 
                .type(InternshipType.ONLINE)
                .company(null)
                .build();
    }

}
