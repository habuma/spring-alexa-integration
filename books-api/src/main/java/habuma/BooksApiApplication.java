package habuma;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BooksApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(BooksApiApplication.class, args);
  }

  @Bean
  ApplicationRunner dataLoader(BookRepository bookRepo) {
    return args -> {
      bookRepo.save(new Book(null, 
          "Harry Potter and the Sorcerer's Stone", 
          "J.K. Rowling")).subscribe();
      bookRepo.save(new Book(null, 
          "The Shining", 
          "Stephen King")).subscribe();
    };
  }
  
}
