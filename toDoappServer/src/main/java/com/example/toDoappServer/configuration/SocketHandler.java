package com.example.toDoappServer.configuration;

import com.example.toDoappServer.Entity.ModelAdmin;
import com.example.toDoappServer.Repository.AuthRepository;
import com.example.toDoappServer.Repository.TodoAppRepository;
import com.example.toDoappServer.Service.WorkService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.*;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component

public class SocketHandler extends TextWebSocketHandler {
    @Autowired
    private TodoAppRepository todoAppRepository;
@Autowired
    private WorkService workService;
@Autowired
private AuthRepository authRepository;
 public static  List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    @Override
    public void handleTransportError(WebSocketSession session, Throwable throwable) throws Exception {
        System.out.print( "throwable.getMessage()");

    }
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {



    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        sessions.add(session);




    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        for(int i=0;i<sessions.size();i++){
            if(sessions.get(i).equals(session))
                sessions.remove(i);


        }
    }

}
