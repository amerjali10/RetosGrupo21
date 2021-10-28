/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jalinet.grupo21.entities;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author JaliNet
 */

public interface CostumeCrud extends CrudRepository<Costume, Integer> {
    
     @Query ("SELECT c.category, COUNT(c.category) from Costume AS c group by c.category order by COUNT(c.category) DESC")
     public List<Object[]> countTotalCustomeByCategory();

}
