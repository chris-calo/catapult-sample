# Catapult Sample

Technical sample, requested by Hari Namduri.

When run, features a full-fledges HTTP server and REST API. Allows for
end-user to register, login, and view some relative, albeit extemely
simplistic, video and health metrics.

Features include:

- [x] Cross-browser, scalable UI
- [x] React for dev, with Preact used in production for performance
- [x] Full-stack app created in JS
- [x] No UI frameworks; written by hand in SCSS
- [x] True, hand-rolled, cryptographically-secure user sessions
- [x] Decoupled API on back-end in ES6+ with Koa
- [x] Exhibits good programming practices in modern JavaScript
- [x] 3 unique data structures, with flexible, custom graphing
- [x] Image and framework-free visuals (branding excluded)
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

## implementation

As interest was requested, in regard to process of integration between
the front-end and the back-end, here is a brief, bulleted step-by-step:

1. Prior to any "code" being written or UI created, data is modelled.
   This is done by creating JavaScript-native objects and arrays, populated
   with mock data:

```
const calorieData = {
  title: "Calories Burned",
  data: [
    [ dateFactory(30),  839 ],
    [ dateFactory(29),  755 ],
    // ...
    [ dateFactory(7),   430 ],
    [ dateFactory(6),   650 ],
    [ dateFactory(5),   500 ],
  ]
};

```

2. Thereafter, a UI is built to indicate how to portray the data. This is
   the second step, because, in some ways, it dictates what the
   programmatic operations will be required. When designed, it is
   implemented in React, using the mock data.

3. With the UI in place, CRUD (Create-Read-Update-Delete) operations are
   written in order to act on the data. Upon completion, data can be
   dynamicallly written-to, read-from, and operated on in the data
   structures. This is paired with a REST API layer, to allow HTTP access.

4. Test suites and documentation are then written for the programmatic
   operations. Once rigorous passing is assured, only then is the
   project continued.

5. Once automated tests pass, final-pass code is written to bind the
   REST API to the UI code in React. At this point, manually testing is
   performed, ensuring adherence to initial specifications. If all-good,
   the project is deployed.


## caveats

Please bear in mind, this is a toy program, created simply for
demonstration purposes. Understanding this, it is fairly hardened, but
there are a few known oddities, implemented as time-saving measures:

- While sessions and accounts persist while the server is running,
  the database is wiped with each reboot. This is to swiftly keep the
  app in "demo mode"
- While there is data and associated API handles for 3 structures,
  only one of them is rendered in graphing formats at `/athlete`; if there
  is any interest the graphs at `/workout` and `/stream` can also be
  implemented
- While full sessions exist, logging out is not implemented

## license

The source code and user-interface found here-in may not be reproduced in
a commercial product, without written permission from Chris Calo. All
materials not associated with Catapult Sports or under a pre-existing
license fall under the copyright of Chris Calo or Vulcan Creative, LLC. –
this includes, but is not limited to: source code, executable binaries,
fonts, graphics, and any other technical or creative material.
