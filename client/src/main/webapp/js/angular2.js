(function () {

    var HelloApp = ng.core.Component({
        selector: 'hello-app',
        template: '<h1>got it</h1>'
    }).Class({
        constructor: function () {}

    });

    document.addEventListener('DOMContentLoaded', function () {
        ng.platformBrowserDynamic.bootstrap(HelloApp);
    });

})();