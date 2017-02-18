package com.example;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebAppConfig extends WebMvcConfigurerAdapter {
	
	/**
	 * Customiza a página de erro para o tipo NOT_FOUND (404).
	 * Como o angular está trabalhando no modo html5Mode(true) o caracter '#' não é utilizado
	 * (impede que as rotas do Angular sejam capturadas pelo servidor) é necessário redirecionar
	 *  para o index.html (mapeamento '/') a requisição.
	 *  Quando o arquivo index.html recebe a requisição redirecionada ele exibirá seu conteúdo.
	 *  No caso de haver um mapeamento válido específicado o próprio Angular irá usar seu mapeamento
	 *  para redirecionar a página para a view válida. Isso dá um efeito de redirecionamento automático,
	 *  mas na prática o servidor não encontra a rota, gera um erro de NOT_FOUND, encaminha para o diretório
	 *  raiz da pasta que contém o arquivo index.html, que por sua vez já carrega as rotas do Angular
	 *  para fazerem o trabalho de um segundo redirecionamento para uma rota que é válida ou não.
	 *  Quando uma rota não é válida, por padrão é feito um redirecionamento para '/' (index.html).
	 *  O index.html carrega o arquivo de rotas que determina que o primeiro estado deve ser 'home',
	 *  ou seja, quando uma rota não for encontrada pelo Angular ele irá redirecionar para a rota
	 *  padrão '/' que irá redirecionar automaticamente para a rota '/home'.
	 * 
	 * @return
	 */
	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
	    return new EmbeddedServletContainerCustomizer() {
	        @Override
	        public void customize(ConfigurableEmbeddedServletContainer container) {
	            container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/"));
	        }
	    };
	}
}
