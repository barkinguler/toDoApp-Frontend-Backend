package com.example.toDoappServer.Service;

import com.example.toDoappServer.Entity.ModelAdmin;
import com.example.toDoappServer.Entity.ModelAuth;
import com.example.toDoappServer.Entity.ModelDate;
import com.example.toDoappServer.Entity.ModelEntity;

import com.example.toDoappServer.Filter.TokenInformation;
import com.example.toDoappServer.Repository.AuthRepository;
import com.example.toDoappServer.Repository.TodoAppRepository;

import com.example.toDoappServer.ToDoappServerApplication;
import com.example.toDoappServer.configuration.SocketHandler;
import com.google.gson.Gson;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class WorkService {
    @Autowired
    private ToDoappServerApplication toDoappServerApplication;
    @Autowired
    private TodoAppRepository todoAppRepository;
    @Autowired
    private com.example.toDoappServer.Repository.DateRepository DateRepository;
    @Autowired
    private AuthRepository authRepository;


    public List<ModelDate> getEntity(int id) {
        return authRepository.findById(id).get().getDates();


    }

    public void saveEntity(ModelDate entity) {
        ModelAuth modelAuth = authRepository.findById(entity.getAuth().getId()).get();

        entity.setAuth(modelAuth);
        DateRepository.save(entity);
    }

    public void updateEntity(ModelEntity entity) throws IOException {
        ModelEntity existingentity = todoAppRepository.findById(entity.getId()).orElse(null);

        existingentity.setDone(true);

        todoAppRepository.save(existingentity);


    }

    public ModelEntity saveEntity1(ModelEntity entity) throws IOException {

        entity.setDatee(entity.getDatee());
        emitAllSessions();
        return todoAppRepository.save(entity);


    }

    public List<ModelEntity> getEntity1(Integer id) {


        return DateRepository.getOne(id).getCourses();

    }

    public void deleteDate(Integer id) {

        DateRepository.deleteById(id);

    }

    public void deleteWork(Integer id) throws IOException {

        todoAppRepository.deleteById(id);
        emitAllSessions();
    }

    public void updateNameItem(ModelEntity entity) {
        ModelEntity existingentity = todoAppRepository.findById(entity.getId()).orElse(null);

        existingentity.setWorkname(entity.getWorkname());
        todoAppRepository.save(existingentity);

    }

    public void updateNameDate(ModelEntity entity) {
        ModelEntity modelEntity = todoAppRepository.findById(entity.getId()).get();
        ModelDate modelDate = DateRepository.findById(entity.getDatee().getId()).get();

        modelEntity.setDatee(modelDate);
        todoAppRepository.save(modelEntity);

    }

    public List<ModelAuth> getAuth() {

        return authRepository.findWithQuery();
    }

    public void updateUsername(int id) {
        ModelAuth modelAuth = authRepository.findById(id).get();

        ModelDate modelDate = modelAuth.getDates().get(0);
        modelAuth.setUsername("yyy");

    }

    public TokenInformation login(ModelAuth modelAuth) throws Exception {
        TokenInformation tokenInformation = new TokenInformation();
        if (modelAuth.getPassword().equals(authRepository.findPassword(modelAuth.getUsername()).getPassword())) {
            String token = getJWTToken(modelAuth.getUsername());
            tokenInformation.setId(authRepository.findPassword(modelAuth.getUsername()).getId());
            tokenInformation.setToken(token);
            tokenInformation.setUsername(modelAuth.getUsername());
            tokenInformation.setPassword(modelAuth.getPassword());
            tokenInformation.setHumanReadableMessage("Success Login");
            return tokenInformation;
        } else
            throw new Exception();
    }

    private String getJWTToken(String username) {
        String secretKey = "mySecretKey";
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        String token = Jwts
                .builder()
                .setId("softtekJWT")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 600000))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey.getBytes()).compact();

        return "Bearer " + token;
    }

    public void signUp(ModelAuth modelAuth) throws Exception {

        if (authRepository.findPassword(modelAuth.getUsername()) == null) {
            authRepository.save(modelAuth);
            emitAllSessions();
        } else
            throw new Exception("Aynı isimde giriş");
    }

    public void updatePassword(ModelAuth modelAuth) {
        ModelAuth modelAuth1 = authRepository.findPassword(modelAuth.getUsername());
        modelAuth1.setPassword(modelAuth.getPassword());
        authRepository.save(modelAuth1);
    }

    public String emitForSingleSession() throws IOException {


        int tmp = 0;
        List<ModelAuth> modelAuths = authRepository.findAll();
        List<ModelAdmin> modelAdmins = new ArrayList<>();
        for (int i = 0; i < modelAuths.size(); i++) {

            for (int k = 0; k < modelAuths.get(i).getDates().size(); k++) {
                for (int j = 0; j < modelAuths.get(i).getDates().get(k).getCourses().size(); j++) {
                    tmp++;
                }
            }
            ModelAdmin modelAdmin = new ModelAdmin();
            modelAdmin.setUsername(modelAuths.get(i).getUsername());
            modelAdmin.setWorkvalue(tmp);
            modelAdmins.add(modelAdmin);
            tmp = 0;
        }


        return (new Gson().toJson(modelAdmins));

    }

    public void emitAllSessions() throws IOException {

        for (WebSocketSession webSocketSession : SocketHandler.sessions) {

            webSocketSession.sendMessage(new TextMessage(emitForSingleSession()));
        }


    }
}
