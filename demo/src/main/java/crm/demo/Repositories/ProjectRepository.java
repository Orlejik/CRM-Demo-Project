package crm.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import crm.demo.Enteties.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{
    
}
