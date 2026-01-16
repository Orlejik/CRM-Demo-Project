package crm.demo.Enteties;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    @JsonManagedReference
    List<Project> project;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Logs> userLogs;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    List<ProjectMessages> messagesList;

    @OneToOne(mappedBy = "customer")
    CrmUser crmUser;

}
