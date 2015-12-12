module.exports = function(grunt){
	
	grunt.initConfig({
		// Copiar arquivos para a pasta de distribuição
		copy: {
		    files:{
		    	expand: true,
		    	cwd: 'site_dev',
		    	src: ['**'],
		    	dest: 'site_dist'
		    }
		},

		// Apagar arquivos de distribuição
		clean:{
			src: 'site_dist'
		},

		
		useminPrepare:{
			html:'site_dist/**/*.html'
		},

		usemin:{
			html:'site_dist/**/*.html'
		},

		//Otimizando imagens
		imagemin:{
			files:{ 
				expand: true,               
		        cwd: 'site_dist/img/',                  
		        src: ['**/*.{png,jpg,gif}'],  
		        dest: 'site_dist/img/'                
	      	}
		},

		//Mimificando CSS
		cssmin:{
			files:{
		      expand: true,
		      cwd: 'site_dist/css',
		      src: ['**/*.css'],
		      dest: 'site_dist/css',
		      ext: '.min.css'
		    }
		},

		uglify:{
			alvos:{
		      	files:{
			       'site_dist/js/main.min.js': ['site_dist/js/main.js']  
		     	}
	     	}
		 },

		 //Compilando SASS
		 sass: {
		 	dist: {
			 	files: {                
			        'site_dev/css/style.css': 'site_dev/css/sass/main.scss' 
			    }
			}
		 },

		 //Assistindo mudanças
		 watch:{
		 	sass:{
		 		options:{
		 			event: ['added', 'changed']
		 		},

		 		files: 'site_dev/css/sass/**/*.scss',
		 		tasks: 'sass'
		 	}
		 }

	});// Fim initConfig

	

	// Registrando tasks
	grunt.registerTask('copiar', ['clean','copy']);
	grunt.registerTask('default', ['clean', 'copy', 'sass', 'useminPrepare', 'uglify', 'cssmin', 'usemin', 'imagemin']);

	// Carregando plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
};