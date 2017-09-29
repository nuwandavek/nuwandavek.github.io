module.exports = function(grunt) {

	grunt.initConfig({
		clean: ['dist'],
		copy: {
			dist: {
				files: [{
					expand: true,
					src: ['index.html','jsmain.js','cssmain.css', 'res/projects/1.jpg','res/data_vivek.js','res/india.json','res/graph-scroll.js','res/deb.png','res/eat.png','res/etds.png','res/favicon.ico','res/gojek.png','res/iitkgp_logo.png','res/logo.png','res/meta.png','res/noise4.png','res/ola.png','res/pink.jpg','res/qyk.png','res/sat.png','res/toon2.jpg','res/tsa.png'],
					dest: 'dist/'
				}]
			}
		},
				
		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: ['**']
		}
	});

    grunt.registerTask('build', ['clean', 'copy:dist']);

	require('load-grunt-tasks')(grunt);
};
