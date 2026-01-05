package crm.demo.Components;

import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import crm.demo.Enteties.Customer;
import crm.demo.Repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class CustomerComponent {

    private final CustomerRepository customerRepository;
    
    @GetMapping("customers")
    public List<Customer> customers(){
        return customerRepository.findAll();
    }

    @GetMapping("customer/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id).orElseThrow(()->new RuntimeException("No such id "+id));
    }

    @PostMapping("/customer/add")
    public Customer postMethodName(@RequestBody Customer newCustomer) {
        return customerRepository.save(newCustomer);
    }

    @PutMapping("customer/{id}")
    public Customer editCustomer(@RequestBody Customer newCustomer, @PathVariable Long id, Principal principal) {

        Customer updatedCustomer = customerRepository.findById(id).orElseThrow(()->new RuntimeException("no customer with such ID - "+id));
        updatedCustomer.setNickName(newCustomer.getNickName());
        updatedCustomer.setProject(newCustomer.getProject());
        return customerRepository.save(updatedCustomer);
    }
    @DeleteMapping("employee/{id}/delete")
    public void deleteById(@PathVariable Long id ){
        customerRepository.deleteById(id);
    }
}
