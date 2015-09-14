define(function() {
    'use strict';

    /**
     * Combination for keydown listener
     *
     * @param {Array} combination An array of keymap
     * @param {Function} finalCallback Callback function when combination is completed
     * @param {Number} maxDelay Max delay between two keydown
     * @param {Function} perCallback Callback function when one key in combination is pressed
     * @constructor
     */
    function Combo(combination, finalCallback, maxDelay, perCallback) {
        /**
         * Max delay between two keydown (in second)
         *
         * @type {Number}
         */
        maxDelay = maxDelay | 1;

        /**
         * Next key index in combination array
         *
         * @type {Integer}
         */
        var nextExpectedKeyIndex = 0;

        /**
         * Timeout id
         *
         * @type {Number}
         */
        var resetTimeout;

        document.addEventListener('keydown', comboListener, false);

        /**
         * Combination listener function when key down
         *
         * @param {Event} event Event of listener
         */
        function comboListener(event) {
            event.preventDefault();
            clearTimeout(resetTimeout);

            // If the key pressed in combination array
            if (event.keyCode === combination[nextExpectedKeyIndex]) {
                // Per-action callback
                if (perCallback !== undefined) {
                    perCallback();
                }

                // Matched condition
                if (nextExpectedKeyIndex === combination.length - 1) {
                    finalCallback();
                } else {
                    // continue
                    nextExpectedKeyIndex += 1;
                    resetTimeout = setTimeout(reset, maxDelay * 1000);
                }
            }
        }

        /**
         * Reset key index
         */
        function reset() {
            nextExpectedKeyIndex = 0;
        }

        /**
         * Remove combination listener
         */
        this.removeComboListener = function() {
            document.removeEventListener('keydown', comboListener, false);
        };
    }

    return Combo;
});
