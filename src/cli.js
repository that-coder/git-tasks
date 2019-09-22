import arg from 'arg';
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

function parseArguments(rawArgs) {
  let args = rawArgs
  if (args[2]) {
    if (args[2] === 'logout') {

    }
    else if (args[2] === 'connect') {
      if (args[3] === 'gitlab') {

      }
      if (args[3] === 'help') {
        help()
      }
      else {
        inquirer
          .prompt([
            {
              type: 'rawlist',
              name: 'source',
              message: 'Choose you project tracking service:',
              choices: ["1. Gitlab", "2. Trello", "3. Bitbucket", "4. Github"]
            },
          ])
          .then(option => {
            switch (option.source) {
              case "1. Gitlab":
                gitlab();
                break;
              case "2. Trello":
                break;
              case "3. Bitbucket":
                break;
              case "4. Github":
                break;
            }
          });
      }
    }
  }
  else {
    help()
  }
}


function help() {
  console.log('options');
  console.log('git connect  - connects with project tools like gitlab, bitbucket, github and trello');
}
export function cli(args) {
  console.log(
    chalk.yellow(
      figlet.textSync('GIT TASKS', { horizontalLayout: 'full' })
    )
  );
  let options = parseArguments(args);
}

function gitlab() {
  cons
}