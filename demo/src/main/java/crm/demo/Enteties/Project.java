package crm.demo.Enteties;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Data
@Setter
@Entity
@Table(name = "Project")
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column
    String projectName;

    @Column
    LocalDateTime deadLine;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    Customer owner;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    Status status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "crmUser_id", nullable = false)
    List<ProjectMessages> messagesList;
}
