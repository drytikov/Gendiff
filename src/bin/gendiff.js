#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => genDiff(firstConfig, secondConfig));

program.parse(process.argv);
