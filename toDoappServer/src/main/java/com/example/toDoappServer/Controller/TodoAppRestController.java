package com.example.toDoappServer.Controller;

import com.example.toDoappServer.Entity.ModelAdmin;
import com.example.toDoappServer.Entity.ModelAuth;
import com.example.toDoappServer.Entity.ModelDate;
import com.example.toDoappServer.Entity.ModelEntity;

import com.example.toDoappServer.Filter.TokenInformation;
import com.example.toDoappServer.Service.WorkService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import java.io.IOException;
import java.util.List;

@RestController

public class TodoAppRestController {


    @Autowired
    private WorkService workService;


   @CrossOrigin(origins = "*")
   @RequestMapping(method = RequestMethod.GET, path = "/get")
   public List<ModelDate> getTodoApp(@RequestParam Integer id) {

       return workService.getEntity(id);
   }



  @PostMapping(value = "/post",
          consumes = "application/json", produces = "application/json")
  public void createWork(@RequestBody ModelDate entity) throws Exception {

      workService.saveEntity(entity);


  }


    @PutMapping(value = "/update",
            consumes = "application/json", produces = "application/json")
    public void updateWork(@RequestBody ModelEntity entity) throws IllegalAccessException, IOException {
System.out.print("çalıştı");
        workService.updateEntity(entity);

    }

    @PutMapping(value = "/updateName",
            consumes = "application/json", produces = "application/json")
    public void updateWorkname(@RequestBody ModelEntity entity) throws IllegalAccessException {

        workService.updateNameItem(entity);

    }

    @PutMapping(value = "/updateDateName",
            consumes = "application/json", produces = "application/json")
    public void updateDatename(@RequestBody ModelEntity entity) throws IllegalAccessException {
        
        workService.updateNameDate(entity);

    }


    @PostMapping(value = "/post1",
            consumes = "application/json", produces = "application/json")
    public void createWork1(@RequestBody ModelEntity entity) throws IllegalAccessException, IOException {

        workService.saveEntity1(entity);

    }


    @GetMapping("/get1")
    public List<ModelEntity> getTodoApp1(@RequestParam(required = false) Integer id) throws IllegalAccessException {

        return workService.getEntity1(id);

    }

    @DeleteMapping("/delete")
    public void deleteTodoApp(@RequestParam(required = false) Integer id) throws IllegalAccessException {

         workService.deleteDate(id);

    }


    @DeleteMapping("/deletework")
    public void deleteWork(@RequestParam(required = false) Integer id) throws IllegalAccessException, IOException {

        workService.deleteWork(id);

    }
    @GetMapping("/getauth")
    public List<ModelAuth> getAuth(){
       return workService.getAuth();
    }


    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST,value = "/login",
            consumes = "application/json", produces = "application/json")
    public TokenInformation postUser1(@RequestBody ModelAuth modelAuth) throws Exception {

       return workService.login(modelAuth);
    }
    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST,value = "/signup",
            consumes = "application/json", produces = "application/json")
    public void signUp(@RequestBody ModelAuth modelAuth) throws Exception {

         workService.signUp(modelAuth);
    }
    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST,value = "/updatePassword",
            consumes = "application/json", produces = "application/json")
    public void updatePassword(@RequestBody ModelAuth modelAuth) throws Exception {

        workService.updatePassword(modelAuth);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getIstatistic"
            ,consumes = "application/json", produces = "application/json")
    public Object getIstatistic() throws IOException {

         return workService.emitForSingleSession();
    }
}
