import fs from 'fs';
import genDiff from '../src';

const result = fs.readFileSync('__tests__/fixtures/result', 'utf8');

test('genDiff(JSON)', () => {
  expect(genDiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json')).toBe(result);
});

test('genDiff(YAML)', () => {
  expect(genDiff('__tests__/fixtures/before.yml', '__tests__/fixtures/after.yml')).toBe(result);
});

test('genDiff(INI)', () => {
  expect(genDiff('__tests__/fixtures/before.ini', '__tests__/fixtures/after.ini')).toBe(result);
});
