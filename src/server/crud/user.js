import bcrypt from 'bcrypt';
import {
  isString,
  serverTimestamp,
  respondError,
  readCheck,
  deepCopyObj,
} from './utils';

const saltRounds = 10;

const expiresTime = () => {
  const base = new Date();
  return base.setTime(base.getTime() + (2 * 60 * 60 * 1000)); // 2 hours
};

const userOps = {
  data: [],

  extendSession: (data) => {
    const email = data.email;
    const emailIndex = userData.data.findIndex(data =>
      data.email === email
    );

    if (emailIndex > -1) {
      return respondError(`User with email "${email}" does not exist`);
    }

    userData.data[emailIndex].sessionExpires = expiresTime();

    return {
      data: [
        userData.data[newID],
      ],
      ok: true,
      msg: `OK: extended session of user with email ${email}`,
      servertime: serverTimestamp(),
    };
  },

  hashPassword: (password) => {
    const salt = bcrypt.getSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  checkPassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },

  validate: (data) => {
    if (!data || typeof data === 'undefined') {
      return respondError(`missing data`);
    }

    if (
      !('firstName' in data) ||
      data.firstName === null ||
      isNaN(data.firstName)
    ) {
      return respondError(`invalid 'firstName' value "${data.firstName}"`);
    }

    if (
      !('lastName' in data) ||
      data.lastName === null ||
      isNaN(data.lastName)
    ) {
      return respondError(`invalid 'lastName' value "${data.lastName}"`);
    }

    if (
      !('email' in data) ||
      data.email === null ||
      isNaN(data.email)
    ) {
      return respondError(`invalid 'email' value "${data.email}"`);
    }

    if (
      !('password' in data) ||
      data.password === null ||
      isNaN(data.password)
    ) {
      return respondError(`invalid 'password' value "${data.password}"`);
    }

    return { ok: true, msg: "OK: valid" };
  },

  create: () => {
    const { ok, msg } = userOps.validate(data);
    if (!ok) { return respondError(msg); }

    // check if email value exists
    const email = data.email;
    const emailIndex = userData.data.findIndex(data =>
      data.email === email
    );

    if (emailIndex > -1) {
      return respondError(
        `failed to create; row with email value "${data.email}" ` +
        `already exists at index "${emailIndex}"`
      );
    }

    // if non-existent, insert
    const len = userData.data.push({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: userOps.hashPassword(data.password),
      sessionExpires: expiresTime(),
    });
    const newID = len - 1;

    // respond with new value information and OK status
    return {
      data: [
        userData.data[newID],
      ],
      ok: true,
      msg: `OK: inserted row with email ${email}`,
      servertime: serverTimestamp(),
    };
  },
};

export default userOps;
export { userOps };
