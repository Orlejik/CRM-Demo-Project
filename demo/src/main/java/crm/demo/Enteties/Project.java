package crm.demo.Enteties;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @Column
    String projectDescription;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdOn;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    Customer owner;

    @Column
    String creatorName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    List<ProjectMessages> messagesList;
}
