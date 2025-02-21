package com.ulfg2.imeps.domain;

import java.util.List;

public record Student(int id,
                      String firstName,
                      String lastName,
                      String phoneNumber,
                      String email,
                      int stdId,
                      int academicYear,
                      String department,
                      int grade,
                      int ulBranch,
                      List<Candidature> candidatures
                      ) {
}
