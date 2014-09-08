/**
 * Шаблон BEMJSON для получения шаблона Handlebars.
 */
module.exports = {
    name: 'map',
    content: [
        {
            block: 'grid', elem: 'column', vars: 'one',
            content: {
                block: 'message', header: 'YOU MUST BE LOGGED IN',
                bind: { cls: 'isLoggedIn:hidden' },
                content: {
                    block: 'para', tag: 'p',
                    content: 'Please enter your user name and password on the Login page to view the map.'
                }
            }
        },
        {
            block: 'leaflet',
            content: {
                elem: 'container', attrs: { id: 'map' }
            }
        },
        {
            block: 'grid', elem: 'column', vars: 'center aligned',
            content: {
                block: 'message', vars: 'error', mods: {type: 'abort'},
                bind: { cls: 'isConnectionLost::hidden' },
                header: 'CONNECTION IS LOST',
                content: {
                    block: 'para', tag: 'p',
                    content: 'The server is not responding. Trying to reconnect ...'
                }
            }}
    ]
};
