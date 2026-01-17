package crm.demo.DTOs;

public record CurrentUserUpdateDto(
        Long id,
        String firstName,
        String lastName,
//        String password,
        String emailAddress,
        String login,
        String address,
        String city,
        String country,
        String phoneNumber,
        Boolean isLocked,
        String role,
        Boolean isActive,
        Boolean isAccountExpired,
        CustomerDTO customerDTO
) {}
