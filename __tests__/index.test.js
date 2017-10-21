import fs from 'fs';
import genDiff from '../src';

const result = fs.readFileSync('__tests__/fixtures/resultStructuredText', 'utf8');
const resultPlain = fs.readFileSync('__tests__/fixtures/resultPlain', 'utf8');
const resultJson = fs.readFileSync('__tests__/fixtures/result.json', 'utf8');

test('genDiff(JSON) to structuredText', () => {
  expect(genDiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json', 'sructuredText')).toBe(result);
});

test('genDiff(YAML) to structuredText', () => {
  expect(genDiff('__tests__/fixtures/before.yml', '__tests__/fixtures/after.yml', 'sructuredText')).toBe(result);
});

test('genDiff(INI) to structuredText', () => {
  expect(genDiff('__tests__/fixtures/before.ini', '__tests__/fixtures/after.ini', 'sructuredText')).toBe(result);
});

test('genDiff(JSON) to plainText', () => {
  expect(genDiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json', 'plain')).toBe(resultPlain);
});

test('genDiff(JSON) to Json format', () => {
  expect(genDiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json', 'json')).toBe(resultJson);
});
