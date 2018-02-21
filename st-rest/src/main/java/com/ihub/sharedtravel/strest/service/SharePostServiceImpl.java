package com.ihub.sharedtravel.strest.service;

import com.ihub.sharedtravel.strest.dao.SharePostDao;
import com.ihub.sharedtravel.strest.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SharePostServiceImpl implements SharePostService {

    @Autowired
    SharePostDao sharePostDao;

    @Override
    public void sharePost(Post post) {
        sharePostDao.sharePost(post);
    }

}
