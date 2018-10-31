import { dateFactory, distanceData } from './data';
import {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
} from './utils';

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
    const { ok, msg } = distanceCRUD.validate(data);
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

    // deletes row, capturing deleted data in array
    const deleted = distanceData.data.splice(id, 1);

    // status update, returning deleted date our of courtesy
    return {
      title: distanceData.title,
      data: deleted,
      ok: true,
      msg: `OK: row "${id}" deleted`,
      servertime: serverTimestamp(),
    };
  },
}

export default distanceCRUD;
export { distanceCRUD };
