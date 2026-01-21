package crm.demo.Configutaion;

import crm.demo.Enteties.City;
import crm.demo.Enteties.CrmUser;
import crm.demo.Enteties.Customer;
//import crm.demo.Enteties.RoleEntity;
import crm.demo.Enteties.Status;
import crm.demo.Enums.RoleEnum;
import crm.demo.Repositories.*;
//import crm.demo.Repositories.RoleRepository;
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
    private final CrmUserRepository crmUserRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CitiesRepository cityRepository;
    private final BenefeciaryRepository benefeciaryRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if (statusRepository.count() == 0) {
            createIfNotExists("100", "NEW");
            createIfNotExists("101", "IN_PROGRESS");
            createIfNotExists("200", "CLOSED");
            createIfNotExists("121", "DELAYED");
            createIfNotExists("115", "POSTPONED");
            createIfNotExists("300", "COMPLETED");
            createIfNotExists("215", "ON REVIEW");
            createIfNotExists("250", "REVIEWED");
            createIfNotExists("100", "NEW");
        }

        if (cityRepository.count() == 0) {
            createCitiesIfNotExists("Chisinau");
            createCitiesIfNotExists("Balti");
            createCitiesIfNotExists("Cahul");
            createCitiesIfNotExists("Orhei");
            createCitiesIfNotExists("Floresti");
            createCitiesIfNotExists("Dandiuseni");
            createCitiesIfNotExists("Ocnita");
            createCitiesIfNotExists("Comrat");
            createCitiesIfNotExists("Ungheni");
        }

        if (!crmUserRepository.existsByLogin("admin")) {
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
            customer.setNickName("admin");


            customer.setCrmUser(adminUser);
            adminUser.setCustomer(customer);


            customerRepository.save(customer);
        }
    }

    private void createIfNotExists(String code, String displayName) {
        statusRepository.findByCode(code).orElseGet(() ->
        {
            Status s = new Status();
            s.setCode(code);
            s.setDisplayName(displayName);
            return statusRepository.save(s);
        });
    }

    private void createCitiesIfNotExists(String city){
        cityRepository.findByCity(city).orElseGet(()->
                {
                    City c = new City();
                    c.setCity(city);
                    return cityRepository.save(c);
                });
    }
}
