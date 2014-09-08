({
    mustDeps: [
        { block: 'semantic' },
        { elems: ['init', 'controller'] },
        { block: 'core' },
        { block: 'websocket' }
    ],
    shouldDeps: [
        { elems: ['js', 'css'] },
        { block: 'app' },
        { block: 'config' }
    ]
})
