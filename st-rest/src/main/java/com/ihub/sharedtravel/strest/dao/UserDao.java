package com.ihub.sharedtravel.strest.dao;

import com.ihub.sharedtravel.strest.model.UserInfo;

public interface UserDao {
	public UserInfo getUser(String username);
	public void registerUser(UserInfo user);
	public UserInfo getUserDetailsByEmail(String email);
}
