package com.ihub.sharedtravel.strest.service;

import java.util.List;

import com.ihub.sharedtravel.strest.dao.PlacesDao;
import com.ihub.sharedtravel.strest.model.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlacesServiceImpl implements PlacesService {
	@Autowired
	PlacesDao placesDao;

	@Override
	public List<Place> getAllPlaces() {

		return placesDao.getAllPlaces();
	}

}
