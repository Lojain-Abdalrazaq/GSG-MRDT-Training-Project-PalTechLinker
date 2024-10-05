package com.gsg.paltechlinker.controllers;

import com.gsg.paltechlinker.domain.dto.CompanyDto;
import com.gsg.paltechlinker.domain.dto.LoginDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.services.CompanyService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final CompanyService companyService;

    public AuthController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto, HttpServletRequest request) {
        // Authenticate the company using the provided email and password
        Optional<CompanyEntity> companyEntity = companyService.authenticate(loginDto.getEmail(), loginDto.getPassword());

        if (companyEntity.isPresent()) {
            // Save the company ID in the session
            request.getSession().setAttribute("company_id", companyEntity.get().getId());
            // Return a success message
            return new ResponseEntity<>("Login successful.", HttpStatus.OK); // 200 OK
        } else {
            return new ResponseEntity<>("Invalid email or password.", HttpStatus.UNAUTHORIZED); // 401 Unauthorized
        }
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate(); // Invalidate the session
        return new ResponseEntity<>("Logout successful.", HttpStatus.OK);
    }

}
