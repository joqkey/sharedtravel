package com.ihub.sharedtravel.strest.service;


import com.ihub.sharedtravel.strest.model.UserInfo;

public interface UserService {
	public void registerUser(UserInfo user);
	public UserInfo getUserDetailsByEmail(String email);
}
