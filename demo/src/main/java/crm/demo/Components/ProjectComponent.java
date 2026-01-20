package crm.demo.Components;

import crm.demo.DTOs.ProjectCreationRequest;
import crm.demo.DTOs.ProjectDTO;
import crm.demo.DTOs.ProjectResponse;
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
    public List<ProjectDTO> listAllProjects(){

        return  projectRepository.findAll()
                .stream()
                .map(ProjectDTO::from)
                .toList();
    }

    @GetMapping("project/{id}")
    public ProjectDTO getProjectById(@PathVariable Long id){
        Project project =  projectRepository.findById(id).orElseThrow(()->new RuntimeException("No Project with such ID " + id));
        return ProjectDTO.from(project);
    }

    @PostMapping("project-add")
    public ProjectResponse createNewProject(@Valid @RequestBody ProjectCreationRequest projectReq, Principal principal){
        Customer customer = customerRepository.findById(projectReq.getOwnerId())
                .orElseThrow(()->new RuntimeException("no such id"));

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
                customer.getId(),
                customer.getNickName()
        );

        System.out.println(projectResponse);

        return projectResponse;
    }

    @GetMapping("my/projects")
    public List<ProjectDTO> getProjectsByUser(Principal principal){

        return projectRepository.findByOwnerNickName(principal.getName()).stream()
                .map(ProjectDTO::from)
                .toList();
    }

    @PutMapping("project-update/{id}")
    public Project updateProject(@RequestBody Project newProject, @PathVariable Long id){

        Project projToUpdate = projectRepository.findById(id).orElseThrow(()->new RuntimeException("No Project with such ID " + id));

        projToUpdate.setProjectName(newProject.getProjectName());
        projToUpdate.setStatus(newProject.getStatus());
        projToUpdate.setOwner(newProject.getOwner());
        projToUpdate.setDeadLine(newProject.getDeadLine());

        return projectRepository.save(projToUpdate);

    }

    @DeleteMapping("project-delete/{id}")
    public void deleteById(@PathVariable Long id){
        projectRepository.deleteById(id);
    }


}
