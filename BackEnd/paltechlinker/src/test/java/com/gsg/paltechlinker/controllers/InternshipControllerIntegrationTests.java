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
import com.gsg.paltechlinker.services.InternshipService;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class InternshipControllerIntegrationTests {
    
    private InternshipService internshipService;
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Autowired
    public InternshipControllerIntegrationTests(MockMvc mockMvc, InternshipService internshipService) {
        this.mockMvc = mockMvc;
        this.internshipService = internshipService;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateInternshipReturnsHttpStatus201() throws Exception {
        InternshipEntity internshipEntity = TestDataUtil.createTestInternshipEntityA();
        internshipEntity.setId(null);
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

}
