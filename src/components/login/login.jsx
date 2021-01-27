import m from 'mithril'

m.route(document.body, '/', {
    '/login': Auth
});

var Auth = {
    controller: function() {
        var ctrl = this;

        ctrl.user = {
            username: '',
            password: ''

        };
        ctrl.err = '';

        ctrl.login = function(e) {
            e.preventDefault();
            m.request({
                method: 'POST',
                url: '/TODO',
                data: ctrl.user
            })
            .then(function(res) {
                ctrl.success = 'Logged in!'
                m.route('/');
            })
            .catch(function(err) {
                ctrl.err = err;
            });
        };
    }
}
