package crm.demo.Enteties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Data
@Setter
@Entity
@Table(name = "customer")
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = false)
    @NotBlank
    String nickName;

    @ManyToOne
    @JoinColumn(name = "project_id")
    List<Project> project;

    @ManyToOne(fetch = FetchType.LAZY, optional=false)
    @JoinColumn(name="log_id")
    List<Logs> userLogs;
}
