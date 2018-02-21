package com.ihub.sharedtravel.strest.dao;

import java.util.List;

import com.ihub.sharedtravel.strest.model.Post;

public interface SearchPostDao {
	List<Post> findPosts(String startDest, String endDest, String startDate);

	void deletePost(int id);

	List<Post> findPostsByEmail(String email);
}
