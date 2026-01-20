package crm.demo.DTOs;

import java.time.LocalDate;

public record ProjectMessageDTO(
        Long id,
        String messageContent,
        String author,
        LocalDate messageDate
) {
}
