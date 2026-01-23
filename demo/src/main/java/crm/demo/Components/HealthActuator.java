package crm.demo.Components;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/actuator/")
@AllArgsConstructor
public class HealthActuator {
    @GetMapping("health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
