package com.karakoc.ustam.utilities.mailservice;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MailManager implements MailService {
    private JavaMailSender mailSender;

    @Autowired
    public MailManager(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public String sendMail(String to,String subject, String icerik) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
         try {
            helper.setFrom("shopifyemirhan6@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(icerik);
            mailSender.send(mimeMessage);
            return "Gönderildi";
        } catch (MessagingException e) {
            log.info("bir hata");
            e.printStackTrace();
            return "Hata: " + e.getMessage();
        }
    }
}
