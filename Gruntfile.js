/* global module: true */
module.exports = function (grunt) {
  grunt.initConfig({
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      src: ['./*.html']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['./*.css', './com/**/*.css']
    },
    eslint: {
      options: {
        configFile: '.eslintrc.json'
      },
      target: ['./js/*.js', './com/**/*.js']
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        src: 'dist/index.html',
        dest: 'dist/index.html'
      }
    },
    copy: {
      html: {
        src: './index.html',
        dest: 'dist/index.html'
      }
    },
    concat: {
      js: {
        src: ['./js/*.js', './com/**/*.js'],
        dest: 'dist/bundle.js'
      },
      css: {
        src: ['./*.css', './com/**/*.css'],
        dest: 'dist/bundle.css'
      }
    },
    uglify: {
      'dist/bundle.min.js': 'dist/bundle.js'
    },
    cssmin: {
      'dist/bundle.min.css': 'dist/bundle.css'
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    clean: {
      end: ['dist/bundle.css', 'dist/bundle.js', '.tmp']
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'dist/bundle.js': 'dist/bundle.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('lint', ['htmlhint', 'csslint', 'eslint']);
  grunt.registerTask('build', ['copy:html', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'htmlmin', 'clean:end']);
};