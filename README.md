# combo
Frontend combo-key listener

[![Build Status](https://travis-ci.org/YanshuoH/combo.svg?branch=master)](https://travis-ci.org/YanshuoH/combo)
[![Coverage Status](https://coveralls.io/repos/YanshuoH/combo/badge.svg?branch=master&service=github)](https://coveralls.io/github/YanshuoH/combo?branch=master)

# Usage
* Download
TODO (npm and bower) publish

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
** So the comboFinalCallbak() will be called when you do it right.

# APIs
Full usage will be
```
var combo = new Combo(comboChain, comboFinalCallback, 0.5, comboPerCallback, comboFailureCallback);
combo.removeComboListener();
```


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
