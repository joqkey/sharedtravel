package com.ihub.sharedtravel.strest.dao;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

@Repository
public class ChangeUserDetailsDaoJDBC extends BaseDao implements ChangeUserDetailsDao {

    @Override
    public int checkPassword(String email, String oldPass) {
        String query = "SELECT count(*) FROM st_user u " +
                "WHERE u.email = :email " +
                "AND u.password = :oldPass";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", email);
        params.addValue("oldPass", oldPass);

        int count = jdbcTemplate.queryForObject(query, params, Integer.class);

        return count > 0 ? 1 : 0;
    }

    @Override
    public void changePasswordByEmail(String email, String newPass) {
        String query = "UPDATE st_user " +
                "SET password = :newPass " +
                "WHERE email = :email";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", email);
        params.addValue("newPass", newPass);

        jdbcTemplate.update(query, params);
    }

    @Override
    public void chagePhonenumberByEmail(String email, String phonenumber) {
        String query = "UPDATE st_user " +
                "SET phone_number = :phone_number " +
                "WHERE email = :email";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", email);
        params.addValue("phone_number", phonenumber);

        jdbcTemplate.update(query, params);
    }

    @Override
    public int checkMail(String email) {
        String query = "SELECT count(*) " +
                "FROM st_user u " +
                "WHERE u.email = :email";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("email", email);

        int count = jdbcTemplate.queryForObject(query, params, Integer.class);
        return count > 0 ? 1 : 0;
    }

}
