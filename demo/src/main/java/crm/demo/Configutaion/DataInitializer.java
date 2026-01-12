package crm.demo.Configutaion;

import crm.demo.Enteties.CrmUser;
import crm.demo.Enteties.Customer;
import crm.demo.Enteties.Role;
import crm.demo.Enteties.Status;
import crm.demo.Repositories.CrmUserRepository;
import crm.demo.Repositories.CustomerRepository;
import crm.demo.Repositories.RoleRepository;
import crm.demo.Repositories.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final StatusRepository statusRepository;
    private final RoleRepository roleRepository;
    private final CrmUserRepository crmUserRepository;
    private final CustomerRepository customerRepository;


    @Override
    public void run(ApplicationArguments args) throws Exception {

        Status statusNEW = new Status();
        statusNEW.setCode("100");
        statusNEW.setDisplayName("NEW");

        Status statusIN_PROGRESS = new Status();
        statusIN_PROGRESS.setCode("101");
        statusIN_PROGRESS.setDisplayName("IN_PROGRESS");

        Status statusCLOSED = new Status();
        statusCLOSED.setCode("200");
        statusCLOSED.setDisplayName("CLOSED");

        Status statusDELAYED = new Status();
        statusDELAYED.setCode("121");
        statusDELAYED.setDisplayName("DELAYED");

        Status statusPOSTPONED = new Status();
        statusPOSTPONED.setCode("115");
        statusPOSTPONED.setDisplayName("POSTPONED");

        Status statusCOMPLETED = new Status();
        statusCOMPLETED.setCode("300");
        statusCOMPLETED.setDisplayName("COMPLETED");

        Status ON_REVIEW = new Status();
        ON_REVIEW.setCode("215");
        ON_REVIEW.setDisplayName("ON REVIEW");

        Status REVIEWED = new Status();
        REVIEWED.setCode("250");
        REVIEWED.setDisplayName("REVIEWED");

        statusRepository.save(statusNEW);
        statusRepository.save(statusCLOSED);
        statusRepository.save(statusCOMPLETED);
        statusRepository.save(statusDELAYED);
        statusRepository.save(statusPOSTPONED);
        statusRepository.save(statusIN_PROGRESS);
        statusRepository.save(ON_REVIEW);
        statusRepository.save(REVIEWED);

        Role roleAdmin = new Role();
        roleAdmin.setRoleLevel(List.of("Create","Delete","View", "Manage"));
        roleAdmin.setRoleName("Admin");

        Role roleUser = new Role();
        roleUser.setRoleLevel(List.of("Create","View"));
        roleUser.setRoleName("User");

        Role roleManager = new Role();
        roleManager.setRoleLevel(List.of("Create","View", "Manage"));
        roleManager.setRoleName("Manager");

        roleRepository.save(roleAdmin);
        roleRepository.save(roleManager);
        roleRepository.save(roleUser);



        CrmUser crmUser = new CrmUser();
        crmUser.setName("Artiom");
        crmUser.setSurname("Admin");
        crmUser.setPassword("Qwerty2025");
        crmUser.setRole(roleAdmin);
        crmUser.setIsActive(true);
        crmUser.setIsBlocked(false);
        crmUser.setEmailAddress("email@mail.com");
        crmUser.setCity("Chisinau");
        crmUser.setAddress("Street Address 341");
        crmUser.setCountry("MD");
        crmUser.setPhoneNumber("+37371234321");
        crmUserRepository.save(crmUser);

        Customer customer = new Customer();

        customer.setNickName("Artiom");
        customer.setCrmUser(crmUser);

        customerRepository.save(customer);


    }
}
