# test commit hook

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    watch:
      scripts:
        files: ['src/**/*.coffee']
        tasks: ['coffee'] # , 'mochaTest']
        options:
          nospawn: true
      # tests:
      #   files: ['src/app/tests/**/*.coffee']
      #   tasks: ['coffee', 'mochaTest']
      #   options:
      #     nospawn: true
      css:
        files: ['src/**/*.styl']
        tasks: ['stylus']
        options:
          nospawn: true
      # views:
      #   files: ['src/**/*.jade']
      #   tasks: ['jade']
      #   options:
      #     nospawn: true
    coffee: 
      compileJoined:
        options:
          join: true
        files:
          'build/my-library.js': [ 
            'src/lib/**/*.coffee',
          ]
    stylus:
      compile:
        files:
          'build/main.css': [ 'src/app/styles/*.styl' ]
    # mochaTest:
    #   files: ['build/server-test.js']

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-contrib-jade')
  
  # Default task(s)
  grunt.registerTask('default', ['coffee', 'stylus', 'watch'])
