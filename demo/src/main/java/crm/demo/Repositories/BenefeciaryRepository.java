package crm.demo.Repositories;

import crm.demo.Enteties.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BenefeciaryRepository extends JpaRepository<Beneficiary, Long> {
}
