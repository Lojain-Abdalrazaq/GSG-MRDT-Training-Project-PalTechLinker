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
import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import com.gsg.paltechlinker.services.CompanyService;
import com.gsg.paltechlinker.services.InternshipService;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class InternshipControllerIntegrationTests {
    
    private InternshipService internshipService;
    private CompanyService companyService;
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Autowired
    public InternshipControllerIntegrationTests(MockMvc mockMvc, CompanyService companyService, InternshipService internshipService) {
        this.mockMvc = mockMvc;
        this.internshipService = internshipService;
        this.companyService = companyService;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateInternshipReturnsHttpStatus201() throws Exception {
        InternshipEntity internshipEntity = TestDataUtil.createTestInternshipEntityA();
        internshipEntity.setId(null);

        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        companyService.save(companyEntity);
        internshipEntity.setCompany(companyEntity);

        String internJson = objectMapper.writeValueAsString(internshipEntity);
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/interns/create")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateInternshipReturnsSavedInternship() throws Exception {
        InternshipEntity internshipEntity = TestDataUtil.createTestInternshipEntityA();
        internshipEntity.setId(null);
        
        CompanyEntity companyEntity = TestDataUtil.createTestCompanyEntityA();
        companyService.save(companyEntity);
        internshipEntity.setCompany(companyEntity);

        String internJson = objectMapper.writeValueAsString(internshipEntity);
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/interns/create")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value(internshipEntity.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.description").value(internshipEntity.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.applicationLink").value(internshipEntity.getApplicationLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.status").value(internshipEntity.getStatus().name())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.type").value(internshipEntity.getType().name())
        );
    }

    @Test
    public void testThatGetInternshipReturnsHttpStatus200WhenInternshipExists() throws Exception {
        InternshipEntity internshipEntity = TestDataUtil.createTestInternshipEntityA();
        InternshipEntity savedInternshipEntity = internshipService.save(internshipEntity);
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/interns/read/" + savedInternshipEntity.getId())
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatGetInternshipReturnsHttpStatus404WhenNoInternshipExists() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/interns/read/1")
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatGetInternshipReturnsInternshipIfExists() throws Exception {
        InternshipEntity internshipEntity = TestDataUtil.createTestInternshipEntityA();
        InternshipEntity savedInternshipEntity = internshipService.save(internshipEntity);
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/interns/read/" + savedInternshipEntity.getId())
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value(savedInternshipEntity.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.description").value(savedInternshipEntity.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.applicationLink").value(savedInternshipEntity.getApplicationLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.status").value(savedInternshipEntity.getStatus().name())
        );
    }

    @Test
    public void testThatListInternshipReturnsHttpStatus200() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/interns/read/all")
                    .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListInternshipReturnsListOfInternships() throws Exception {
        InternshipEntity internshipEntity = TestDataUtil.createTestInternshipEntityA();
        InternshipEntity savedInternshipEntity = internshipService.save(internshipEntity);

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/interns/read/all")
                    .contentType(MediaType.APPLICATION_JSON)
                    .param("page", "0")
                    .param("size", "10") 
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].name").value(savedInternshipEntity.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].description").value(savedInternshipEntity.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].applicationLink").value(savedInternshipEntity.getApplicationLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.content[0].status").value(savedInternshipEntity.getStatus().name())
        );
    }

    @Test
    public void testThatFullUpdateInternshipReturnsHttpStatus200WhenInternshipExists() throws Exception {
        InternshipEntity internshipEntityToBeUpdated = TestDataUtil.createTestInternshipEntityA();
        InternshipEntity internshipEntityWithNewData = TestDataUtil.createTestInternshipEntityB();

        internshipService.save(internshipEntityToBeUpdated);

        String internJson = objectMapper.writeValueAsString(internshipEntityWithNewData);

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/interns/update/" + internshipEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatFullUpdateInternshipReturnsHttpStatus404WhenNoInternshipExists() throws Exception {
        InternshipEntity internshipEntityWithNewData = TestDataUtil.createTestInternshipEntityB();
        String internJson = objectMapper.writeValueAsString(internshipEntityWithNewData);

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/interns/update/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateInternshipUpdatesExistingAuthor() throws Exception {
        InternshipEntity internshipEntityToBeUpdated = TestDataUtil.createTestInternshipEntityA();
        InternshipEntity internshipEntityWithNewData = TestDataUtil.createTestInternshipEntityB();

        internshipService.save(internshipEntityToBeUpdated);

        String internJson = objectMapper.writeValueAsString(internshipEntityWithNewData);

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/interns/update/" + internshipEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value(internshipEntityWithNewData.getName())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.description").value(internshipEntityWithNewData.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.applicationLink").value(internshipEntityWithNewData.getApplicationLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.status").value(internshipEntityWithNewData.getStatus().name())
        );
    }

    @Test
    public void testThatPartialUpdateInternshipReturnsHttpStatus200WhenInternshipExists() throws Exception {
        InternshipEntity internshipEntityToBeUpdated = TestDataUtil.createTestInternshipEntityA();
        internshipService.save(internshipEntityToBeUpdated);

        internshipEntityToBeUpdated.setName("UPDATED");
        String internJson = objectMapper.writeValueAsString(internshipEntityToBeUpdated);

        mockMvc.perform(
            MockMvcRequestBuilders.patch("/api/interns/update/partial/" + internshipEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatPartialUpdateInternshipReturnsHttpStatus404WhenNoInternshipExists() throws Exception {
        InternshipEntity internshipEntityWithNewData = TestDataUtil.createTestInternshipEntityB();
        String internJson = objectMapper.writeValueAsString(internshipEntityWithNewData);

        mockMvc.perform(
            MockMvcRequestBuilders.patch("/api/interns/update/partial/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatPartialUpdateInternshipUpdatesExistingInternshipName() throws Exception {
        InternshipEntity internshipEntityToBeUpdated = TestDataUtil.createTestInternshipEntityA();
        internshipService.save(internshipEntityToBeUpdated);

        internshipEntityToBeUpdated.setName("UPDATED");
        String internJson = objectMapper.writeValueAsString(internshipEntityToBeUpdated);

        mockMvc.perform(
            MockMvcRequestBuilders.patch("/api/interns/update/partial/" + internshipEntityToBeUpdated.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(internJson)
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.id").isNumber()
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.name").value("UPDATED")
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.description").value(internshipEntityToBeUpdated.getDescription())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.applicationLink").value(internshipEntityToBeUpdated.getApplicationLink())
        ).andExpect(
            MockMvcResultMatchers.jsonPath("$.status").value(internshipEntityToBeUpdated.getStatus().name())
        );
    }

    @Test
    public void testThatDeleteInternshipReturnsHttpStatus204ForExistingInternship() throws Exception {
        InternshipEntity internshipEntity = TestDataUtil.createTestInternshipEntityA();
        InternshipEntity savedInternshipEntity = internshipService.save(internshipEntity);
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/interns/delete/" + savedInternshipEntity.getId())
            .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isNoContent()
        );
    }

    @Test
    public void testThatDeleteInternshipReturnsHttpStatus204ForNonExistingInternship() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/interns/delete/111")
            .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
            MockMvcResultMatchers.status().isNoContent()
        );
    }

}
