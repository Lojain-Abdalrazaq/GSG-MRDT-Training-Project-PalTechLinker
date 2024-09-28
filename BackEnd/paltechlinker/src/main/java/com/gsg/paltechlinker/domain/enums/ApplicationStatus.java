package com.gsg.paltechlinker.domain.enums;

public enum ApplicationStatus {
    OPEN_FOR_APPLICATION,    // candidates can apply
    CLOSED_FOR_APPLICATION,  // application deadline has passed
    UNDER_REVIEW,            // company is reviewing the applications
    INTERVIEW_STAGE,         // company is interviewing the candidates
    OFFER_SENT,              // company has chosen candidates for this intern
    CANCELED,                // company has cancelled internship
    IN_PROGRESS,             // internship program is ongoing
    COMPLETED                // intership program is finished
}
