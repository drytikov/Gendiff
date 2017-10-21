import fs from 'fs';
import genDiff from '../src';

const result = fs.readFileSync('__tests__/fixtures/result', 'utf8');
const resultPlain = fs.readFileSync('__tests__/fixtures/resultPlain', 'utf8');

test('genDiff(JSON)', () => {
  expect(genDiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json', 'json')).toBe(result);
});

test('genDiff(YAML)', () => {
  expect(genDiff('__tests__/fixtures/before.yml', '__tests__/fixtures/after.yml', 'json')).toBe(result);
});

test('genDiff(INI)', () => {
  expect(genDiff('__tests__/fixtures/before.ini', '__tests__/fixtures/after.ini', 'json')).toBe(result);
});

test('genDiff(JSON) to plain', () => {
  expect(genDiff('__tests__/fixtures/before.json', '__tests__/fixtures/after.json', 'plain')).toBe(resultPlain);
});
