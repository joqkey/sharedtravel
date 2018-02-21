package com.ihub.sharedtravel.strest.dao;

import com.ihub.sharedtravel.strest.model.Post;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

@Repository
public class SharePostDaoJDBC extends BaseDao implements SharePostDao {

    @Override
    public void sharePost(Post post) {
        String query = "insert into st_post(user_email, start_dest, end_dest, start_date, start_time, description)"
                + "values(:user_email, :start_dest, :end_dest, :start_date, :start_time, :description)";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("user_email", post.getUserInfo().getEmail());
        params.addValue("start_dest", post.getStartDestination());
        params.addValue("end_dest", post.getEndDestination());
        params.addValue("start_date", post.getDate());
        params.addValue("start_time", post.getTimeStart());
        params.addValue("description", post.getDescription());

        jdbcTemplate.update(query, params);
    }

}
