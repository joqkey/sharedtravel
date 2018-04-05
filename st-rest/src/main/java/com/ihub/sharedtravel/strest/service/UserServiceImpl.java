package com.ihub.sharedtravel.strest.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ihub.sharedtravel.strest.dao.UserDao;
import com.ihub.sharedtravel.strest.model.UserInfo;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

	@Autowired
	UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		UserInfo user;
		UserDetails userDetails = null;
		try {
			user = userDao.getUser(username);
			userDetails = (UserDetails) new User(
					user.getUsername(), user.getPassword(),new ArrayList<>());
		} catch (InternalAuthenticationServiceException e) {
			System.out.println("InternalAuthenticationServiceException");
			
		}
		return userDetails;
	}

	@Override
	public void registerUser(UserInfo user) {
		userDao.registerUser(user);
		
	}

	@Override
	public UserInfo getUserDetailsByEmail(String email) {
		UserInfo user = userDao.getUserDetailsByEmail(email);
		return user;
	}
	

}
