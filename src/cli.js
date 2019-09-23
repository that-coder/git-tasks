import arg from 'arg';
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const requestify = require('requestify');

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
              message: 'Choose you project management service:',
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
  try {
    inquirer.prompt([
      {
        type: 'input',
        name: 'source',
        message: 'Search project name:'
      }
    ]).then(option => {
      let gitlab_url = "https://gitlab.com/api/v4/projects?private_token=&visibility=private&simple=true&archived=false" + `&search=` + option.source
      requestify.request(gitlab_url, {
        method: 'GET'
      })
        .then(function (resp) {
          // console.log(resp)
          let response = JSON.parse(resp.body);
          // console.log(response)
          if (response.length === 0) {
            console.log('Warning, no project found!')
          }
          else {
            inquirer
              .prompt([
                {
                  type: 'rawlist',
                  name: 'source',
                  message: 'Choose you project:',
                  choices: response
                },

              ])
              .then(option => {
                // console.log(option)
                var projectid;
                response.forEach(element => {
                  // console.log(element)
                  if (element.name === option.source) {
                    projectid = element.id;
                  }
                });
                console.log('project ID:', projectid)
              });
          }
        });
    })
  }
  catch (e) {
    console.log(e)
  }
}