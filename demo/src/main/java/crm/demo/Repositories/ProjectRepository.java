package crm.demo.Repositories;

import crm.demo.Enteties.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import crm.demo.Enteties.Project;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{

    List<Project> findByOwnerId(Long id);

}
