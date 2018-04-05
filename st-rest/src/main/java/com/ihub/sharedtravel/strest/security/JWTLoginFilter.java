package com.ihub.sharedtravel.strest.security;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.ihub.sharedtravel.strest.model.UserInfo;


public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    public JWTLoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) {

        final String authorization = req.getHeader("Authorization");
        String username = "";
        String password = "";
        if (authorization != null && authorization.startsWith("Basic")) {
            // Authorization: Basic base64credentials
            String base64Credentials = authorization.substring("Basic".length()).trim();
            final byte[] decodedBytes = Base64.decode(base64Credentials.getBytes());
            final String pair = new String(decodedBytes);
            final String[] userDetails = pair.split(":", 2);
            username = userDetails[0];
            password = userDetails[1];
        }

        UserInfo creds = new UserInfo();
        creds.setUsername(username);
        creds.setPassword(password);
        //List<GrantedAuthority> auth = new ArrayList();
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(creds.getUsername(),
                        creds.getPassword()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res, FilterChain chain, Authentication auth) {
        TokenAuthenticationService.addAuthentication(res, auth.getName());
    }
}