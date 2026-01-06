package crm.demo.Components;

import crm.demo.Enteties.Project;
import crm.demo.Repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class ProjectComponent {

    private final ProjectRepository projectRepository;

    @GetMapping("projects")
    public List<Project> listAllProjects(){
        return projectRepository.findAll();
    }

    @GetMapping("project/{id}")
    public Project getProjectById(@PathVariable Long id){
        return projectRepository.findById(id).orElseThrow(()->new RuntimeException("No Project with such ID " + id));
    }

    @PostMapping("project-add")
    public Project createNewProject(@RequestBody Project project){
        return projectRepository.save(project);
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
