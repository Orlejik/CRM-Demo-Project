package crm.demo.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ProjectCreationRequest {
    private String projectName;
    private LocalDate deadLine;
    private String projectDescription;
    private Long ownerId;
    private String statusCode;
}
