package com.ulfg2.imeps.domain;

import java.util.List;

public record FileRequest(List<String> headers, List<List<String>> rows, String title) {
}
