module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope", "require", "firebase"],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "$scope": true, "require": true, "app":true}
      },
      files: ['../app/**/*.js']
    },

    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'watch']);
};
