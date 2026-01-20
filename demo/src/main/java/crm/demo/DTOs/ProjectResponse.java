package crm.demo.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ProjectResponse {
    private Long id;
    private String projectName;
    private String projectDescription;
    private LocalDate deadLine;
    private LocalDate createdOn;
    private String statusCode;
    private String statusName;
    private Long ownerId;
    private String ownerName;
}
