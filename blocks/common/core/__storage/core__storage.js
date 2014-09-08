modules.define('storage', ['cookie'], function(provide, cookie){

    var storage = {},
        jar;

    // Нативная поддержка WebStorage API или полифил на основе куки.
    if (sessionStorage) {
        storage.get = sessionStorage.getItem.bind(sessionStorage);
        storage.set = sessionStorage.setItem.bind(sessionStorage);
    } else {
        storage.get = cookie.get;
        storage.set = cookie.set;
    }

    /**
     * Фиксирует текущее время.
     * @param {String} [tag] Название ключа, в которым сохраняется время.
     */
    storage.fixTime = function(tag) {
        tag = tag || 'fix-time';
        storage.set(tag, Date.now());
    };

    /**
     * Возвращает зафиксироанное либо текущее время.
     * @param {String} [tag] Название ключа, из которого берется время.
     * @returns {Number} Timestamp.
     */
    storage.getTime = function(tag) {
        var ts = parseInt(storage.get(tag || 'fix-time'), 10);
        return  isNaN(ts) ? 0 : ts;
    };

    provide(storage);
});
