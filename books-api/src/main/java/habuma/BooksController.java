package habuma;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/books")
public class BooksController {

  private final BookRepository bookRepo;
  
  public BooksController(BookRepository bookRepo) {
    this.bookRepo = bookRepo;
  }
  
  @GetMapping
  public Flux<Book> allBooks() {
    return bookRepo.findAll();
  }
  
  @GetMapping("/{id}")
  public Mono<Book> byId(@PathVariable("id") Long id) {
    return bookRepo.findById(id);
  }
  
  @PostMapping
  public Mono<Book> save(@RequestBody Book book) {
    return bookRepo.save(book);
  }
  
}
