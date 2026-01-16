package crm.demo.DTOs;

public record CurrentUserDTO(
        Long id,
        String login,
        String firstName,
        String lastName,
        String role,
        CustomerDTO customerDTO
) {
}
