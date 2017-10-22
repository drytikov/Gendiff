#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>, <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    const outputFormat = options.format || 'sructuredText';
    const result = genDiff(firstConfig, secondConfig, outputFormat);
    console.log(result);
    return result;
  });

program.parse(process.argv);
