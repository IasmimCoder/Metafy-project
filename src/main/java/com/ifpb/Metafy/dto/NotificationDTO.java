package com.ifpb.Metafy.dto;

import com.ifpb.Metafy.model.Notification;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDTO {
    private Long id;
    private String title;
    private String content;
    private String notificationType;
    private String status;

    // Construtor
    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.title = notification.getTitle();
        this.content = notification.getContent();
        this.notificationType = notification.getNotificationType();
        this.status = notification.getStatus();
    }
}

