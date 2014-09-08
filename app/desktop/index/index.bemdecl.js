exports.blocks = [
    { block: 'page', elem: 'css-reset' },
    {
        block: 'semantic',
        mods: {
            elements: ['icon', 'button', 'input', 'loader', 'segment', 'label'],
            collections: ['grid', 'form', 'menu', 'message']
        }
    },
    { block: 'page', mods: { type: 'index' }},
    { block: 'form', mods: { type: 'login' }},
    { block: 'step'},
    { block: 'leaflet' },
    { block: 'bgimage', mods: { type: 'nice' }},
    { block: 'message'}
];
