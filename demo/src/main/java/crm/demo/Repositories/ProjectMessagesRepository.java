package crm.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import crm.demo.Enteties.ProjectMessages;

@Repository
public interface ProjectMessagesRepository extends JpaRepository<ProjectMessages, Long>{
    
}
