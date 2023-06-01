package habuma;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

  @Bean
  SecurityWebFilterChain filterChain(ServerHttpSecurity http) throws Exception {    
      http.authorizeExchange(exchanges -> exchanges
              .pathMatchers(HttpMethod.POST, "/books")
                      .hasAuthority("SCOPE_books.write")
              .anyExchange().permitAll())
              .csrf(c -> c.disable())
              .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()));
      return http.build();
  }
  
}
