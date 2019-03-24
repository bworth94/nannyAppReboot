package com.project.nannyApp.nannyAppReboot1.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GroupRepository extends JpaRepository<Group, Long> {
	Group findByTask(String task);
}
