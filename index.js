module.exports = function(app) {
    var plugin = {};
    plugin.id = "normal-state-fix";
    plugin.name = "Normal State Fix";
    plugin.description = "Ensures that normal state notifications have an empty method array";

    plugin.start = function(options, restartPlugin) {
        app.debug('Plugin started');

        // Listen for notifications
        app.signalk.on('delta', (delta) => {
            delta.updates.forEach(update => {
                update.values.forEach(value => {
                    if (value.path.includes('notifications')) {
                        if (value.value.state === 'normal') {
                            value.value.method = [];
                            app.debug('Set method to empty for normal state on', value.path);
                        }
                    }
                });
            });
        });
    };

    plugin.stop = function() {
        app.debug('Plugin stopped');
    };

    return plugin;
};
