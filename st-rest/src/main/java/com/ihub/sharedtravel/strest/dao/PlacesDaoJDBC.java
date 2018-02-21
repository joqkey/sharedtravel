package com.ihub.sharedtravel.strest.dao;


import java.util.List;

import com.ihub.sharedtravel.strest.model.Place;
import org.springframework.stereotype.Repository;


@Repository
public class PlacesDaoJDBC extends BaseDao implements PlacesDao {

    @Override
    public List<Place> getAllPlaces() {
        String query = "select * from st_place";

        List<Place> places = jdbcTemplate.query(query, (rs, rowNum) -> {
            Place place = new Place();
            place.setPlaceName(rs.getString("place_name"));
            return place;
        });

        return places;
    }

}
