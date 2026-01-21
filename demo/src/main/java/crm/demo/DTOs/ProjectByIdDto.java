package crm.demo.DTOs;

import crm.demo.Enteties.Project;

import java.time.LocalDate;

public record ProjectByIdDto(

        Long id,
        String projectName,
        String projectDescription,
        LocalDate deadLine,
        LocalDate createdOn,
        String statusCode,
        String statusName,
        Long ownerId,
        String ownerName,
        Long beneficiaryId,
        Long cityId,
        Long budget
) {
    public static ProjectByIdDto from(Project project, String requestedBy) {
        return new ProjectByIdDto(
                project.getId(),
                project.getProjectName(),
                project.getProjectDescription(),
                project.getDeadLine(),
                project.getCreatedOn(),
                project.getStatus().getCode(),
                project.getStatus().getDisplayName(),
                project.getOwner().getId(),
                project.getOwner().getNickName(),
                project.getBeneficiary().getId(),
                project.getCity().getId(),
                project.getBudget()
        );
    }
}