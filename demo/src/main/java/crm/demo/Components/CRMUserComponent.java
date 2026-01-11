package crm.demo.Components;

import crm.demo.Enteties.CrmUser;
import crm.demo.Repositories.CrmUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("user-add")
    public CrmUser postNewUser(@RequestBody CrmUser newUser){
        return userRepository.save(newUser);
    }

    @PutMapping("user-edit/{id}")
    public CrmUser editUserByID(@RequestBody CrmUser newUser, @PathVariable Long id){
        CrmUser userToUpdate = userRepository.findById(id).orElseThrow(()->new RuntimeException(" There is no user with such id -  "+id));

        userToUpdate.setName(newUser.getName());
        userToUpdate.setSurname(newUser.getSurname());
        userToUpdate.setPassword(newUser.getPassword());
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
