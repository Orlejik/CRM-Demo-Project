package crm.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import crm.demo.Enteties.CrmUser;

import java.io.ObjectInputFilter;

@Repository
public interface CrmUserRepository extends JpaRepository<CrmUser, Long>{
}
