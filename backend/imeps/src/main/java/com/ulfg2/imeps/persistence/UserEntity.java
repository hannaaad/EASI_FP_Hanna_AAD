package com.ulfg2.imeps.persistence;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(unique = true)
    private String username;
    private String password;
    @ColumnDefault(value = "false")
    private boolean isAdmin;

    private int ulBranch;

    public UserEntity() {

    }

    public UserEntity(int id, String username, String password, boolean isAdmin, int ulBranch) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        this.ulBranch = ulBranch;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String email) {
        this.username = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (isAdmin) {
            return Set.of(
                    (GrantedAuthority) () -> "ROLE_ADMIN",
                    (GrantedAuthority) () -> "ROLE_STUDENT"
            );
        } else {
            return Set.of((GrantedAuthority) () -> "ROLE_STUDENT");
        }
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean role) {
        this.isAdmin = role;
    }

    public int getUlBranch() {
        return ulBranch;
    }

    public void setUlBranch(int ulBranch) {
        this.ulBranch = ulBranch;
    }
}
