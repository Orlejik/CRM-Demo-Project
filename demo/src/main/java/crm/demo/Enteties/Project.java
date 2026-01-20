package crm.demo.Enteties;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonFormat(pattern = "MM-dd-yyyy")
    LocalDate deadLine;

    @Column
    String projectDescription;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate createdOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    Customer owner;

    @Column
    String creatorName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    @JsonIgnore
    List<ProjectMessages> messagesList;
}
