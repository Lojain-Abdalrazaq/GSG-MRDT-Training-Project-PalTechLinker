package com.gsg.paltechlinker.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gsg.paltechlinker.TestDataUtil;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.services.CompanyService;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class CompanyControllerIntegrationTests {
    
    private CompanyService companyService;
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Autowired
    public CompanyControllerIntegrationTests(MockMvc mockMvc, CompanyService companyService) {
        this.mockMvc = mockMvc;
        this.companyService = companyService;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateCompanyReturnsHttpStatus201Created() throws Exception {
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        companyEntity.setId(null);
        String companyJson = objectMapper.writeValueAsString(companyEntity);
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/companies/create")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateCompanyReturnsSavedCompany() throws Exception {
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        companyEntity.setId(null);
        String companyJson = objectMapper.writeValueAsString(companyEntity);
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/companies/create")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value(companyEntity.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.email").value(companyEntity.getEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.password").value(companyEntity.getPassword())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.address").value(companyEntity.getAddress())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.description").value(companyEntity.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.websiteLink").value(companyEntity.getWebsiteLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.phoneNumber").value(companyEntity.getPhoneNumber())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.contactEmail").value(companyEntity.getContactEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.numberOfEmployees").value(companyEntity.getNumberOfEmployees())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.socialAccount").value(companyEntity.getSocialAccount())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.imageUrl").value(companyEntity.getImageUrl())
        );
    }

    @Test
    public void testThatListCompaniesReturnsHttpStatus200Ok() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/companies/read/all")
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListCompanyReturnsListOfCompanies() throws Exception {
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        CompanyEntity savedCompany = companyService.save(companyEntity);

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/companies/read/all")
                    .contentType(MediaType.APPLICATION_JSON)
                    .param("page", "0")
                    .param("size", "10") 
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].name").value(savedCompany.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].email").value(savedCompany.getEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].password").value(savedCompany.getPassword())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].address").value(savedCompany.getAddress())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].description").value(savedCompany.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].websiteLink").value(savedCompany.getWebsiteLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].phoneNumber").value(savedCompany.getPhoneNumber())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].contactEmail").value(savedCompany.getContactEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].numberOfEmployees").value(savedCompany.getNumberOfEmployees())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].socialAccount").value(savedCompany.getSocialAccount())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].imageUrl").value(savedCompany.getImageUrl())
        );
    }

    @Test
    public void testThatGetCompanyReturnsHttpStatus200WhenCompanyExists() throws Exception {
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        CompanyEntity savedCompany = companyService.save(companyEntity);

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/companies/read/" + savedCompany.getId())
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatGetCompanyReturnsHttpStatus494WhenNoCompanyExists() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/companies/read/99")
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatGetCompanyReturnsCompanyIfExists() throws Exception {
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        CompanyEntity savedCompany = companyService.save(companyEntity);

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/companies/read/" + savedCompany.getId())
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value(savedCompany.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.email").value(savedCompany.getEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.password").value(savedCompany.getPassword())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.address").value(savedCompany.getAddress())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.description").value(savedCompany.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.websiteLink").value(savedCompany.getWebsiteLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.phoneNumber").value(savedCompany.getPhoneNumber())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.contactEmail").value(savedCompany.getContactEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.numberOfEmployees").value(savedCompany.getNumberOfEmployees())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.socialAccount").value(savedCompany.getSocialAccount())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.imageUrl").value(savedCompany.getImageUrl())
        );
    }

    @Test
    public void testThatFullUpdateCompanyReturnsHttpStatus200WhenCompanyExists() throws Exception {
        CompanyEntity companyEntityToBeUpdated = TestDataUtil.createTestCompanyEntityA();
        CompanyEntity companyEntityWithNewData = TestDataUtil.createTestCompanyEntityB();

        companyService.save(companyEntityToBeUpdated);

        companyEntityWithNewData.setId(companyEntityToBeUpdated.getId());
        String companyJson = objectMapper.writeValueAsString(companyEntityWithNewData);

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/companies/update/" + companyEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatFullUpdateCompanyReturnsHttpStatus404WhenNoCompanyExists() throws Exception {
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        String companyJson = objectMapper.writeValueAsString(companyEntity);

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/companies/update/111")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateCompanyUpdatesExistingCompany() throws Exception {
        CompanyEntity companyEntityToBeUpdated = TestDataUtil.createTestCompanyEntityA();
        CompanyEntity companyEntityWithNewData = TestDataUtil.createTestCompanyEntityB();

        companyService.save(companyEntityToBeUpdated);

        companyEntityWithNewData.setId(companyEntityToBeUpdated.getId());
        String companyJson = objectMapper.writeValueAsString(companyEntityWithNewData);

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/companies/update/" + companyEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value(companyEntityWithNewData.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.email").value(companyEntityWithNewData.getEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.password").value(companyEntityWithNewData.getPassword())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.address").value(companyEntityWithNewData.getAddress())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.description").value(companyEntityWithNewData.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.websiteLink").value(companyEntityWithNewData.getWebsiteLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.phoneNumber").value(companyEntityWithNewData.getPhoneNumber())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.contactEmail").value(companyEntityWithNewData.getContactEmail())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.numberOfEmployees").value(companyEntityWithNewData.getNumberOfEmployees())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.socialAccount").value(companyEntityWithNewData.getSocialAccount())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.imageUrl").value(companyEntityWithNewData.getImageUrl())
        );
    }

    @Test
    public void testThatPartialUpdateReturnsHttpStatus200WhenCompanyExists() throws Exception {
        CompanyEntity companyEntityToBeUpdated = TestDataUtil.createTestCompanyEntityA();
        companyService.save(companyEntityToBeUpdated);

        companyEntityToBeUpdated.setName("updated");

        String companyJson = objectMapper.writeValueAsString(companyEntityToBeUpdated);

        mockMvc.perform(
            MockMvcRequestBuilders.patch("/api/companies/update/partial/" + companyEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatPartialUpdateReturnsHttpStatus404WhenNoCompanyExists() throws Exception {
        CompanyEntity companyEntityToBeUpdated = TestDataUtil.createTestCompanyEntityA();
        String companyJson = objectMapper.writeValueAsString(companyEntityToBeUpdated);

        mockMvc.perform(
            MockMvcRequestBuilders.patch("/api/companies/update/partial/" + companyEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatPartialUpdateUpdatesExistingCompany() throws Exception {
        CompanyEntity companyEntityToBeUpdated = TestDataUtil.createTestCompanyEntityA();
        companyService.save(companyEntityToBeUpdated);

        companyEntityToBeUpdated.setName("updated");

        String companyJson = objectMapper.writeValueAsString(companyEntityToBeUpdated);

        mockMvc.perform(
            MockMvcRequestBuilders.patch("/api/companies/update/partial/" + companyEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(companyJson)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value(companyEntityToBeUpdated.getName())
        );
    }

    @Test
    public void testThatDeleteCompanyReturnsHttpStatus204ForExistingCompany() throws Exception {
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        CompanyEntity savedCompany = companyService.save(companyEntity);

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/companies/delete/" + savedCompany.getId())
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isNoContent()
        );
    }

    @Test
    public void testThatDeleteCompanyReturnsHttpStatus204ForNonExistingCompany() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/companies/delete/1")
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isNoContent()
        );
    }
}
