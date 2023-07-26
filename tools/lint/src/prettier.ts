/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import path from 'path';

import { esLintExtensions } from './eslint';
import { LintCommandOptions } from './lint.types';

const rootDir = process.cwd();
const prettierConfigPath = path.resolve(
  __dirname,
  '../config/prettier.config.js',
);
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

/** Spawns a prettier job */
export function prettier({
  fix,
  verbose,
}: Pick<LintCommandOptions, 'fix' | 'verbose'>) {
  return new Promise<void>(resolve => {
    console.log(chalk.magenta('Running Prettier...'));
    spawn(
      'prettier',
      [
        fix ? '--write' : '--check',
        '--config',
        prettierConfigPath,
        `${rootDir}/**/*.{${prettierExtensions.join(',')}}`,
      ],
      {
        stdio: 'inherit',
      },
    ).on('close', resolve);
  });
}