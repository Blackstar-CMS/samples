Blackstar CMS Client
=============

This package provides a JavaScript client for accessing Blackstar CMS from the browser or node.

To Install
--------

```
npm install blackstar-cms-client --save
```

### In the browser (standalone, without browserify or equivalent):

```
<script src="blackstar-cms-client.js"></script>
```

The `Blackstar` namespace will be available on the `window` object.

### In node.js (or browserify or equivalent):

```
var Blackstar = require('blackstar-cms-client');
```

To Use
------

The typical usage pattern is:

1. Create an instance of the Blackstar Client.
1. Make a request for some content.
1. Bind the content into the page.

Here is a simple example:

```
<h2 data-blackstar-name="smaller-heading"></h2>
<div data-blackstar-name="second-content"></div>
<script src="blackstar-cms-client.js"></script>
<script>
var blackstar = new Blackstar.Client('http://localhost:2999/', { showEditControls: true });
blackstar.get({ names: ['smaller-heading','second-content'] }).then(function (chunks) {
    blackstar.bind(chunks);     // bind by matching data-blackstar-name values to chunk names 
});
</script>
```

API
---

[Blackstar CMS Client API](api.md)