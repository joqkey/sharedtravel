package com.ihub.sharedtravel.strest.controller;

import com.ihub.sharedtravel.strest.model.Place;
import com.ihub.sharedtravel.strest.model.Post;
import com.ihub.sharedtravel.strest.model.UserInfo;
import com.ihub.sharedtravel.strest.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StRestController {

    @Autowired
    UserService userService;

    @Autowired
    SharePostService sharePostService;

    @Autowired
    SearchPostService searchPostService;

    @Autowired
    PlacesService placesService;

    @Autowired
    ChangeUserDetailsService changeUserDetailsService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registeUser(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("email") String email,
            @RequestParam("phonenumber") String phonenumber) {
        UserInfo user = new UserInfo();
        user.setEmail(email);
        user.setPassword(password);
        user.setPhonenumber(phonenumber);
        user.setUsername(username);

        userService.registerUser(user);
        return "Done!";
    }

    @RequestMapping(value = "/home/userDetails", method = RequestMethod.GET)
    public UserInfo getUserDetails(@RequestParam("email") String email) {
        return userService.getUserDetailsByEmail(email);
    }

    @RequestMapping(value = "/home/post/getAllPlaces", method = RequestMethod.GET)
    public List<Place> getAllPlaces() {
        return placesService.getAllPlaces();
    }

    @RequestMapping(value = "/home/post/share", method = RequestMethod.POST)
    public void sharePost(@RequestParam("username") String username,
                          @RequestParam("email") String email,
                          @RequestParam("phonenumber") String phonenumber,
                          @RequestParam("startDest") String startDest,
                          @RequestParam("endDest") String endDest,
                          @RequestParam("startTime") String startTime,
                          @RequestParam("startDate") String startDate,
                          @RequestParam("desc") String desc) {
        Post post = new Post();
        post.setDate(startDate);
        post.setTimeStart(startTime);
        post.setDescription(desc);
        post.setStartDestination(startDest);
        post.setEndDestination(endDest);

        UserInfo user = new UserInfo();
        user.setEmail(email);
        user.setPhonenumber(phonenumber);
        user.setUsername(username);
        post.setUserInfo(user);

        sharePostService.sharePost(post);
    }

    @RequestMapping(value = "/home/search/findPosts", method = RequestMethod.GET)
    public List<Post> findPosts(@RequestParam("startDest") String startDest,
                                @RequestParam("endDest") String endDest,
                                @RequestParam("startDate") String startDate) {
        return searchPostService.findPosts(startDest, endDest, startDate);
    }

    @RequestMapping(value = "/register/checkMail", method = RequestMethod.GET, produces = "application/json")
    public int checkMail(@RequestParam("email") String email) {
        return changeUserDetailsService.checkMail(email);
    }

    @RequestMapping(value = "/home/user/checkPassword", method = RequestMethod.GET, produces = "application/json")
    public int checkPassword(@RequestParam("email") String email,
                             @RequestParam("oldPass") String oldPass) {
        return changeUserDetailsService.checkPassword(email, oldPass);
    }

    @RequestMapping(value = "/home/user/changePassword", method = RequestMethod.POST, produces = "application/json")
    public void changePassword(@RequestParam("email") String email,
                               @RequestParam("newPass") String newPass) {
        changeUserDetailsService.changePasswordByEmail(email, newPass);
    }

    @RequestMapping(value = "/home/user/changePhonenumber", method = RequestMethod.POST, produces = "application/json")
    public void changePhoneNumber(@RequestParam("email") String email,
                                  @RequestParam("phonenumber") String phonenumber) {
        changeUserDetailsService.chagePhonenumberByEmail(email, phonenumber);
    }

    @RequestMapping(value = "/home/search/deletePost", method = RequestMethod.POST, produces = "application/json")
    public void deletePost(@RequestParam("id") int id) {
        searchPostService.deletePost(id);
    }

    @RequestMapping(value = "/home/search/findMyActivePosts", method = RequestMethod.GET, produces = "application/json")
    public List<Post> findMyActivePosts(@RequestParam("email") String email) {
        return searchPostService.findPostsByEmail(email);
    }
}
