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

    @Column
    String status;

    @OneToMany
    List<Project> project;
}
