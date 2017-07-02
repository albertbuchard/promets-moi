# Promets-moi
Tiny and effective javascript observer using promises.

# Install
## Requirements
You need to install Node.js (https://nodejs.org/) and NPM (installed with node).
In your terminal you will now have access to `npm` which allows you to install modules stored on the internet and keep track of versions for you if those are updates.

Optional: Yarn is an alternative to NPM that build over it, sometimes makes downloading module faster by keeping some version cached. You can install with `> npm i -g yarn`

## Installation
`npm install promets-moi`

## Use
Pick an object `A` of any type, add a property `b` you want to observe, call `promise = A.observe('b', valueOfInterest)`.
Then handle the promise as you wish.

```
<script src="../lib/promets.min.js" charset="utf-8"></script>
<script type="text/javascript">
  var a = {lookAtThat:false}
  a.observe('lookAtThat').then(() => console.log("yaye"))
  setTimeout(() => {a.lookAtThat=true},3000)

  var b = [0,1]
  b.observe(0, "a").then(() => console.log('Even better!'))
  b[0] = "a"

  a.nested = {whatAboutThis: "nope"}
  a.nested.observe('whatAboutThis', "yep")
  .then(() => console.log('Amazed!'))
  setTimeout(() => {a.nested.whatAboutThis="yep"},2000)
</script>
```

## Authors

- Albert Buchard, **Bavelier Lab** in Geneva
- ❤️ Your name here ❤️ ...

# License
MIT
