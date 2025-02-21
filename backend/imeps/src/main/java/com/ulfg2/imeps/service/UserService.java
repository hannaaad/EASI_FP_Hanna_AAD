package com.ulfg2.imeps.service;

import com.ulfg2.imeps.persistence.UserEntity;
import com.ulfg2.imeps.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserEntity createUser(String username, String password) {
        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public UserEntity findUserByUsername(String username) {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isEmpty())
            throw new UsernameNotFoundException("The user does not exist.");
        return user.get();
    }
}
