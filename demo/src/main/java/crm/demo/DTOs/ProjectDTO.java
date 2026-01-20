package crm.demo.DTOs;

import crm.demo.Enteties.Project;

import java.time.LocalDate;

public record ProjectDTO(
        Long id,
        String projectName,
        LocalDate deadLine,
        String projectDescription,
        LocalDate createdOn,
        String owner,
        String creatorName,
        String status
) {

//    public ProjectDTO(Long id, String projectName, Long aLong, String projectDescription, Long aLong1, String owner, LocalDate deadLine) {
//    }

    public static ProjectDTO from(Project project){
        return new ProjectDTO(
                project.getId(),
                project.getProjectName(),
                project.getDeadLine(),
                project.getProjectDescription(),
                project.getCreatedOn(),
                project.getOwner().getNickName(),
                project.getCreatorName(),
                project.getStatus().getDisplayName()
        );
    }
}
