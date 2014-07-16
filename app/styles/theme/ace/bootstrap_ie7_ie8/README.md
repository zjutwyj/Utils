bootstrap3_ie7_ie8
==================

Bootstrap 3 has been built 'responsive first'. This means that the grid has made heavy use of media queries which are not supported in IE8 or older versions.

This results in these browsers displaying a single column mobile layout. Not ideal if you need to support older versions of IE.

Bootstrap 3 - Amends for IE7 / IE8 will make the grid look acceptable for IE7 and IE8.

Setup
-----

Clone this repo locally.

Open up the index.html file in a browser.

Take a look at this file in IE7 or IE8.


To use in your own Bootstrap 3 based project
--------------------------------------------

Copy the ie8and.less file into your folder where your LESS files are.

Add a line at the end of your bootstrap.less file to import this file `@import "ie8and.less";`

Place a conditional statement on the body of your markup (see example in index.html in this repo and below).

```sh
<!--[if IE 7]><body class="ie7"><![endif]-->
<!--[if IE 8]><body class="ie8"><![endif]-->
<!--[if IE 9]><body class="ie9"><![endif]-->
<!--[if !IE]>-->
<body>
<!--<![endif]-->
```

Take a look at your site in IE7 or IE8.

License
-------

[Copyright 2014 Perry Harlock](LICENSE.txt).  
bootstrap3_ie7_ie8 is licensed under the [GNU General Public License 3.0][gpl].

[gpl]: http://www.gnu.org/licenses/gpl-3.0.html