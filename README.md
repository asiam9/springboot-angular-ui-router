# springboot-angular-ui-router

###Exemplo de Spring Boot com Angular uiRouter

O modo html5 de *$locationProvider* é ativo, o que obriga o desenvolvedor a gerenciar essas rotas no servidor, pois sempre que elas não são processadas pelo Angular o recurso será procurado nos diretórios do servidor (que pode não ser localizado e gerar um erro 404). Nesse exemplo é possível ver como redirecionar a requisição para o index sempre que uma rota não for localizada no servidor.

Customize a tela de erro configurando o Bean **EmbeddedServletContainerCustomizer** para redirecionar a requisição à página inicial do projeto:
```
@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
	    return new EmbeddedServletContainerCustomizer() {
	        @Override
	        public void customize(ConfigurableEmbeddedServletContainer container) {
	            container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/"));
	        }
	    };
	}
```
