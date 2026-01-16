package crm.demo.Components;

import crm.demo.DTOs.CurrentUserDTO;
import crm.demo.DTOs.CustomerDTO;
import crm.demo.Enteties.CrmUser;
import crm.demo.Enteties.Customer;
import crm.demo.Enteties.Project;
import crm.demo.Repositories.CrmUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000, http://172.20.130.242:3000")
@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class CRMUserComponent {
    private final CrmUserRepository userRepository;

    @GetMapping("users")
    public List<CrmUser> usersList(){
        return userRepository.findAll();
    }

    @GetMapping("users/{id}")
    public CrmUser getUserById(@PathVariable Long id){
        return userRepository.findById(id).orElseThrow(()->new RuntimeException(" There is no user with such id -  "+id));
    }
    @GetMapping("my/user")
    public CurrentUserDTO getUserByPrincipal(Authentication authentication){
         CrmUser user = userRepository.findByLogin(authentication.getName()).orElseThrow(()-> new RuntimeException("No such Login Name....."));
        Customer customer = user.getCustomer();
         return new CurrentUserDTO(
                 user.getId(),
                 user.getLogin(),
                 user.getFirstName(),
                 user.getLastName(),
                 user.getRole().name(),
                 new CustomerDTO(
                         customer.getId(),
                         customer.getNickName()
                 )
         );
    }

    @PostMapping("user-add")
    public CrmUser postNewUser(@RequestBody CrmUser newUser){
        return userRepository.save(newUser);
    }

    @PutMapping("user-edit/{id}")
    public CrmUser editUserByID(@RequestBody CrmUser newUser, @PathVariable Long id){
        CrmUser userToUpdate = userRepository.findById(id).orElseThrow(()->new RuntimeException(" There is no user with such id -  "+id));

        userToUpdate.setFirstName(newUser.getFirstName());
        userToUpdate.setLastName(newUser.getLastName());
        userToUpdate.setPassword(newUser.getPassword());
        userToUpdate.setLogin(newUser.getLogin());
        userToUpdate.setRole(newUser.getRole());
        userToUpdate.setIsActive(newUser.getIsActive());
        userToUpdate.setIsBlocked(newUser.getIsBlocked());
        userToUpdate.setEmailAddress((newUser.getEmailAddress()));
        userToUpdate.setAddress(newUser.getAddress());
        userToUpdate.setCity(newUser.getCity());
        userToUpdate.setCountry(newUser.getCountry());
        userToUpdate.setPhoneNumber(newUser.getPhoneNumber());

        return userRepository.save(userToUpdate);
    }

    @DeleteMapping("user-delete/{id}")
    public void deleteUserById(@PathVariable Long id){
        userRepository.deleteById(id);
    }
}
