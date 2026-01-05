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
@Table(name = "ProjectMessages")
@AllArgsConstructor
@NoArgsConstructor
public class ProjectMessages {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "crmUser_id", nullable = false)
    List<CrmUser> user;

    @Column(name = "message_content")
    String messageContent;
}
