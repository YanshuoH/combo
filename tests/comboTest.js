define(['chai', 'Combo'], function(chai, Combo) {
    'use strict';

    var expect = chai.expect;

    // Create testing DOM divs
    var elem1 = document.createElement('div');
    elem1.id = 'testBlock';
    elem1.style.visibility = 'hidden';
    elem1.innerHTML = 'Testing block';
    document.body.appendChild(elem1);

    var elem2 = document.createElement("div");
    elem2.id = "comboBlock";
    elem2.style.visibility = 'hidden';
    elem2.innerHTML = 'Testing combo block';
    document.body.appendChild(elem2);

    var testBlockContainer = document.getElementById('testBlock');
    var comboBlockContainer = document.getElementById('comboBlock');
    console.log(testBlockContainer);
    console.log(comboBlockContainer);
    var combo = null;

    /**
     * Simulate a keydown action
     *
     * @param {Number} keyCode Pressed key code
     */
    function keydown(keyCode) {
        var event = document.createEvent('Event');
        event.initEvent('keydown', true, true);
        event.keyCode = keyCode;
        document.dispatchEvent(event);
    }

    /**
     * Show the test block for single key binding action
     */
    function showTestBlock() {
        testBlockContainer.style.visibility = 'visible';
    }

    /**
     * Hide the test block for single key binding action
     */
    function hideTestBlock() {
        testBlockContainer.style.visibility = 'hidden';
    }

    /**
     * Toggle test block
     */
    function toggleTestBlock() {
        if (isTestBlockVisible()) {
            hideTestBlock();
        } else {
            showTestBlock();
        }
    }

    /**
     * Check if test block is visible
     *
     * @return {Boolean}
     */
    function isTestBlockVisible() {
        if (testBlockContainer.style.visibility === 'visible') {
            return true;
        }

        return false;
    }

    /**
     * Show the combination block for combination key binding action
     */
    function showComboBlock() {
        comboBlockContainer.style.visibility = 'visible';
    }

    /**
     * Hide the combination block for combination key binding action
     */
    function hideComboBlock() {
        comboBlockContainer.style.visibility = 'hidden';
    }

    /**
     * Check if combination block is visible
     *
     * @return {Boolean}
     */
    function isComboBlockVisible() {
        if (comboBlockContainer.style.visibility === 'visible') {
            return true;
        }

        return false;
    }

    var keymap = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    var fixtureCombinations = {
        oneKeyCombination: [keymap.up],
        multipleKeyCombination: [keymap.up, keymap.down, keymap.left, keymap.down]
    };

    describe('Combo', function() {
        afterEach(function(done) {
            hideComboBlock();
            hideTestBlock();
            if (combo) {
                combo.removeComboListener();
            }
            done();
        });

        describe('One key combination', function() {
            it('should turn combo block visible, turn test block visible by per-action callback', function() {
                expect(isComboBlockVisible()).to.be.false;
                expect(isTestBlockVisible()).to.be.false;

                combo = new Combo(fixtureCombinations.oneKeyCombination, showComboBlock, 0.5, toggleTestBlock);
                keydown(fixtureCombinations.oneKeyCombination[0]);

                expect(isComboBlockVisible()).to.be.true;
                expect(isTestBlockVisible()).to.be.true;
            });
        });

        describe('Multiple key combo', function() {
            it('should turn combo block visible', function() {
                expect(isComboBlockVisible()).to.be.false;
                expect(isTestBlockVisible()).to.be.false;

                combo = new Combo(fixtureCombinations.multipleKeyCombination, showComboBlock, 0.5, toggleTestBlock);
                fixtureCombinations.multipleKeyCombination.forEach(function(keycode) {
                    keydown(keycode);
                });

                expect(isComboBlockVisible()).to.be.true;
                expect(isTestBlockVisible()).to.be.false;
            });
        });

        describe('Multiple key combo but exceed the max delay', function() {
            it('should not turn combo block visible', function(done) {
                expect(isComboBlockVisible()).to.be.false;

                combo = new Combo(fixtureCombinations.multipleKeyCombination, showComboBlock, 0.1);
                keydown(keymap.up);
                setTimeout(function() {
                    keydown(keymap.down);
                }, 200);
                setTimeout(function() {
                    keydown(keymap.left);
                }, 500);
                setTimeout(function() {
                    keydown(keymap.right);
                }, 600);

                setTimeout(function() {
                    expect(isComboBlockVisible()).to.be.false;
                    done();
                }, 1500);
            });
        });

        describe('Combo with other key binding', function() {
            it('should not disturb the existing key binding action', function() {
                expect(isComboBlockVisible()).to.be.false;
                expect(isTestBlockVisible()).to.be.false;

                var otherKeyBindingAction = function(event) {
                    if (event.keyCode === fixtureCombinations.multipleKeyCombination[0]) {
                        showTestBlock();
                    }
                };
                document.addEventListener('keydown', otherKeyBindingAction);

                combo = new Combo(fixtureCombinations.multipleKeyCombination, showComboBlock, 0.1);

                fixtureCombinations.multipleKeyCombination.forEach(function(keyCode) {
                    keydown(keyCode);
                });
                keydown(fixtureCombinations.multipleKeyCombination[0]);

                expect(isTestBlockVisible()).to.be.true;
                expect(isComboBlockVisible()).to.be.true;

                document.removeEventListener('keydown', otherKeyBindingAction);
            });
        });
    });
});
