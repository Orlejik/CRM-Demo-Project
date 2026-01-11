package crm.demo.Enteties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Data
@Setter
@Entity
@Table(name = "Status")
@AllArgsConstructor
@NoArgsConstructor
public class Status {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true,  nullable = false)
    String code;

    @Column
    String displayName;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_status")
    List<Project> project;
}
