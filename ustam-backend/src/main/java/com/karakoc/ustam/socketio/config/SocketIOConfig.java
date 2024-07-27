package com.karakoc.ustam.socketio.config;


import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SocketIOConfig {
    @Value("${socket-server.port}") //8085
    private int port;
    @Value("${socket-server.host}") // ipconfig yazip makinenin local ipsini verdik.
    private String host;


    @Bean
    public SocketIOServer socketIOServer(){
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(host);
        config.setPort(port);

        return new SocketIOServer(config);
    }

}
