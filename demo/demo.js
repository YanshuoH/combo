'use strict';

var comboButtons = $('#comboButtons a');

var arrowClassList = [
    'mdi-navigation-expand-less',
    'mdi-navigation-expand-more',
    'mdi-navigation-chevron-left',
    'mdi-navigation-chevron-right'
];
var colorClassList = [
    'btn-material-red',
    'btn-material-pink',
    'btn-material-purple',
    'btn-material-deep-purple',
    'btn-material-indigo',
    'btn-material-blue',
    'btn-material-cyan',
    'btn-material-teal',
    'btn-material-green',
    'btn-material-light-green',
    'btn-material-lime',
    'btn-material-amber',
    'btn-material-orange',
    'btn-material-deep-orange'
];
var keymap = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
};
var comboChain = [
    keymap.up,
    keymap.down,
    keymap.left,
    keymap.right,
    keymap.up,
    keymap.down,
    keymap.left,
    keymap.right
];
var comboFinalCallback = function() {
    $('#smallFace').removeClass('hidden');
    removeArrowClass();
    removeColorClass();
    comboButtons.addClass('btn-material-yellow').addClass('mdi-action-grade');
};
var comboFailureCallback = function() {
    removeColorClass();
};
var comboPerCallback = function(comboIndex) {
    var button = $(comboButtons[comboIndex]);
    var colorClass = colorClassList[generateRandomInteger(colorClassList.length - 1)];
    button.addClass(colorClass);
};
var combo = new Combo(comboChain, comboFinalCallback, 0.5, comboPerCallback, comboFailureCallback);

function generateRandomInteger(max) {
    return Math.round(Math.random() * max) + 1;
}

function removeColorClass() {
    colorClassList.forEach(function(colorClass) {
        if (comboButtons.hasClass(colorClass)) {
            comboButtons.removeClass(colorClass);
        }
    });
}

function removeArrowClass() {
    arrowClassList.forEach(function(arrowClass) {
        if (comboButtons.hasClass(arrowClass)) {
            comboButtons.removeClass(arrowClass);
        }
    });
}
