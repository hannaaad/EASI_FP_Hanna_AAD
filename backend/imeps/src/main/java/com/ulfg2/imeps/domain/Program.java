package com.ulfg2.imeps.domain;

import java.time.LocalDate;

public record Program(int id,
                      String description,
                      String department,
                      String type,
                      LocalDate submissionDueDate,
                      String academicYear,
                      University university) {}