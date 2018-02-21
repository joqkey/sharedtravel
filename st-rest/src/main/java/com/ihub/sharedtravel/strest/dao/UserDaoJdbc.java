package com.ihub.sharedtravel.strest.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.ihub.sharedtravel.strest.model.UserInfo;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoJdbc extends BaseDao implements UserDao {

    public UserInfo getUser(String email) {
        String query = "select * from st_user u " +
                "where u.email = :email";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", email);

        UserInfo user = jdbcTemplate.queryForObject(query, params, new UserRowMapper());
        return user;
    }

    @Override
    public void registerUser(UserInfo user) {
        String query = "insert into st_user(email, password, username, phone_number, delete_flag) " +
                "values(:email, :password, :username, :phone_number, :delete_flag )";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", user.getEmail());
        params.addValue("password", user.getPassword());
        params.addValue("username", user.getUsername());
        params.addValue("phone_number", user.getPhonenumber());
        params.addValue("delete_flag", 0);

        jdbcTemplate.update(query, params);
    }

    @Override
    public UserInfo getUserDetailsByEmail(String email) {
        String query = "select * " +
                "from st_user u " +
                "where u.email = :email";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", email);

        UserInfo user = jdbcTemplate.queryForObject(query, params, (rs, rowNum) -> {
            UserInfo user1 = new UserInfo();
            user1.setUsername(rs.getString("username"));
            user1.setEmail(rs.getString("email"));
            user1.setPhonenumber(rs.getString("phone_number"));
            return user1;
        });
        return user;
    }

    private class UserRowMapper implements RowMapper<UserInfo> {

        @Override
        public UserInfo mapRow(ResultSet resultSet, int i) throws SQLException {
            UserInfo user = new UserInfo();
            user.setUsername(resultSet.getString("username"));
            user.setEmail(resultSet.getString("email"));
            String password = resultSet.getString("password");
            password = password.replaceAll("\\s+", "");
            user.setPassword(password);
            user.setPhonenumber(resultSet.getString("phone_number"));
            return user;
        }
    }

}
