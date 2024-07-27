package com.karakoc.ustam.utilities.socketio.socket;


import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.karakoc.ustam.utilities.socketio.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketModule
{

    private final SocketIOServer socketIOServer;


    public SocketModule(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
        socketIOServer.addConnectListener(onConnected());
        socketIOServer.addDisconnectListener(onDisconnected());
        //socketIOServer.addEventListener(); buraya new offer event tetikleyecegiz.
        socketIOServer.addEventListener("send_message", Message.class, onMessageReceived());
    }

    private ConnectListener onConnected(){
        return client -> log.info("Socket ID Connected: " + client.getSessionId().toString());
    }
    private DisconnectListener onDisconnected(){
        return client -> log.info("Socket ID Disconnected: " + client.getSessionId().toString());

    }

    private DataListener<Message> onMessageReceived(){
        return  (senderClient,data,sender)->{
            log.info(data.getText().toString() + " tarafindan " + senderClient.getSessionId());
            senderClient.getNamespace().getBroadcastOperations().sendEvent("get_message",data);
        };

    }
    public void broadcastIdentifyCard(String userId, String imageUrl) {
        Message message = new Message();
        message.setText("User " + userId + " uploaded an identify card: " + imageUrl);
        socketIOServer.getBroadcastOperations().sendEvent("get_idcard", message);
    }
    public void broadcastNewUser(String userId) {
        Message message = new Message();
        message.setText("User created:" + userId + ".");
        socketIOServer.getBroadcastOperations().sendEvent("get_newuser", message);
    }
    public void sendMessageToUser(String userId,String message) {
        Message message2 = new Message();
        message2.setText(message);
        socketIOServer.getBroadcastOperations().sendEvent(userId, message2);
    }




}

