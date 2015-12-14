window.addEventListener("load", paginaCarregou);


function paginaCarregou(){

	// ***************************
	//	MENU MOBILE
	// ***************************

	// Configurando menu mobile
	(function menuMobile(){
		// Abre menu mobile
		var botao = document.querySelector("#botao_m");
		botao.addEventListener("click", addMenu);

		function addMenu(){
			var menu = document.querySelector("#menu_mobile");
			var fecharMenu = document.querySelector("#fechar_menu");
			menu.classList.add("menu_ativo");
			fecharMenu.classList.add("menu_ativo");
		}

		// Fecha menu mobile
		var fecharMenu = document.querySelector("#fechar_menu");
		fecharMenu.addEventListener("click", removeMenu);
		
		function removeMenu(){
			var menu = document.querySelector("#menu_mobile");
			var fecharMenu = document.querySelector("#fechar_menu");
			menu.classList.remove("menu_ativo");
			fecharMenu.classList.remove("menu_ativo");
		}
	})();



	// ***************************
	//	LIGTHBOX
	// ***************************

	//Ajax para ver thumbnail
	function thumbnails(){
		var http = new XMLHttpRequest();

		function requisitarJSON(produto){
			var produto = produto;

			http.open("GET", "json/produtos.json", true);
			http.send();

			http.onreadystatechange = function(){
				if(http.readyState == 4 && http.status == 200) {
				    var dadosColetados = JSON.parse(http.responseText);
				    mostraThumbanail(dadosColetados, produto);
				}
			}
		}// fim requisitar JSON


		// Mostrando lightbox com as informações do produto
		function mostraThumbanail(dados, produto){
			if(!dados) {
				alert("error");
				return;
			};

			// abrindo pop up
			var lightbox = document.querySelector("#info_produto");
			lightbox.classList.add("box_ativo");

			// objeto da pocao selecionada
			var pocao = dados.potions[produto];

			// Inserindo informações no html
			var img_produto = document.querySelector("#img_produto");
			var nome = document.querySelector("#nome");
			var efeitos = document.querySelector("#efeitos");
			var ingredientes = document.querySelector("#ingredientes");
			var preco = document.querySelector("#preco");

			img_produto.innerHTML = "<img src='img/produtos/"+pocao.image+"'/>";
			nome.textContent = pocao.name;
			efeitos.textContent = pocao.effect;
			preco.textContent = pocao.price;

			// esvaziando ingredientes atuais
			ingredientes.innerHTML = '';
			// colocando os novos
			for(var i in pocao.ingredients){
				ingredientes.innerHTML += "<li>"+pocao.ingredients[i]+"</li>"; 
			}
		}

		// clicando nas fotos e recolhendo ids
		(function eventoThumbnails(){
			var thumbs = document.querySelectorAll(".thumb");

			for(var i = 0; i < thumbs.length; i++){
				thumbs[i].addEventListener("click", function(){
					var id = this.dataset.layer;
					requisitarJSON(id);
				});
			}

			// fechando lightbox
			var fechar = document.querySelectorAll(".fechar_lightbox");
			for(var i = 0; i < fechar.length; i++){
				fechar[i].addEventListener("click", function(){
					var lightbox = document.querySelector("#info_produto");
					lightbox.classList.remove("box_ativo");
				});
			}
		})(); // função se auto executa

	}

	thumbnails();

}