/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jalinet.grupo21.servicios;

import com.jalinet.grupo21.dao.CostumeRepository;
import com.jalinet.grupo21.entities.Costume;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author JaliNet
 */
@Service
public class CustomeService {
    @Autowired
    CostumeRepository customeRepository;
    
  public List<Costume> getAll() {return (List<Costume>) customeRepository.getAll();};
  
  public Optional<Costume> getCustome(int id) {return customeRepository.getCostume(id);};
  
  public Costume save(Costume costume) { 
       if (costume.getId()== null){
           return customeRepository.save(costume);
       }
       else
       {
          Optional<Costume> co =  customeRepository.getCostume(costume.getId());
          if (co.isEmpty()){
              return customeRepository.save(costume);
          }
          else
          {
              return costume;
          }
       }
 
    }

 }
