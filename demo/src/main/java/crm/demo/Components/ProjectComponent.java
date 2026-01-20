package crm.demo.Components;

import crm.demo.DTOs.*;
import crm.demo.Enteties.*;
import crm.demo.Repositories.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class ProjectComponent {

    private final ProjectRepository projectRepository;
    private final CustomerRepository customerRepository;
    private final StatusRepository statusRepository;
    private final LogsRepository logsRepository;
    private final CrmUserRepository crmUserRepository;


    @GetMapping("projects")
    public List<ProjectDTO> listAllProjects() {

        return projectRepository.findAll()
                .stream()
                .map(ProjectDTO::from)
                .toList();
    }

    @GetMapping("project/{id}")
    public ProjectDTO getProjectById(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("No Project with such ID " + id));
        return ProjectDTO.from(project);
    }

    @PostMapping("project-add")
    public ProjectResponse createNewProject(@Valid @RequestBody ProjectCreationRequest projectReq, Principal principal) {
        Customer customer = customerRepository.findById(projectReq.getOwnerId())
                .orElseThrow(() -> new RuntimeException("no such id"));

        String statusCode = projectReq.getStatusCode() != null
                ? projectReq.getStatusCode()
                : "100";

        Status status = statusRepository.findByCode(statusCode)
                .orElseThrow(() ->
                        new IllegalStateException("Status not found: " + statusCode)
                );


        Project newProject = new Project();

        newProject.setProjectName(projectReq.getProjectName());
        newProject.setDeadLine(projectReq.getDeadLine());
        newProject.setProjectDescription(projectReq.getProjectDescription());
        newProject.setOwner(customer);
        newProject.setCreatorName(principal.getName());
        newProject.setCreatedOn(LocalDate.now());
        newProject.setStatus(status);
        Project savedProject = projectRepository.save(newProject);

        Logs log = new Logs();
        log.setProject(savedProject);
        log.setUser(customer);
        log.setLogDateTime(LocalDate.now());
        log.setLogText("New project created by " + customer.getNickName());
        logsRepository.save(log);

        System.out.println(projectReq);

        ProjectResponse projectResponse = new ProjectResponse(
                savedProject.getId(),
                savedProject.getProjectName(),
                savedProject.getProjectDescription(),
                savedProject.getDeadLine(),
                savedProject.getCreatedOn(),
                savedProject.getStatus().getCode(),
                savedProject.getStatus().getDisplayName(),
                customer.getId(),
                customer.getNickName()
        );
        System.out.println(projectResponse);

        return projectResponse;
    }

    @GetMapping("my/projects")
    public List<ProjectDTO> getProjectsByUser(Principal principal) {

        return projectRepository.findByOwnerNickName(principal.getName()).stream()
                .map(ProjectDTO::from)
                .toList();
    }

    @PutMapping("project-update/{id}")
    public ProjectResponse updateProject(@PathVariable Long id,
                                    @Valid @RequestBody ProjectUpdateRequest request,
                                    Principal principal) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No project with ID " + id));

        StringBuilder changes = new StringBuilder();

        // Project name
        if (request.getProjectName() != null && !request.getProjectName().isBlank()
                && !request.getProjectName().equals(project.getProjectName())) {
            changes.append("Name: ").append(project.getProjectName()).append(" -> ")
                    .append(request.getProjectName()).append("; ");
            project.setProjectName(request.getProjectName());
        }

        // Project description
        if (request.getProjectDescription() != null && !request.getProjectDescription().equals(project.getProjectDescription())) {
            changes.append("Description: ").append(project.getProjectDescription()).append(" -> ")
                    .append(request.getProjectDescription()).append("; ");
            project.setProjectDescription(request.getProjectDescription());
        }

        // Deadline
        if (request.getDeadLine() != null && !request.getDeadLine().equals(project.getDeadLine())) {
            changes.append("Deadline: ").append(project.getDeadLine()).append(" -> ")
                    .append(request.getDeadLine()).append("; ");
            project.setDeadLine(request.getDeadLine());
        }

        // Owner
        if (request.getOwnerId() != null && (project.getOwner() == null || !project.getOwner().getId().equals(request.getOwnerId()))) {
            Customer newOwner = customerRepository.findById(request.getOwnerId())
                    .orElseThrow(() -> new RuntimeException("No customer with ID " + request.getOwnerId()));
            changes.append("Owner: ").append(project.getOwner() != null ? project.getOwner().getNickName() : "null")
                    .append(" -> ").append(newOwner.getNickName()).append("; ");
            project.setOwner(newOwner);
        }

        // Status
        if (request.getStatusCode() != null && !request.getStatusCode().equals(project.getStatus().getCode())) {
            Status newStatus = statusRepository.findByCode(request.getStatusCode())
                    .orElseThrow(() -> new RuntimeException("No status with code " + request.getStatusCode()));
            changes.append("Status: ").append(project.getStatus().getDisplayName())
                    .append(" -> ").append(newStatus.getDisplayName()).append("; ");
            project.setStatus(newStatus);
        }

        Project savedProject = projectRepository.save(project);

        // Save log if changes exist
        if (changes.length() > 0) {
            Logs log = new Logs();
            log.setProject(savedProject);
            log.setUser(project.getOwner()); // owner is new owner now
            log.setLogDateTime(LocalDate.now());
            log.setLogText("Project updated: " + changes.toString());
            logsRepository.save(log);
        }

        // Return DTO
        return new ProjectResponse(
                savedProject.getId(),
                savedProject.getProjectName(),
                savedProject.getProjectDescription(),
                savedProject.getDeadLine(),
                savedProject.getCreatedOn(),
                savedProject.getStatus().getCode(),
                savedProject.getStatus().getDisplayName(),
                savedProject.getOwner().getId(),
                savedProject.getOwner().getNickName()
        );
    }


    @DeleteMapping("project-delete/{id}")
    public void deleteById(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }


}
