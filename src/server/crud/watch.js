import { dateFactory, watchData } from './data';
import {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
} from './utils';

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
    const { ok, msg } = watchCRUD.validate(data);
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

    // deletes row, capturing deleted data in array
    const deleted = watchData.data.splice(id, 1);

    // status update, returning deleted date our of courtesy
    return {
      title: watchData.title,
      data: deleted,
      ok: true,
      msg: `OK: row "${id}" deleted`,
      servertime: serverTimestamp(),
    };
  },
};

export default watchCRUD;
export { watchCRUD };
