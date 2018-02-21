package com.ihub.sharedtravel.strest.dao;

public interface ChangeUserDetailsDao {
	int checkPassword(String email, String oldPass);

	void changePasswordByEmail(String email, String newPass);

	void chagePhonenumberByEmail(String email, String phonenumber);

	int checkMail(String email);
}
