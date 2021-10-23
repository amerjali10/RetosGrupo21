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

  public Costume update (Costume custome){
        if (custome.getId() != null){
            Optional<Costume> e = customeRepository.getCostume(custome.getId());
            if (!e.isEmpty()){
                if (custome.getName()!= null){
                    e.get().setName(custome.getName());
                }
                if (custome.getBrand()!= null){
                    e.get().setBrand(custome.getBrand());
                }
                if (custome.getModel()!= null){
                    e.get().setModel(custome.getModel());
                }
                if (custome.getCategory()!= null){
                    e.get().setCategory(custome.getCategory());
                }
                customeRepository.save(e.get());
                return e.get();
            }
            else
            {
                return custome;
            }
        }
        else
        {
            return custome;
        }
    }
  
  public boolean deleteCustome (int id){
      Boolean aBoolean = getCustome(id).map(
              custome->{
            customeRepository.delete(custome);
            return true;
        }).orElse(false);
        return aBoolean;
  }

 }
