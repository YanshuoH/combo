define(function() {
    'use strict';

    /**
     * Combination for keydown listener
     *
     * @param {Array} combination An array of keymap
     * @param {Function} finalCallback Callback function when combination is completed
     * @param {Number} maxDelay Max delay between two keydown
     * @param {Function} perCallback Callback function when one key in combination is pressed
     * @param {Function} failureCallback Callback function max delay exceed
     * @constructor
     */
    function Combo(combination, finalCallback, maxDelay, perCallback, failureCallback) {
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
            clearTimeout(resetTimeout);

            // If the key pressed in combination array
            if (event.keyCode === combination[nextExpectedKeyIndex]) {
                event.preventDefault();
                // Per-action callback
                if (perCallback !== undefined) {
                    perCallback(nextExpectedKeyIndex);
                }

                // Matched condition
                if (nextExpectedKeyIndex === combination.length - 1) {
                    finalCallback();
                } else {
                    // continue
                    nextExpectedKeyIndex += 1;

                    resetTimeout = setTimeout(function(args1) {
                        nextExpectedKeyIndex = 0;
                        if (args1 !== undefined) {
                            args1();
                        }
                    }, maxDelay * 1000, failureCallback);
                }
            }
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
