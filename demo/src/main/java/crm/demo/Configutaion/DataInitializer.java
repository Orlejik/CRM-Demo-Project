package crm.demo.Configutaion;

import crm.demo.Enteties.CrmUser;
import crm.demo.Enteties.Customer;
//import crm.demo.Enteties.RoleEntity;
import crm.demo.Enteties.Status;
import crm.demo.Enums.RoleEnum;
import crm.demo.Repositories.CrmUserRepository;
import crm.demo.Repositories.CustomerRepository;
//import crm.demo.Repositories.RoleRepository;
import crm.demo.Repositories.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final StatusRepository statusRepository;
//    private final RoleRepository roleRepository;
    private final CrmUserRepository crmUserRepository;
    private final CustomerRepository customerRepository;
private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {

//        if(statusRepository.count()<0){
//            Status statusNEW = new Status();
//            statusNEW.setCode("100");
//            statusNEW.setDisplayName("NEW");
//
//            Status statusIN_PROGRESS = new Status();
//            statusIN_PROGRESS.setCode("101");
//            statusIN_PROGRESS.setDisplayName("IN_PROGRESS");
//
//            Status statusCLOSED = new Status();
//            statusCLOSED.setCode("200");
//            statusCLOSED.setDisplayName("CLOSED");
//
//            Status statusDELAYED = new Status();
//            statusDELAYED.setCode("121");
//            statusDELAYED.setDisplayName("DELAYED");
//
//            Status statusPOSTPONED = new Status();
//            statusPOSTPONED.setCode("115");
//            statusPOSTPONED.setDisplayName("POSTPONED");
//
//            Status statusCOMPLETED = new Status();
//            statusCOMPLETED.setCode("300");
//            statusCOMPLETED.setDisplayName("COMPLETED");
//
//            Status ON_REVIEW = new Status();
//            ON_REVIEW.setCode("215");
//            ON_REVIEW.setDisplayName("ON REVIEW");
//
//            Status REVIEWED = new Status();
//            REVIEWED.setCode("250");
//            REVIEWED.setDisplayName("REVIEWED");
//
//            statusRepository.save(statusNEW);
//            statusRepository.save(statusCLOSED);
//            statusRepository.save(statusCOMPLETED);
//            statusRepository.save(statusDELAYED);
//            statusRepository.save(statusPOSTPONED);
//            statusRepository.save(statusIN_PROGRESS);
//            statusRepository.save(ON_REVIEW);
//            statusRepository.save(REVIEWED);
//        }


        if(!crmUserRepository.existsByLogin("admin")){
            CrmUser adminUser = new CrmUser();
            adminUser.setRole(RoleEnum.ADMIN);
            adminUser.setLogin("admin");
            adminUser.setPassword(passwordEncoder.encode("admin"));
            adminUser.setFirstName("Admin");
            adminUser.setLastName("Admin");
            adminUser.setEmailAddress("admin@admin.com");
            adminUser.setIsActive(true);
            adminUser.setIsBlocked(false);
            adminUser.setIsAccountExpired(false);
            Customer customer = new Customer();
            customer.setNickName(adminUser.getLogin());
            adminUser.setCustomer(customer);

            crmUserRepository.save(adminUser);
        }
    }
}
