package crm.demo.Services;

//import crm.demo.Configutaion.SecurityConfiguration.UserAuthProvider;
import crm.demo.DTOs.SecurityDTOs.JwtAuthenticationResponse;
import crm.demo.DTOs.SecurityDTOs.SignInDto;
import crm.demo.DTOs.SecurityDTOs.SignUpDto;
import crm.demo.Enteties.CrmUser;
import crm.demo.Enteties.Customer;
import crm.demo.Enums.RoleEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    /**
     * Регистрация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    @Transactional
    public JwtAuthenticationResponse signUp(SignUpDto request){

        if (userService.existsByLogin(request.getLogin())) {
            throw new RuntimeException("User with this login already exists");
        }

        Customer customer = new Customer();
        customer.setNickName(request.getLogin());

        CrmUser user = CrmUser.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .login(request.getLogin())
                .emailAddress(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .isBlocked(false)
                .isAccountExpired(false)
                .role(RoleEnum.USER)
                .customer(customer)
                .build();

        customer.setCrmUser(user);
        userService.createUser(user);

        String token = jwtService.generateAccessToken(user);
        return new JwtAuthenticationResponse(token);
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */

    public  JwtAuthenticationResponse signIn(SignInDto request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );

        CrmUser user = (CrmUser) userService
                .userDetailsService()
                .loadUserByUsername(request.getLogin());

        String token = jwtService.generateAccessToken(user);
        return new JwtAuthenticationResponse(token);
    }

}