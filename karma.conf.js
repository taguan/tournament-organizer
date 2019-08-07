module.exports = function(config){
  config.set({

    basePath : './',

      files : [
          'app/bower_components/angular/angular.js',
          'app/bower_components/lodash/lodash.js',
          'app/bower_components/angular-route/angular-route.js',
          'app/bower_components/angular-mocks/angular-mocks.js',
          'app/bower_components/angular-local-storage/dist/angular-local-storage.js',
          'app/app.js',
          'app/generator/**/*.js',
          'app/groups/**/*.js',
          'app/brackets/**/*.js'
      ],


    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ]

  });
};
