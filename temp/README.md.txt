<H2>1. Enter in folder <b> Composes </b></H2> <br/>
       <code> cd C:\Users\artiom.oriol\Documents\JavaProj\demo\temp\Composes </code> <br/>
       <code> docker compose up -d </code> <br/>
   this will start the Docker Container with all needed data in it
<H2>2. Enter in folder with <b>Front End</b> </H2></br>
    <code> cd C:\Users\artiom.oriol\Documents\JavaProj\demo\demo\frontend </code> <br>
    <code> npm i </code> or <code> npm install </code>
    after installation complete, <br/> in same console you will have to run <code> npm start </code>
    First command will launch the installation of needed packages, which are used in App, and second will start the application. you will se the output in console
    <code>Compiled successfully!

    You can now view frontend in the browser.
    
    Local:            http://localhost:3000 <br>
    On Your Network:  http://172.20.130.34:3000 <br><br>
    Note that the development build is not optimized. <br>
    To create a production build, use npm run build.<br><br>
    webpack compiled successfully </code>

<H2>3. Enter in folder with <b>Back End</b> </H2></br>
    <code> cd C:\Users\artiom.oriol\Documents\JavaProj\demo\demo </code> <br>
    <code> mvn spring-boot:run -DskipTests </code> <br>
    
    This will start the Spring App for backend. You will se the output :
    
    <code>   INFO 21332 --- [  restartedMain] o.s.boot.tomcat.TomcatWebServer          : Tomcat started on port 8080 (http) with context path '/' <br/>
             INFO 21332 --- [  restartedMain] crm.demo.CrmDemoApplication              : Started CrmDemoApplication in 7.96 seconds (process running for 8.8) </code>