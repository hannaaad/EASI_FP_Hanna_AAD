package com.ulfg2.imeps.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@Profile("dev")
@EnableMethodSecurity
public class DevSecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF (needed for H2 console)
                .headers(AbstractHttpConfigurer::disable) // Disable all security headers
                .formLogin(AbstractHttpConfigurer::disable) // Disable login form
                .logout(withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll() // Allow H2 console access
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/test").permitAll()
                        .anyRequest().authenticated() // Secure other endpoints
                ).httpBasic(withDefaults());

        return http.build();
    }
}
