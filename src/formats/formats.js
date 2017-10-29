import { partial } from 'lodash';
import yamlFormatter from './yaml';
import tomlFormatter from './toml';
import jsonFormatter from './json';
import FrontmatterFormatter from './frontmatter';

export const formatToExtension = format => ({
  markdown: 'md',
  yaml: 'yml',
  json: 'json',
  html: 'html',
}[format]);

function formatByType(type) {
  // Right now the only type is "editorialWorkflow" and
  // we always returns the same format
  return FrontmatterFormatter;
}

export function formatByExtension(extension) {
  return {
    yml: yamlFormatter,
    yaml: yamlFormatter,
    toml: tomlFormatter,
    json: jsonFormatter,
    md: FrontmatterFormatter,
    markdown: FrontmatterFormatter,
    html: FrontmatterFormatter,
  }[extension] || FrontmatterFormatter;
}

function formatByName(name) {
  return {
    yml: yamlFormatter,
    yaml: yamlFormatter,
    toml: tomlFormatter,
    frontmatter: FrontmatterFormatter,
  }[name] || FrontmatterFormatter;
}

export function resolveFormat(collectionOrEntity, entry) {
  let formatter;
  if (typeof collectionOrEntity === 'string') {
    formatter = formatByType(collectionOrEntity);
  } else if (entry && entry.path) {
    formatter = formatByExtension(entry.path.split('.').pop());
  } else {
    formatter = formatByName(collectionOrEntity.get('format'));
  }
  return {
    fromFile: partial(formatter.fromFile, collectionOrEntity),
    toFile: partial(formatter.toFile, collectionOrEntity),
  };
}
