package crm.demo.Enteties;

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
@Table(name = "Roles")
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "crmUser_id", nullable = false)
    CrmUser crmUser;

    @Column(name="Role_Name")
    String roleName;

    @Column
    List<String> roleLevel;
    
}
