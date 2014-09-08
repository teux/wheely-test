/**
 * Шаблон BEMJSON для получения шаблона Handlebars.
 */
module.exports = {
    name: 'application',
    content: {
        block: 'grid', vars: 'one column page',
        content: [
            {
                elem: 'row',
                content: {
                    block: 'menu', vars: 'inverted',
                    content: [
                        [
                            '{{#link-to "login" class="ui item"}}'
                            , { block: 'icon', vars: 'user' }
                            , '{{#if isLoggedIn}}{{userName}}{{else}}'
                            , 'Login'
                            , '{{/if}}{{/link-to}}'
                        ],
                        [
                            '{{#link-to "map" class="ui item"}}'
                            , { block: 'icon', vars: 'map' }
                            , 'Map'
                            , '{{/link-to}}'
                        ],
                        {
                            block: 'menu', vars: 'inverted right',
                            content: {
                                elem: 'item',
                                content: ''
                            }
                        }
                    ]
                }
            },
            '{{outlet}}'
        ]
    }
}
;
