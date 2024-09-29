package com.gsg.paltechlinker.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
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

}
