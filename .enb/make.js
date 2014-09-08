var PAGES = 'app/{platform}/*'

/**
 * Конфигурация сборки enb
 * @param config
 */
module.exports = function(config) {
    var env = config.getEnv('YENV') || 'development';

    ['desktop', 'phone'].forEach(function(platform) {
        var pages = PAGES.replace(/\{platform\}/g, platform),
            levels = [
                'blocks/common',
                'blocks/{platform}',
                'blocks/{env}',
                'design/common',
                'design/{platform}'
            ]
            .map(function(path) {
                return config.resolvePath(path
                    .replace(/\{platform\}/g, platform)
                    .replace(/\{env\}/g, env));
            });

        // YENV=development
        config.mode('development', function() {
            config.nodes(pages, function (nodeConfig) {
                nodeConfig.addTechs([
                    [require('enb/techs/file-copy'), { source: '?.js', target: '_?.js' }],
                    [require(config.resolvePath('.enb/techs/css-stylus')), { target: '_?.css' }]
                ]);

            });
        });

        // YENV=production
        config.mode('production', function() {
            config.nodes(pages, function (nodeConfig) {
                nodeConfig.addTechs([
                ]);
            });
        });

        // development и production
        config.nodes(pages, function(nodeConfig) {
            nodeConfig.addTargets(['?.html.js', '_?.js', '_?.css', '?.lcm.js']);
            nodeConfig.addTechs([
                [require('enb/techs/levels'), {levels: levels}],
                [require('enb/techs/file-provider'), {target: '?.bemdecl.js'}],
                require('enb/techs/deps-old'),
                require('enb/techs/files'),
                // Код шаблонизатора и шаблоны для использования на сервере.
                // Шаблонизатор запускается из express при рендеринге страницы.
                // Запуск осуществяется через согласующий модуль `lib/express-bh`,
                // в котором реализован API подключения шаблонизаторов к express.
                [require('enb-bh/techs/bh-server-include'), {
                    target: '?.html.js',
                    jsAttrName: 'data-param',
                    jsAttrScheme: 'json'
                }],
                // Код шаблонизатора и шаблоны для использования на клиенте.
                // Отличается от серверных шаблонов только наличием модульной обертки.
                [require('enb-bh/techs/bh-client-module'), {
                    target: '?.bh.js'
                }],
                // Блоки
                [require(config.resolvePath('.enb/techs/js')), {
                    sourceSuffixes: ['js', 'vanilla.js'],
                    target: '?.raw.js'
                }],
                // Технология js с раскрытыми инклудами
                [require('enb/techs/js-expand-includes'), {
                    sourceTarget: '?.raw.js',
                    destTarget: '?.exp.js'
                }],
                // Шаблоны Handlebars
                [ require(config.resolvePath('.enb/techs/hbs')), {
                    bhTarget: '?.html.js',
                    target: '?.hbs.js'
                }],
                // Склеить js с шаблонами BH
                [require('enb/techs/file-merge'), {
                    sources: ['?.exp.js', '?.hbs.js'],
                    target: '?.js'
                } ],
                // Контроллер locomotive
                [require('enb/techs/js'), {
                    sourceSuffixes: 'lcm.js',
                    target: '?.lcm.js'
                }]
            ]);
        });
    });

    // Бандл jQuery, ember и др.
    // **************************************************
    //
    config.nodes('app/bundle/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/levels'), {levels: [config.resolvePath('blocks/common')]}],
            [require('enb/techs/file-provider'), {target: '?.bemdecl.js'}],
            require('enb/techs/deps-old'),
            require('enb/techs/files'),

            [require(config.resolvePath('.enb/techs/js')), {
                target: '?.raw.js'
            }],
            [require('enb/techs/js-expand-includes'), {
                sourceTarget: '?.raw.js',
                destTarget: '?.js'
            }],
            [require('enb-borschik/techs/borschik'), {
                sourceTarget: '?.js',
                destTarget: '_?.js',
                tech: 'js'/*,
                techOptions: {
                    uglify: {
                        outSourceMap: 'bundle.js.map',
                        sourceRoot: '/ttt/',
                        sourceMapIncludeSources: true
                    }
                }*/
            }]
        ]);
        nodeConfig.addTargets(['_?.js']);
    });

    config.setLanguages(['ru']);
};
