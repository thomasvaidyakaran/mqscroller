# 🌀 mqScroller jQuery Plugin

**mqscroller** is a lightweight and customizable jQuery plugin for creating smooth, responsive marquee-style scrolling for text or images. It supports auto-looping, direction control, adjustable speed, and pause-on-hover.

> 👨‍💻 Made by [Thomas Vaidyakaran](https://github.com/thomasvaidyakaran)  
> 🔗 GitHub: [https://github.com/thomasvaidyakaran/mqscroller](https://github.com/thomasvaidyakaran/mqscroller)

---

### 🌟 Features

- Smooth horizontal scrolling (left/right)
- Auto-cloning for seamless looping
- Adjustable scroll speed and gap between items
- Pause on hover
- RTL support (`htmlDir:'rtl'`)
- Customizable via options or HTML dir attribute
- Lightweight and dependency-free (just jQuery)

---

### 🔧 Installation

#### Include CSS
```html
<link href="path/css/mqscroller.css" rel="stylesheet">
```

#### Include JS
```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="path/js/mqscroller.js"></script>
```
### 🚀 HTML

```html
<div class="mqscroller"> 
    <div class="mqs-item">Item 1</div>
    <div class="mqs-item">Item 2</div> 
    <div class="mqs-item">Item 3</div> 
</div>
```

#### Initialize Plugin
```javascript
$(document).ready(function () { 
    $('.mqscroller').mqscroller({ 
        direction: 'left', 
        duration: 5000, 
        loop: true, 
        gap: 10, 
        pauseOnHover: true 
    }); 
});
```

### ⚙️ Options

| Option         | Type    | Default | Description                                                                    |
| :--------      | :------ | :------ | :----------------------------------------------------------------------------- |
| `htmlDir`      | string  | `auto`  | Set text direction: 'auto', 'ltr', or 'rtl'. <br>'auto' follows <html dir="">. |
| `loop`         | Bool    | `false` | Enables continuous looping.                                                    |
| `duration`     | Number  | `5000`  | Scroll animation duration in milliseconds.                                     |
| `direction`    | String  | `left`  | Scroll direction (`left` or `right`).                                          |
| `gap`          | Number  | `0`     | Space between scrolling items in pixels.                                       |
| `pauseOnHover` | Bool    | `false` | Pauses scrolling on hover.                                                     |

### 🔁 Plugin Events

```javascript
// Initialize
$('.mqscroller').trigger('initialize.mqscroller');

// Destroy mqscroller 
$('.mqscroller').trigger('destroy.mqscroller');

// Reinitialize mqscroller
$('.mqscroller').trigger('refresh.mqscroller');
```

### 🧩 Notes
Items must have class `.mqs-item`.
The wrapper element should have class `.mqscroller`.
The plugin auto-wraps items in a `.mqs-group`.
Clones are marked with class `.cloned` and `aria-hidden="true"`.

### ⚙️ Demo
See a live demo on [CodePen](https://github.com/thomasvaidyakaran) or check out the examples folder.


### 📝 License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
