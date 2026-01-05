package crm.demo.Repositories;



import crm.demo.Enteties.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StatusRepository extends JpaRepository<Status, Long>{
    
}
