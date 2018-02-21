package com.ihub.sharedtravel.strest.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.ihub.sharedtravel.strest.model.Post;
import com.ihub.sharedtravel.strest.model.UserInfo;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

@Repository
public class SearchPostDaoJDBC extends BaseDao implements SearchPostDao {

    @Override
    public List<Post> findPosts(String startDest, String endDest,
                                String startDate) {
        String query = "select * from st_post p " +
                "join st_user u on p.user_email = u.email " +
                "where p.start_dest = :startDest " +
                "and p.end_dest = :endDest " +
                "and p.start_date = :startDate";


        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("startDest", startDest);
        params.addValue("endDest", endDest);
        params.addValue("startDate", startDate);

        final List<Post> posts = jdbcTemplate.query(query, params, new PostRowMapper());

        return posts;
    }

    @Override
    public void deletePost(int id) {
        String query = "delete from st_post where post_id = :id";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        jdbcTemplate.update(query, params);
    }

    @Override
    public List<Post> findPostsByEmail(String email) {
        String query = "select * from st_post p " +
                "join st_user u on p.user_email = u.email " +
                "where p.user_email = :email";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", email);

        List<Post> posts = jdbcTemplate.query(query, params, new PostRowMapper());
        return posts;
    }

    private class PostRowMapper implements RowMapper<Post> {

        @Override
        public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
            Post post = new Post();
            post.setDate(rs.getString("start_date"));
            post.setDescription(rs.getString("description"));
            post.setEndDestination(rs.getString("end_dest"));
            post.setStartDestination(rs.getString("start_dest"));
            post.setTimeStart(rs.getString("start_time"));
            post.setId(rs.getInt("post_id"));

            UserInfo user = new UserInfo();
            user.setEmail(rs.getString("user_email"));
            user.setPhonenumber(rs.getString("phone_number"));
            user.setUsername(rs.getString("username"));
            post.setUserInfo(user);

            return post;
        }
    }

}
