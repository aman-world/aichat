'use strict';

module.exports = (app) => {
    app.get('/v0/me', (req, res) => {
        res.send('Ok');
    });

};
