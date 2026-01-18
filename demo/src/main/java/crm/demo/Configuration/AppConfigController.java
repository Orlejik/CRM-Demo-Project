//package crm.demo.Configuration;
//
//import crm.demo.Components.AppConfig;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping
//public class AppConfigController {
//    private AppConfig appConfig = new AppConfig();
//
//    @GetMapping
//    public AppConfig getConfig() {
//        return appConfig;
//    }
//
//    @PutMapping
//    public AppConfig updateConfig(@RequestBody AppConfig config) {
//        appConfig.setSiteName(config.getSiteName());
//        appConfig.setDefaultLanguage(config.getDefaultLanguage());
//        appConfig.setTheme(config.getTheme());
//        appConfig.setItemsPerPage(config.getItemsPerPage());
//        return appConfig;
//    }
//
//}