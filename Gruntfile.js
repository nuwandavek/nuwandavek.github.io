module.exports = function(grunt) {

	grunt.initConfig({
		clean: ['dist'],
		copy: {
			dist: {
				files: [{
					expand: true,
					src: ['index.html','jsmain.js','cssmain.css', 'res/projects/1.jpg','res/data_vivek.js','res/india.json','res/graph-scroll.js','res/deb.png','res/eat.png','res/etds.png','res/favicon.ico','res/gojek.png','res/iitkgp_logo.png','res/logo.png','res/meta.png','res/noise4.png','res/ola.png','res/pink.jpg','res/qyk.png','res/sat.png','res/toon2.jpg','res/tsa.png','res/project/1.jpg','res/project/boo.jpg','res/project/eyes.jpg','res/project/iitkgp.png','res/project/lok.jpg','res/project/otp.jpg','res/project/standup.jpg','res/project/tty.jpg','res/project/aircare.png','res/project/deb.jpg','res/project/flower_grenade.jpg','res/project/karma.jpg','res/project/nls.jpg','res/project/poi.jpg','res/project/suitup.jpg','res/project/voicepay','res/project/blog.jpg','res/project/estimato.jpg','res/project/gc.jpg','res/project/kgpeep.jpg','res/project/obol.png','res/project/sio.jpg','res/project/time.jpg'],
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
