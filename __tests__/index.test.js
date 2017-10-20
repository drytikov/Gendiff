import fs from 'fs';
import { genDiffToJson, genDiffToPlain } from '../src';

const result = fs.readFileSync('__tests__/fixtures/result', 'utf8');
const resultPlain = fs.readFileSync('__tests__/fixtures/resultPlain', 'utf8');

test('genDiff(JSON)', () => {
  expect(genDiffToJson('__tests__/fixtures/before.json', '__tests__/fixtures/after.json')).toBe(result);
});

test('genDiff(YAML)', () => {
  expect(genDiffToJson('__tests__/fixtures/before.yml', '__tests__/fixtures/after.yml')).toBe(result);
});

test('genDiff(INI)', () => {
  expect(genDiffToJson('__tests__/fixtures/before.ini', '__tests__/fixtures/after.ini')).toBe(result);
});

test('genDiff(JSON) to plain', () => {
  expect(genDiffToPlain('__tests__/fixtures/before.json', '__tests__/fixtures/after.json')).toBe(resultPlain);
});
