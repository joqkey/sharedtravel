package com.ihub.sharedtravel.strest.service;

import java.util.List;

import com.ihub.sharedtravel.strest.dao.SearchPostDao;
import com.ihub.sharedtravel.strest.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchPostServiceImpl implements SearchPostService {

	@Autowired
	SearchPostDao searchPostDao;

	@Override
	public List<Post> findPosts(String startDest, String endDest, String startDate) {
		
		return searchPostDao.findPosts(startDest, endDest, startDate);
	}

	@Override
	public void deletePost(int id) {
		searchPostDao.deletePost(id);
		
	}

	@Override
	public List<Post> findPostsByEmail(String email) {
		return searchPostDao.findPostsByEmail(email);
	}

}
