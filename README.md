# A* Pathfinding Visualization

An interactive visualization of the A* pathfinding algorithm in action. It features a hexagonal tile grid with various types of terrain to observe how the shortest route between two points changes.

![animated gif of the pathfinding visualization](assets/pathfinding_visualization.gif)

## Usage

First, install the package:

```console
$ npm install @d10f/a-star-viz
```

This contains nothing but the Web Component that you can embed directly into your code. Just import, and use it.

```js
import '@d10f/a-star-viz';

<a-star-viz />
```

If you're using Next.js, you're going to need to declare the component you're using this as a Client Component. In addition, the import of the package needs to happen asynchronously:

```jsx
"use client";

import { useEffect } from "react";

export default function SomePage() {
    useEffect(() => {
        import("@d10f/a-star-viz");
    }, []);

    return (
        <a-star-viz />
    );
}
```

##  To Dos

- [x] Make it into a web component for ease of use.
- [x] Publish as an https://www.npmjs.com/package/@d10f/a-star-viz[NPM package].
- [x] Add bundler to include make all web component self-contained.
- [ ] Customize terrain tiles.
- [ ] Better support for various screen sizes.
- [ ] Better customization options through attributes passed in at runtime.
