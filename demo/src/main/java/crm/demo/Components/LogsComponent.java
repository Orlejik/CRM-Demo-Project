package crm.demo.Components;

import crm.demo.Enteties.Logs;
import crm.demo.Repositories.LogsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000, http://172.20.130.242:3000")
@RestController("/api/")
@RequiredArgsConstructor
public class LogsComponent {

    private final LogsRepository logsRepository;

    @GetMapping("logs")
    public List<Logs> getAllLogs(){
        return logsRepository.findAll();
    }

    @GetMapping("logs/{user_id}")
    public List<Logs> getLogsByUserId(@PathVariable Long user_id){
        return logsRepository.findByUserId(user_id);
    }

    @DeleteMapping("logs/delete")
    public void deleteLogsByIDs(List<Long> ids){
        ids.forEach(logsRepository::deleteById);
    }

    @GetMapping("logs/{project_id}")
    public List<Logs> getLogsByProjectId(@PathVariable Long project_id){
        return logsRepository.findByProjectId(project_id);
    }
}
