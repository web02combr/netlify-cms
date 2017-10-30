import toml from 'toml-j0.4';
import tomlify from 'tomlify-j0.4';
import moment from 'moment';
import AssetProxy from '../valueObjects/AssetProxy';
import { sortKeys } from './helpers';

const outputReplacer = (key, value) => {
  if (moment.isMoment(value)) {
    return value.format(value._f);
  }
  if (value instanceof AssetProxy) {
    return `${ value.path }`;
  }
  // Return `false` to use default (`undefined` would delete key).
  return false;
};

export default class TOML {
  fromFile(collectionOrEntity, content) {
    return toml.parse(content);
  }

  toFile(collectionOrEntity, data, sortedKeys = []) {
    return tomlify.toToml(data, { replace: outputReplacer, sort: sortKeys(sortedKeys) });
  }
}
