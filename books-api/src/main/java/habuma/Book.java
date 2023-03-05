package habuma;

import org.springframework.data.annotation.Id;

public record Book(
    @Id Long id, 
    String title, 
    String author) {
}
