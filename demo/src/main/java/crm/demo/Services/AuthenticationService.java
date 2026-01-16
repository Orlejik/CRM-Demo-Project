package crm.demo.Services;

import crm.demo.Configutaion.SecurityConfiguration.UserAuthProvider;
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
    private final UserAuthProvider jwtService;
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

        Customer customer = new Customer();
        customer.setNickName(request.getLogin());

        var user = CrmUser.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .login(request.getLogin())
                .emailAddress(request.getEmail())
                .isActive(true)
                .isBlocked(false)
                .isAccountExpired(false)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(RoleEnum.USER)
                .customer(customer)
                .build();

        customer.setCrmUser(user);
        userService.createUser(user);

        var jwt = jwtService.generateSecretToken(user);
        return new JwtAuthenticationResponse(jwt);
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */

    public  JwtAuthenticationResponse signIn(SignInDto request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getLogin(),
                request.getPassword()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.getLogin());

        var jwt = jwtService.generateSecretToken(user);
        return new JwtAuthenticationResponse(jwt);
    }

}