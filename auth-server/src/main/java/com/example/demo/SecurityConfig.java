package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

  @Bean
  UserDetailsService userDetailsService() {
    UserDetails userDetails = User.builder()
        .username("habuma")
        .password("{noop}password")
        .roles("USER")
        .build();

    return new InMemoryUserDetailsManager(userDetails);
  }

}

