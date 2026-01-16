package crm.demo.Controllers;

import crm.demo.DTOs.SecurityDTOs.JwtAuthenticationResponse;
import crm.demo.DTOs.SecurityDTOs.SignInDto;
import crm.demo.DTOs.SecurityDTOs.SignUpDto;
import crm.demo.Services.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationService authenticationService;

    @Operation(summary = "User registration")
    @PostMapping("/register")
    public JwtAuthenticationResponse signUp(@RequestBody @Valid SignUpDto request) {
            return authenticationService.signUp(request);

    }

    @Operation(summary = "User login")
    @PostMapping("/login")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInDto request) {
            return authenticationService.signIn(request);
    }
}