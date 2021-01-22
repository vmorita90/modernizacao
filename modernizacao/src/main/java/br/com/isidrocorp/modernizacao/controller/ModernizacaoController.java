package br.com.isidrocorp.modernizacao.controller;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.modernizacao.dao.ModernizacaoDAO;
import br.com.isidrocorp.modernizacao.dto.Percentual;
import br.com.isidrocorp.modernizacao.dto.PercentualQuantidade;
import br.com.isidrocorp.modernizacao.dto.QuantidadeOcorrencias;
import br.com.isidrocorp.modernizacao.model.Modernizacao;

@RestController
@CrossOrigin("*")
public class ModernizacaoController {

	@Autowired
	ModernizacaoDAO dao;
	
	@PostMapping("/modernizacao/nova")
	public ResponseEntity<Modernizacao> novaModernizacao(@RequestBody Modernizacao nova){
		try {
			dao.save(nova);
			return ResponseEntity.status(201).body(nova);
			
		}
		catch(Exception ex) {
			return ResponseEntity.badRequest().build();
			
		}
	}
	
	@GetMapping("/modernizacao/{id}/percentual")
	public Percentual obterPercentualTotal(@PathVariable int id) {
		return dao.buscarPercentualDaComunidade(id);
	}
	
	@GetMapping("/modernizacao/{id}/ocorrencias/{data}")
	public QuantidadeOcorrencias obterOcorrencias(@PathVariable(name="id") int id, 
			                                      @PathVariable(name="data") String data) {
		LocalDate novaData = LocalDate.parse(data);
		return dao.buscarOcorrencias(id, novaData);
	}
	
	@GetMapping("/modernizacao/{id}/{data}")
	public PercentualQuantidade recuperarResumo(@PathVariable int id, @PathVariable String data) {
		try {
			LocalDate dataRecuperar = LocalDate.parse(data);
			Percentual p = dao.buscarPercentualDaComunidade(id);
			QuantidadeOcorrencias q = dao.buscarOcorrencias(id, dataRecuperar);

			PercentualQuantidade pq = new PercentualQuantidade();
			if (p != null) {
				pq.setPercentual(p.getTotal());
			}
			if (q != null) {
				pq.setQuantidade(q.getQtde());
			}

			return pq;
		} catch (Exception ex) {
			return new PercentualQuantidade();
		}
	}
	
	//aqui faremos a rotina que busca tudo da comunidade
	@GetMapping("/modernizacao/comunidade/{id}")
	public ArrayList<Modernizacao> buscarExtrato(@PathVariable int id){
		
		
	}
	
	
	
	
	@GetMapping("/modernizacao")
	public ArrayList<Modernizacao> recuperarTodos(){
		ArrayList<Modernizacao> lista;
		
		lista = (ArrayList<Modernizacao>)dao.findAll();
		return lista;
	}
	
}
