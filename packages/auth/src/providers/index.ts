import { GoogleProvider } from './google';

// URGENT TODO: Remove dependency on name here being the same as name in SUPER call
export default {
  google: GoogleProvider,
};

export * from './base';
export * from './google';
