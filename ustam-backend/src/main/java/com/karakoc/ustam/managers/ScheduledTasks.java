package com.karakoc.ustam.managers;

import com.karakoc.ustam.mailservice.MailService;
import com.karakoc.ustam.socketio.model.CardStatus;
import com.karakoc.ustam.socketio.model.IdCard;
import com.karakoc.ustam.socketio.model.IdCardRepository;
import com.karakoc.ustam.user.Roles;
import com.karakoc.ustam.user.User;
import com.karakoc.ustam.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class ScheduledTasks {

    private final UserRepository userRepository;
    private final IdCardRepository idCardRepository;
    private final MailService mailService;

    // Her 3 saatte bir çalışacak metod
    @Scheduled(cron = "0 0 */3 * * *")
    public void runEveryThreeHours() {

        List<IdCard> cards = idCardRepository.findAllByStatus(CardStatus.PENDING);
        if (cards.size()>0){
            List<User> admins = userRepository.findAllByRole(Roles.ROLE_ADMIN.toString());
            for (User admin: admins){
                mailService.sendMail(admin.getEmail(),"Pending ID Cards are waiting you !", "Hello, there is " + cards.size() + " id cards waiting for your desicion.!");
            }
        }

    }
}
