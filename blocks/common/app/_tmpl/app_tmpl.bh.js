module.exports = function (bh) {

    function toBemCssClasses (json, blockName) {
        var mods, mod, res,
            base = (json.block || blockName) + (json.elem ? '__' + json.elem : ''),
            mix, i, l;

        res = (base === blockName) ? '' : base;
        if (mods = json.mods || json.elem && json.elemMods) {
            for (i in mods) {
                if (mod = mods[i]) {
                    res += (res ? ' ' : '') + base + '_' + i + (mod === true ? '' : '_' + mod);
                }
            }
        }
        if ((mix = json.mix) && (l = mix.length)) {
            for (i = 0; i < l; i++) {
                if (!mix[i]) continue;
                res += ' ' + toBemCssClasses(mix[i], mix[i].elem ? json.block || blockName : base);
            }
        }
        return res;
    };

    /**
     * Приводит значения атрибутов в соответствие с BEM.
     * Все шаблоны начинаются вызовом этой функции.
     * @param ctx
     * @param json
     * @param {Object} options Дополнительные опции.
     */
    function strictAttrs() {
        semanticAttrs.apply(this, arguments);
        handlebarsAttrs.apply(this, arguments);
    }

    /**
     * Формирует значение атрибута class для Semantic.
     * @param ctx
     * @param json
     */
    function semanticAttrs(ctx) {
        ctx.js(ctx.param('js') || false);
        ctx.cls(['ui'
                , ctx.param('cls')
                , ctx.param('_cls')
                , ctx.param('vars')
            ].filter(function (t) { return t }).join(' '),
            true);
    }

    /**
     * Формирует плейсхолдер для связанных атрибутов {{bind-attr...}}
     * и помещает его в атрибут data-bind-attr. При сборке сам атрибут
     * убирается, а вместо него подставляется его значение.
     * @param ctx
     * @param json
     */
    function handlebarsAttrs(ctx, json) {
        var attrs = ctx.param('bind') || {}
            , keys = Object.keys(attrs)
            , tmpl = []
            , val
            , action;

        // Обход биндингов. Атрибут убирается из статики, если он присутствует в биндингах.
        // Статческие значения атрибута `cls` добавляются к биндингам с префиксом `:`.
        keys.forEach(function (key) {
            if ('cls' === key) {
                ctx.bem(false);     // BH не будет добавлять классы автоматически
                val = (toBemCssClasses(json) + ' ' + ctx.cls())
                    .replace(/^\s|\s(?:\s)|\s$/g, '')
                    .split(' ')
                    .map(function (val) { return ':' + val })
                    .concat(attrs[key])
                    .join(' ');
                name = 'class';
                ctx.cls(null, true);
            } else {
                name = key;
                val = attrs[key];
            }
            tmpl.push('{{bind-attr ' + name + '="' + val + '"}}');
            ctx.attr(key, null, true);
        });
        if (tmpl.length) {
            ctx.attr('data-bind-attr', tmpl.join(' '));
        }

        // Actions
        if (action = ctx.param('action')) {
            val = '';
            if ('string' === typeof action) {
                val = '{{action "' + ctx.param('action') + '"}}'
            } else if (action.name) {
                val = '{{action "' + action.name + '"';
                if (action.params) {
                    val += ' ' + action.params
                }
                if (action.on) {
                    val += ' ' + action.on
                }
                val += '}}'
            }
            val && ctx.attr('data-action', val);
        }
    }

    /**
     * custom.bgimage
     */
    bh.match('bgimage', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });

    /**
     * custom.loader
     */
    bh.match('loader', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });

    /**
     * collection.menu
     */
    bh.match('menu', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });
    bh.match('menu__item', function (ctx, json) {
        ctx.param('_cls', 'item');
        strictAttrs.apply(this, arguments);
    });

    /**
     * element.icon
     */
    bh.match('icon', function (ctx, json) {
        strictAttrs.apply(this, arguments);
        ctx.tag('i');
    });


    /**
     * collections.form
     */
    bh.match('form', function (ctx, json) {
        var res = bh.processBemJson(json, 'form');
        ctx.param('_cls', 'segment');
        strictAttrs.apply(this, arguments);
    });

    /**
     * collections.grid
     */
    bh.match('grid', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });
    bh.match('grid__row', function (ctx, json) {
        ctx.param('_cls', 'row');
        strictAttrs.apply(this, arguments);
    });
    bh.match('grid__column', function (ctx, json) {
        ctx.param('_cls', 'column');
        strictAttrs.apply(this, arguments);
    });
    /**
     * collections.message
     */
    bh.match('message', function (ctx, json) {
        strictAttrs.apply(this, arguments);
        if (json.header) {
            ctx.content([
                { elem: 'header', cls: 'header', content: json.header },
                ctx.content()
            ], true);
            ctx.tParam('_header', json.header);
        }
    });
    /**
     * elements.button
     */
    bh.match('button', function (ctx, json) {
        var modType = ctx.mod('type'),
            isRealButton = !modType || modType === 'submit';

        strictAttrs.apply(this, arguments);
        ctx
            .tag(json.tag || 'button')
            //.js(json.js || false)
            .attrs({
                role: 'button',
                tabindex: json.tabIndex,
                id: json.id,
                type: isRealButton ? modType || 'button' : undefined,
                name: json.name,
                value: json.val,
                title: json.title
            });

        isRealButton
            && ctx.mod('disabled')
            && ctx.attr('disabled', 'disabled');

        var content = ctx.content();
        if (typeof content === 'undefined') {
            content = [json.icon];
            'text' in json && content.push({ elem: 'text', content: json.text });
            ctx.content(content);
        }
    });
    /**
     * elements.field
     */
    bh.match('field', function (ctx, json) {
        strictAttrs.apply(this, arguments);
        if (json.label) {
            ctx.content([
                { elem: 'label', tag: 'label', content: json.label },
                ctx.content()
            ], true)
        }
    });
    /**
     * elements.input
     */
    bh.match('input', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });

    /**
     * elements.label
     */
    bh.match('label', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });

    /**
     * elements.step
     */
    bh.match('steps', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });

    bh.match('step', function (ctx, json) {
        strictAttrs.apply(this, arguments);
    });
};
