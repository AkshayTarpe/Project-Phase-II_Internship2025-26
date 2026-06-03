package com.carbon.carbontracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id:optional}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.github.client-id:optional}")
    private String githubClientId;

    /** Comma-separated list, e.g. http://localhost:3000,https://your-app.netlify.app */
    @Value("${app.cors.allowed-origins:http://localhost:3000}")
    private String corsAllowedOrigins;

    private static boolean isOAuthConfigured(String clientId) {
        return clientId != null && !clientId.isBlank() && !"optional".equals(clientId.trim());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/health", "/info").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/carbon/public/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/contact/messages").permitAll()
                        .requestMatchers("/oauth2/**", "/login/oauth2/**").permitAll()
                        .anyRequest().authenticated()
                );

        if (isOAuthConfigured(googleClientId) || isOAuthConfigured(githubClientId)) {
            http.oauth2Login(oauth2 -> oauth2
                    .authorizationEndpoint(auth -> auth
                            .authorizationRequestResolver(
                                    new CustomOAuth2AuthorizationRequestResolver(clientRegistrationRepository)))
                    .successHandler(oAuth2AuthenticationSuccessHandler)
            );
        }

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        for (String origin : corsAllowedOrigins.split(",")) {
            String o = origin.trim();
            if (!o.isEmpty()) {
                configuration.addAllowedOrigin(o);
            }
        }
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
