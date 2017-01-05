# ShoboDot - A dot canvas written in pure Javascript

![ShoboDot Welcome](img/shobodot_welcome.png)

*ShoboDot is a easy way to embed the dots canvas into your app*<br>
This is all written in pure Javascript.

# How to setup

You need only three steps.

First. Include shobodot.min.js in your header of HTML file.
```html
<script src='path/to/shobodot.min.js'></script>
```
Second. Prepare the element, whose class is shobodot and set height and width of it as you like.
```html
<div class='shobodot' style='height:100px; width:100%;'></div>
```
Third. Write one line of Javascript.
```html
<script>
  var shobodot = new ShoboDot();
</script>
```

## Configuration

You can change two configuration of the dots.

### colorBoxes

![colorBox](img/shobodot_colorbox.png)

If you want to set the colorBoxes above like above, you could give argument like this.
```javascript
var = new ShoboDot({colorBoxes: true});
```

### clickFunction

If you want to click and paint the dot, you can do like this.
```javascript
var = new ShoboDot({clickFunction: true})
```

Of course you can make both of them active, like this.
```javascript
var = new ShoboDot({colorBoxes: true, clickFunction: true});
```
By default, they both are false.


# How to use ShoboDot

- change color – click the colorbox whose color is what you want.
- change colorbox’s color – type ‘option’ key on your keyboard.
- delete – click the dot while pushing ‘command’ key down.
- save – you can not save. just screenshot it and share with (me)[https://naggi-goishi.github.io/about/]!

# Contribution

I would welcome any kind of contribution.<br>
However, before making any pull request,
I would be appreciate if you post an issue unless your change is fixing obvious bugs.<br>
Thank you!.
