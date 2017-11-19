module.exports = function(grunt) {

	grunt.initConfig({
		clean: ['dist'],
		copy: {
			dist: {
				files: [{
					expand: true,
					src: ['index.html','jsmain.js','cssmain.css', 'res/projects/1.jpg','res/data_vivek.js','res/india.json','res/graph-scroll.js','res/deb.png','res/eat.png','res/etds.png','res/favicon.ico','res/gojek.png','res/iitkgp_logo.png','res/logo.png','res/meta.png','res/noise4.png','res/ola.png','res/pink.jpg','res/qyk.png','res/sat.png','res/toon2.jpg','res/tsa.png','res/projects/1.jpg','res/projects/boo.jpg','res/projects/eyes.jpg','res/projects/iitkgp.png','res/projects/lok.jpg','res/projects/otp.jpg','res/projects/standup.jpg','res/projects/tty.jpg','res/projects/aircare.png','res/projects/deb.jpg','res/projects/flower_grenade.jpg','res/projects/karma.jpg','res/projects/nls.jpg','res/projects/poi.jpg','res/projects/suitup.jpg','res/projects/voicepay','res/projects/blog.jpg','res/projects/estimato.jpg','res/projects/gc.jpg','res/projects/kgpeep.jpg','res/projects/obol.png','res/projects/sio.jpg','res/projects/time.jpg','res/projects/sa.jpg','res/projects/btg.png','res/Vivek_CV.pdf'],
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
