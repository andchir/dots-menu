DotsMenu
========

- Latest version: 1.0.4
- Licence: MIT

Demo
----

[http://wdevblog.net.ru/dots-menu/](http://wdevblog.net.ru/dots-menu/)

Screenshots
-----------

![DropMenu - screenshot #1](https://raw.githubusercontent.com/andchir/dots-menu/master/screenshots/screenshot01.png?raw=true "DropMenu - screenshot #1")

![DropMenu - screenshot #2](https://raw.githubusercontent.com/andchir/dots-menu/master/screenshots/screenshot02.png?raw=true "DropMenu - screenshot #2")

Usage
-----

~~~
<link href="dots-menu.css" rel="stylesheet">
<script src="dots-menu.js"></script>
<script>
    var dotsMenu = new DotsMenu();
</script>
~~~

~~~
<div class="dots-menu-container">
    <ul class="dots-menu">
        <li class="nav-item">
            <a href="#1" class="nav-link">
                Top item #1
            </a>
        </li>
        <li class="nav-item active">
            <a href="#2" class="nav-link">
                Top #2 parent active
            </a>
            <ul>
                <li class="nav-item">
                    <a href="#1-1" class="nav-link">
                        Item #1
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#1-2" class="nav-link">
                        Item #2
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</div>
~~~

Class "dots-menu-fluid" for full width:
~~~
<div class="dots-menu-container">
    <ul class="dots-menu dots-menu-fluid">
        ...
    </ul>
</div>
~~~

Options
-------

- **dotsMenuButtonWidth** - The width of the drop-down button. _Default: 50_.
- **mobileViewWindowWidth** - The width of the window for the mobile menu view. _Default: 576_.
- **dotsMenuButtonPosition** - The position of the button drop-down menu. _Default: 'right'_.
- **selector** - Menu selector. _Default: '.dots-menu'_.
- **rightSpace** - The empty space on the right in px. _Default: 0_.

Example with options:
~~~
<script>
    var dotsMenu = new DotsMenu({
        dotsMenuButtonWidth: 50,
        mobileViewWindowWidth: 576,
        dotsMenuButtonPosition: 'right',
        selector: '.dots-menu'
    });
</script>
~~~
