/**
 * Шаблон BEMJSON для получения шаблона Handlebars.
 */
module.exports = {
    name: 'login',
    content: {
        block: 'grid', vars: 'page one column', content: {
            elem: 'column', vars: 'center aligned', content: getForm()
        }
    }
};

function getForm() {
    return {
        block: 'form', mods: { type: 'login' },
        bind: { cls: 'isLogging:loading isLoggingError:error'},
        content: [
            {
                block: 'message', vars: 'error',
                header: 'LOG IN TO YOUR ACCOUNT',
                content: {
                    block: 'para', tag: 'p',
                    content: '{{loggingErrorMsg}}'
                }
            },
            {
                block: 'field', label: 'User name',
                content: [
                    {
                        block: 'input', vars: 'left icon',
                        content: [
                            '{{input name="username" value=_userName disabled=isLoggedIn',
                            ' action="connect" on="enter"',
                            ' maxLength="20" placeholder="starts with \'a\'"}}',
                            { block: 'icon', vars: 'user' },
                            { block: 'label', vars: 'corner', content: { block: 'icon', vars: 'asterisk' }}
                        ]
                    },
                    {
                        block: 'label', vars: 'red pointing above',
                        content: '{{userNameMsg}}',
                        bind: { cls: 'showUserNameMsg::hidden'}
                    }
                ]
            },
            {
                block: 'field', label: 'Password',
                content: [
                    {
                        block: 'input', vars: 'left icon',
                        content: [
                            '{{input name="password" value=_password disabled=isLoggedIn',
                            ' action="connect" on="enter"',
                            ' type="password" maxLength="20" placeholder="starts with \'a\'"}}',
                            { block: 'icon', vars: 'lock' },
                            { block: 'label', vars: 'corner', content: { block: 'icon', vars: 'asterisk' }}
                        ]
                    },
                    {
                        block: 'label', vars: 'hidden red pointing above',
                        content: '{{passwordMsg}}',
                        bind: { cls: 'showPasswordMsg::hidden'}
                    }
                ]
            },
            {
                block: 'button', vars: 'small black', content: 'Connect',
                bind: { cls: 'isLoggedIn:hidden:visible' },
                action: 'connect'
            },
            {
                block: 'button', vars: 'small black', content: 'Disconnect',
                bind: { cls: 'isLoggedIn:visible:hidden' },
                action: 'disconnect'
            }
        ]
    }
}
