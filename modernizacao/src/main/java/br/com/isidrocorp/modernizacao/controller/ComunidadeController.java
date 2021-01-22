package br.com.isidrocorp.modernizacao.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.modernizacao.dao.ComunidadeDAO;
import br.com.isidrocorp.modernizacao.model.Comunidade;

@RestController
@CrossOrigin("*")
public class ComunidadeController {
	
	@Autowired
	ComunidadeDAO dao;
	
	// método para buscar uma comnidade pelo ID
	
	@GetMapping("/comunidades/{id}")
	public Comunidade recuperarPeloId(@PathVariable int id) {
		return dao.findById(id).get();
	}
	
	@GetMapping("/comunidades")
	public ArrayList<Comunidade> recuperarTodos(){
		ArrayList<Comunidade> lista;
		
		lista = (ArrayList<Comunidade>)dao.findAll();
		return lista;

		}
	/*
	@GetMapping("/comunidades/{id}")
	public ResponseEntity<Comunidade> mostrarPeloID(@PathVariable int id){
	Comunidade c = servico.recuperarPorId(id);
	if(c!=null) {
		return ResponseEntity.ok(c);
	}
	return ResponseEntity.notFound().build();
	
	}
	*/

}


