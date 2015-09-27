# combo
Frontend combo-key listener

[![Build Status](https://travis-ci.org/YanshuoH/combo.svg?branch=master)](https://travis-ci.org/YanshuoH/combo)
[![Coverage Status](https://coveralls.io/repos/YanshuoH/combo/badge.svg?branch=master&service=github)](https://coveralls.io/github/YanshuoH/combo?branch=master)

# Usage
* Download
  * npm
  ```
    npm install combo-keys
  ```
  * bower
  ```
    bower install combo
  ```

* Simply include the javascript file
```
<script type="text/javascript" src="dist/Combo.min.js"></script> 
```

* Nearly done
``` 
var comboChain = [
    keymap.up,
    keymap.down,
    keymap.left,
    keymap.right
];
var combo = new Combo(comboChain, comboFinalCallback);
```
  * So the comboFinalCallbak() will be called when you do it right.

# APIs
Full usage will be
```
var combo = new Combo(
    comboChain,
    comboFinalCallback,
    maxDelay,
    comboPerCallback,
    comboFailureCallback
);
combo.removeComboListener();
```
## comboChain
An array includes the keys of combo, eg.
``` 
// given defined keymap
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
    keymap.right
];
```

## comboFinalCallbak
Function to be called when finish successfully the combo

## maxDelay
The max delay between two presses, default set to 1 second.
E.g. If maxDelay set to 0.5 seconds, given the above comboChain, the presses of key.UP and key.DOWN with an interval larger than 0.5s will not be considered as sucessful.

## comboPerCallback
Function to be called for every key presses in comboChain

## comboFailureCallback
Function to be called when a failure occured. Generally you exceed the max delay.

# Test
* Assuming **karma** **grunt** is installed
* Clone or use npm to download the whole project
``` karma start ```
* Or
``` grunt test ```

# Build
``` grunt build ```

# Check style
``` grunt coding-rules ```
