---
description: "Portals allow you to render to a place outside of a component from within a component. Think of a contextual nav bar or side nav."
---

Another nice feature React is something called a Portal. You can think of the portal as a separate mount point (the actual DOM node which your app is put into) for your React app. A common use case for this is going to be doing modals. You'll have your normal app with its normal mount point and then you can also put different content into a separate mount point (like a modal or a contextual nav bar) directly from a component. Pretty cool!

First thing, let's go into index.html and add a separate mount point:

```html
<!-- below #root -->
<div id="modal"></div>
```

This where the modal will actually be mounted whenever we render to this portal. Totally separate from our app root.

Next create a file called Modal.js:

```javascript
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
```

- This will mount a div and mount inside of the portal whenever the Modal is rendered and then _remove_ itself whenever it's unrendered.
- We're using the feature of `useEffect` that if you need to clean up after you're done (we need to remove the div once the Modal is no longer being rendered) you can return a function inside of `useEffect` that cleans up.
- We're also using a ref here via the hook `useRef`. Refs are like instance variables for function components. Whereas on a class you'd say `this.myVar` to refer to an instance variable, with function components you can use refs. They're containers of state that live outside a function's closure state which means anytime I refer to `elRef.current`, it's **always referring to the same element**. This is different from a `useState` call because the variable returned from that `useState` call will **always refer to the state of the variable when that function was called.** It seems like a weird hair to split but it's important when you have async calls and effects because that variable can change and nearly always you want the `useState` variable, but with something like a portal it's important we always refer to the same DOM div; we don't want a lot of portals. 
- Down at the bottom we use React's `createPortal` to pass the children (whatever you put inside `<Modal></Modal>`) to the portal div.

Now go to App.js and add:

```javascript
// at the top
import Modal from "./Modal";

// state of show modal
  const [showModal, setShowModal] = useState(false);

// This will be close the modal in case  you click in the bnackdrop but not onm the modal itself
  const handleShowModal = (e) => {
    if (e.target.id === 'backdrop') {
      setShowModal(null);
    }
  }

// add onClick to <button>
<button onClick={() => setShowModal(false)} className="btn btn-modal-close">Close Me!</button>

// below description
{showModal &&
    <Modal>
    <div onClick={handleShowModal} id="backdrop" className="backdrop">
        <div className="modal">
        <h1 className="modal-title">
            This is the Modal!
        </h1>
        <p className="modal-content">
            I hope you learn something from this codepen! I use codepen as a learning and studying tool, and I want to give back a little bit with the more I learn! I also try and keep it simple with using plain HTML/CSS/Javascript
        </p>
        <button onClick={() => setShowModal(false)} className="btn btn-modal-close">Close Me!</button>
        </div>
    </div>
    </Modal>  
}
```

- Notice that despite we're rendering a whole different part of the DOM we're still referencing the state in Details.js. This is the magic of Portals. You can use state but render in different parts of the DOM. Imagine a sidebar with contextual navigation. Or a contextual footer. It opens up a lot of cool possibilities.

That's it! That's how you make a modal using a portal in React. This used to be significantly more difficult to do but with portals it became trivial. The nice thing about portals is that despite the actual elements being in different DOM trees, these are in the same React trees, so you can do event bubbling up from the modal. Some times this is useful if you want to make your Modal more flexible (like we did.)

> 🏁 [Click here to see the project  credits by Brian Holt][step]

[portal]: https://reactjs.org/docs/portals.html
[step]: https://github.com/btholt/citr-v7-project/tree/master/12-portals-and-refs