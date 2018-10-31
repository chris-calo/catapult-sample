# Catapult Sample

Technical sample, requested by Hari Namduri.

When run, features a full-fledges HTTP server and REST API. Allows for
end-user to register, login, and view some relative, albeit extemely
simplistic, video and health metrics.

Features include:

- [ ] Cross-browser, scalable UI
- [ ] React for dev, with Preact used in production for performance
- [ ] Full-stack app created in JS
- [ ] No UI frameworks; written by hand in SCSS
- [x] Decoupled API on back-end in ES6+ with Koa
- [x] Exhibits good programming practices in modern JavaScript
- [x] 3 unique data structures, with flexible, custom graphing
- [x] Test suite (Jest) with near 100% coverage
- [x] Minimal production dependencies
- [x] Concise, modular codebase
- [x] Server-side rendering

## runtime dependencies
- Node v10.7.0+
- NPM v6.4.1+

## dev installation
```
λ git clone https://github.com/chris-calo/catapult-sample.git
λ cd catapult-sample
λ npm i
λ npm run build && node build/server.js
```

## running test suite
```
λ git clone https://github.com/chris-calo/catapult-sample.git
λ cd catapult-sample
λ npm i
λ npm test
```

### license

The source code and user-interface found here-in may not be reproduced in
a commercial product, without written permission from Chris Calo. All
materials not associated with Catapult Sports or under a pre-existing
license fall under the copyright of Chris Calo or Vulcan Creative, LLC. –
this includes, but is not limited to: source code, executable binaries,
fonts, graphics, and any other technical or creative material.
