package crm.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import crm.demo.Enteties.CrmUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface CrmUserRepository extends JpaRepository<CrmUser, Long>{
    Optional<CrmUser> findByLogin(String login);
    boolean existsByLogin(String login);
    boolean existsByEmailAddress(String emailAddress);

    List<CrmUser> findAll();

    CrmUser findByFirstName(String name);

}
