var express = require('express');

module.exports = function() {
    // Cборка enb по запросу. В параметрах указано, какие таргеты собирать
    this.use(
        require(__dirname + '/../../.enb/automake')
            .createMiddleware({
                "": ['app/desktop/index']
            })
    );
};
