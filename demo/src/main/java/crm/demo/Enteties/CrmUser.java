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
@Table(name = "CrmUser")
@AllArgsConstructor
@NoArgsConstructor
public class CrmUser {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @Column
    String name;
    
    @Column
    String surname;
    
    @Column
    String password;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "crmUser",
            orphanRemoval = true)
    List<Role> role;

    @Column
    Boolean isActive;

    @Column
    Boolean isBlocked;

    @Column(unique = true)
    String emailAddress;

    @Column()
    String address;

    @Column()
    String city;

    @Column()
    String country;

    @Column(unique = true)
    String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    Customer customer;
    
}
