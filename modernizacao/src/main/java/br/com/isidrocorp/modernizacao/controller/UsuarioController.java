package br.com.isidrocorp.modernizacao.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.modernizacao.dao.UsuarioDAO;
import br.com.isidrocorp.modernizacao.model.Usuario;

@RestController
public class UsuarioController {
	
	@Autowired
	UsuarioDAO dao;
	
	@GetMapping("/usuarios")
	public ArrayList<Usuario> recuperarTodos(){
		ArrayList<Usuario> lista;
		
		lista = (ArrayList<Usuario>)dao.findAll();
		
			
		return lista;
		
	}
	
	/*Funcionalidade de login:
	 * Por que Post Mapping? - Para que o browser possa enviar as infos sensíveis para o backend
	 */
	@PostMapping("/login")
	@CrossOrigin("*")
	public ResponseEntity<Usuario> fazerLogin(@RequestBody Usuario dadosLogin) {
		Usuario resultado;
		
		resultado = dao.findByRacfOrEmail(dadosLogin.getRacf(), dadosLogin.getEmail());
		
		if (resultado != null) { // o usuario foi efetivamente encontrado, preciso conferir
			if(dadosLogin.getSenha().equals(resultado.getSenha())) {
				resultado.setSenha("**********");
				return ResponseEntity.ok(resultado);
				
			}
			else { // usuário existe mas senha não - retorna 403
				return ResponseEntity.status(403).build();
			}
				
		}
		else { // nao foi encontrado, devo retornar um 404
			return ResponseEntity.notFound().build();
		}
	
	}

	
	
	
}
