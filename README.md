# Magic

Often, we see programmers decry tools and usage patterns as "magical". As far as I can tell, the most consistent meaning of the word "magical" in this context is, "This looks unfamiliar, I don't understand how it works, I don't want to understand how it works, and I don't want to look at it long enough for it to become familiar."

IMO, that's not a great reason to discourage other people from using a tool or pattern!

And on top of that, we all use "magical" tools all the time that we don't understand, and don't really have a deep desire to understand. One big one for me is **reactivity systems**.

So, to push myself to understand reactivity systems a little better, give myself an excuse to show off my Vite + uvu + Playwright testing setup (screencast coming soon!), and to poke a little fun at "magical", the ultimate cop-out criticism in programming, I wrote **Magic**, a naive, mostly type-safe, less-than-100-lines-including-types-and-documentation, Harry Potter-themed reactivity system.

Think of it this way: if Backbone.js, React, and Vue got together, and cooperatively painted a shitty self-portrait of themselves, and then that painting entered the Harry Potter universe and gained the ability to move around in its frame, that would be **Magic**.


## Usage

Probably don't use Magic.

But if you really want to, it actually works:

```bash
npm i @alexvipond/magic
```

```ts
// My✨Magical✨Script.ts
import { useMagical } from '@alexvipond/magic'

// Initialize a piece of reactive state. Its type
// will be inferred.
const count = useMagical(0)

// Cast the summoning spell to summon the up-to-date
// magical state.
count.accio() // -> 0

// Perform a memory charm on your magical state. Erase
// the old memory, and replace it with a new one.
count.obliviate(4)
count.accio() // -> 4

// Extend an extendable ear into the Magic, and you'll
// hear when changes happen.
//
// Pass a spell that should be cast when the extendable
// ear hears changes.
count.extendEar((obliviatedState, previousState) => {
  console.log(obliviatedState)
})
```

It also supports more centralized side effects, with an API inspired by the Vue Composition API's `watch` function.

```ts
// My✨Magical✨Script.ts
import { useMagical, useExtendableEar } from '@alexvipond/magic'

const count1 = useMagical(0)
const count2 = useMagical(0)

// Extend the same extendable ear into multiple instances
// of Magic. Pass a spell to case when any individual magical
// state changes, then pass an arbitrary number of Magic
// instances to extend the ear into.
//
// The spell will be performed each time any of the individual
// pieces of magical state changes.
useExtendableEar(
  // Spell:
  (indexOfObliviated, obliviatedStates, previousStates) => {
    console.log({
      indexOfObliviated,
      obliviatedStates,
      previousStates,
    })
  },
  // Magic instances:
  count1,
  count2
)
```

**❗Harry Potter spoilers ahead❗**

If you thought I was going to support JSX or any kind of component abstraction whatsoever for Magic, you'll be sadder than you were when Dumbledore died, though probably not as sad as you were when Hedwig died.

```
🦉RIP🦉
```

Instead, you can use truly barbaric APIs like `getElementById` to perform side effects on the DOM.

```html
<!-- My✨Magical✨App.html -->
<html>
<body>
  <div>
    <div><button id="count-button">Increase count</button></div>
    <div><span>Count:</span><span id="count-display"></span></div>
  </div>
  
</body>
<script src="https://unpkg.com/@alexvipond/magic/lib/index.umd.js"></script>

<script type="application/javascript">
const { useMagical } = Magic

const count = useMagical(0)
const countButton = document.getElementById('count-button')
const countDisplay = document.getElementById('count-display')

count.extendEar(newMemory => {
  countDisplay.textContent = `${newMemory}`
})

countButton.addEventListener('click', () => {
  count.obliviate(count.accio() + 1)
})
</script>
</html>
```


## Things that Vue does better

A.K.A. a list of concepts to study if you're interested in making your world less magical, as sad as that sounds.

- Uses Proxy objects to provide a better API for value updates and automatic side effects
- For better efficiency, performs reactive side effects asynchronously, with multiple different options for more precise control over exact timing
- De-duplicates side effects before they run
- Also has memoized reactive state, a virtual DOM, component abstractions, component lifecycle hooks, multiple variations of a custom templating language, first-party compiler for the templating language, first-party SPA routing solution, global store solutions, SSR capability, etc.

