package crm.demo.Components;

import crm.demo.Enteties.ProjectMessages;
import crm.demo.Repositories.ProjectMessagesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class ProjectMessagesComponent {
    private final ProjectMessagesRepository messagesRepository;

    @GetMapping("project-messages")
    public List<ProjectMessages> getAllMessages(){
        return messagesRepository.findAll();
    }
}
