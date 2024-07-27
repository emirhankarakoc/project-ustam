package com.karakoc.ustam.utilities.socketio.config;


import com.corundumstudio.socketio.SocketIOServer;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class StartupConfig implements CommandLineRunner {


    private final SocketIOServer socketIOServer; // beanini olusturup setlemelerini yaptik.
    @Override
    public void run(String... args) throws Exception {

        socketIOServer.start();
    }
}
