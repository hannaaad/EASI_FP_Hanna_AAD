package com.ulfg2.imeps.domain;

import java.time.LocalDate;

public record Convention(int id, String name, LocalDate date, String attachment) {}
