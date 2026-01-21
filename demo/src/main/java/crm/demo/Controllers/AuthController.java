package crm.demo.Controllers;

import crm.demo.DTOs.SecurityDTOs.JwtAuthenticationResponse;
import crm.demo.DTOs.SecurityDTOs.SignInDto;
import crm.demo.DTOs.SecurityDTOs.SignUpDto;
import crm.demo.Enteties.CrmUser;
import crm.demo.Enteties.RefreshToken;
import crm.demo.Enums.RoleEnum;
import crm.demo.Repositories.CrmUserRepository;
import crm.demo.Services.AuthenticationService;
import crm.demo.Services.JwtService;
import crm.demo.Services.RefreshTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshService;
    private final CrmUserRepository userRepo;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> register(
            @RequestBody @Valid SignUpDto dto
    ) {
        return ResponseEntity.ok(service.signUp(dto));
    }
//    @Operation(summary = "User registration")
//    @PostMapping("/register")
//    public ResponseEntity<JwtAuthenticationResponse> signUp(@RequestBody @Valid SignUpDto request, HttpServletResponse response) {
//        if (userRepo.existsByLogin(request.getLogin())) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "Login already exists");
//        }
//
//        if (userRepo.existsByEmailAddress(request.getEmail())) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
//        }
//
//        CrmUser user = CrmUser.builder()
//                .firstName(request.getFirstName())
//                .lastName(request.getLastName())
//                .login(request.getLogin())
//                .emailAddress(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//
//                // 🔒 ЖЁСТКО ЗАДАЁМ СОСТОЯНИЕ
//                .isActive(true)
//                .isBlocked(false)
//                .isAccountExpired(false)
//
//                .role(RoleEnum.USER)
//                .build();
//
//        userRepo.save(user);
//
//        String accessToken = jwtService.generateAccessToken(user);
//        RefreshToken refreshToken = refreshTokenService.create(user);
//
//        Cookie cookie = new Cookie("refreshToken", refreshToken.getToken());
//        cookie.setHttpOnly(true);
//        cookie.setSecure(false); // true в prod
//        cookie.setPath("/auth/refresh");
//        cookie.setMaxAge(7 * 24 * 60 * 60);
//        response.addCookie(cookie);
//
//        return ResponseEntity.ok(
//                JwtAuthenticationResponse.builder()
//                        .token(accessToken)
//                        .build()
//        );
//
//    }



    @Operation(summary = "User login")
    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody @Valid SignInDto request, HttpServletResponse response) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );

        CrmUser user = (CrmUser) auth.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user);
        RefreshToken refresh = refreshService.create(user);

        Cookie cookie = new Cookie("refreshToken", refresh.getToken());
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(cookie);

        return ResponseEntity.ok(
                JwtAuthenticationResponse.builder()
                        .token(accessToken)
                        .build()
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(
            @CookieValue("refreshToken") String refreshToken
    ) {
        RefreshToken rt = refreshService.validate(refreshToken);
        String newAccess = jwtService.generateAccessToken(rt.getUser());

        return ResponseEntity.ok(
                JwtAuthenticationResponse.builder()
                        .token(newAccess)
                        .build()
        );
    }

    @PostMapping("/logout")
    public void logout(@CookieValue("refreshToken") String token,
                       HttpServletResponse response) {
        refreshService.revoke(token);

        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/auth/refresh");
        response.addCookie(cookie);
    }
}