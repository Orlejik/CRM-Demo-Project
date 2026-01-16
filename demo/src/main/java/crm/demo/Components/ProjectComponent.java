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
//@CrossOrigin(origins = "http://localhost:3000, http://172.20.130.242:3000")
//@CrossOrigin(origins = "*")
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
    public Project getProjectById(@PathVariable Long id){
        return projectRepository.findById(id).orElseThrow(()->new RuntimeException("No Project with such ID " + id));
    }

    @PostMapping("project-add")
    public ProjectResponse createNewProject(@Valid @RequestBody ProjectCreationRequest projectReq){

        Customer customer = customerRepository.findById(projectReq.getOwnerId())
                .orElseThrow(()->new RuntimeException("no such id"));
        Status status = statusRepository.findByCode(projectReq.getStatusCode());
        LocalDate projCreatedOn = LocalDate.now();

        Project newProject = new Project();
        Logs projLogs = new Logs();

        newProject.setProjectName(projectReq.getProjectName());
        newProject.setDeadLine(projectReq.getDeadLine());
        newProject.setOwner(customer);
        newProject.setProjectDescription(projectReq.getProjectDescription());
        newProject.setCreatorName(customer.getNickName());
        newProject.setCreatedOn(projCreatedOn);
        newProject.setStatus(status);

        Project savedProject = projectRepository.save(newProject);

        projLogs.setProject(savedProject);
        projLogs.setUser(customer);
        projLogs.setLogDateTime(projCreatedOn);
        projLogs.setLogText("New Project created by "+customer.getNickName());
        logsRepository.save(projLogs);

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
    public List<Project> getProjectsByUser(Principal principal){

        return projectRepository.findByOwnerNickName(principal.getName());
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
