import { dateFactory, calorieData, distanceData, watchData } from './data';

// helper routine to check if a dynamically-typed variable is a string
const isString = (s) => {j
  return typeof s === 'string' || s instanceof String;
};

// cheaply returns server time in ms for client-side logging
const serverTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

// generic error handler
const respondError = (msg = "invalid request") => {
  return {
    ok: false,
    msg: `ERROR: ${msg}`,
    servertime: serverTimestamp(),
  }
};

// checks if requested value exists, prior to further operations
const readCheck = (store, id) => {
  if (isNaN(id) ||  id < 0 || id > store.data.length - 1) {
    return respondError(`item with ID "${id}" does not exist`);
  }

  return { ok: true };
};

// deeply copies an object, circumventing referencing (WARN: not optimized)
const deepCopyObj = (obj) => JSON.parse(JSON.stringify(obj));



// Calorie-related Create-Read-Update-Delete operations
// input ex: { daysAgo: 0, calories: 444 }
const caloriesCRUD = {
  validate: (data) => {
    if (!('daysAgo' in data) || isNaN(data.daysAgo)) {
      return respondError(`invalid 'daysAgo' value "${data.daysAgo}"`);
    }

    if (!('calories' in data) || isNaN(data.calories)) {
      return respondError(`invalid 'calories' value "${data.calories}"`);
    }

    return { ok: true };
  },

  create: (data) => {
    const { ok, msg } = this.validate(data);
    if (!ok) { return respondError(msg); }

    // check if daysAgo value exists
    const daysAgo = dateFactory(data.daysAgo);
    const daysAgoIndex = calorieData.data.findIndex((data) => {
      data[0] === daysAgo
    });

    if (daysAgoIndex > -1) {
      return respondError(
        `failed to create; rows with daysAgo value "${data.daysAgo}" ` +
        `already exists at index "${daysAgoIndex}"`
      );
    }

    // if non-existent, insert
    const len = calorieData.data.push([
      dateFactory(data.daysAgo),
      data.calories,
    ]);
    const newID = len - 1;

    // respond with new value information and OK status
    return {
      title: calorieData.title,
      data: [
        calorieData.data[newID],
      ],
      ok: true,
      msg: `OK: inserted row with ID ${newID}`,
      servertime: serverTimestamp(),
    };
  },

  read: (id = -1, all = false) => {
    // return all, if requested
    if (all) {
      const response = deepCopyObj(calorieData);
      response.ok = true;
      response.msg = "OK: all rows requested";
      response.servertime = serverTimestamp();

      return response;
    }

    const { ok, msg } = readCheck(calorieData, id);
    if (!ok) { return respondError(msg); }

    // otherwise, return row
    return {
      title: calorieData.title,
      data: [
        calorieData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" requested`,
      servertime: serverTimestamp(),
    };
  },

  // ignores daysAgo on update
  update: (id = -1, data) => {
    const { ok, msg } = readCheck(calorieData, id);
    if (!ok) { return respondError(msg); }
  },

  destroy: (id = -1) => {
    const { ok, msg } = readCheck(calorieData, id);
    if (!ok) { return respondError(msg); }

    calorieData.data.splice(id, 1);
  },
};



// Distance-related Create-Read-Update-Delete operations
// input ex: { daysAgo: 0, location: "Boston, MA, USA", meters: 512 }
const distanceCRUD = {
  validate: (data) => {
    if (!('daysAgo' in data) || isNaN(data.daysAgo)) {
      return respondError(`invalid 'daysAgo' value "${data.daysAgo}"`);
    }

    if (!('location' in data) || !isString(data.location)) {
      return respondError(`invalid 'location' value "${data.location}"`);
    }

    if (!('meters' in data) || isNaN(data.meters)) {
      return respondError(`invalid 'meters' value "${data.meters}"`);
    }

    return { ok: true };
  },

  create: () => {
    const { ok, msg } = this.validate(data);
    if (!ok) { return respondError(msg); }
  },

  read: (id = -1, all = false) => {
    if (all) {
      const response = deepCopyObj(distanceData);
      response.ok = true;
      response.msg = "OK: all rows requested";
      response.servertime = serverTimestamp();

      return response;
    }

    const { ok, msg } = readCheck(distanceData, id);
    if (!ok) { return respondError(msg); }

    return {
      title: distanceData.title,
      data: [
        distanceData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" requested`,
      servertime: serverTimestamp(),
    };
  },

  update: (id = -1, data) => {
    const { ok, msg } = readCheck(distanceData, id);
    if (!ok) { return respondError(msg); }

    calorieData.data[id] = [
      dateFactory(data.daysAgo),
      data.calories,
    ];
  },

  destroy: (id = -1) => {
    const { ok, msg } = readCheck(distanceData, id);
    if (!ok) { return respondError(msg); }

    distanceData.data.splice(id, 1);
  },
}



// Watch-related Create-Read-Update-Delete operations
// input ex: { location: "Boston, MA, USA", usageMS: 1000, ttfbMS: 30 }
const watchCRUD = {
  validate: (data) => {
    if (!('location' in data) || !isString(data.location)) {
      return respondError(`invalid 'location' value "${data.location}"`);
    }

    if (!('usageMS' in data) || isNaN(data.usageMS)) {
      return respondError(`invalid 'usageMS' value "${data.usageMS}"`);
    }

    if (!('ttfbMS' in data) || isNaN(data.ttfbMS)) {
      return respondError(`invalid 'ttfbMS' value "${data.ttfbMS}"`);
    }

    return { ok: true };
  },

  create: (data) => {
    const { ok, msg } = this.validate(data);
    if (!ok) { return respondError(msg); }
  },

  read: (id = -1, all = false) => {
    if (all) {
      const response = deepCopyObj(watchData);
      response.ok = true;
      response.msg = "OK: all rows requested";
      response.servertime = serverTimestamp();

      return response;
    }

    const { ok, msg } = readCheck(watchData, id);
    if (!ok) { return respondError(msg); }

    return {
      title: watchData.title,
      data: [
        watchData.data[id],
      ],
      ok: true,
      msg: `OK: row "${id}" requested`,
      servertime: serverTimestamp(),
    };
  },

  update: (id = -1, data) => {
    const { ok, msg } = readCheck(watchData, id);
    if (!ok) { return respondError(msg); }

    calorieData.data[id] = [
      dateFactory(data.daysAgo),
      data.calories,
    ];
  },

  destroy: (id = -1) => {
    const { ok, msg } = readCheck(watchData, id);
    if (!ok) { return respondError(msg); }

    watchData.data.splice(id, 1);
  },
};

export { caloriesCRUD, distanceCRUD, watchCRUD };
