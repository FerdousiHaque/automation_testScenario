# Overview

This project has been designed to do assignment test cases using webdriver.io. It’s scalable, robust and easy to maintain. It provides automation testing.

## Tools and Technologies

  - Visual Studio Code or any code editor
  - npm (v 9.5.1)
  - node (v 18.16.0)
  
# Getting started for developers

## Project Clone
* Clone from GitLab using,

        https://github.com/FerdousiHaque/automation_testScenario.git

* Go to the cloned project directory using,

        cd automation_testScenario

## Setup Configuration
1. To open this project, you have to open the folder automation_testScenario in Visual Studio Code.


2. Run following command to initialize,

        npm i  --save-dev @wdio/cli

3. Execute test case using run command,

        npm run wdio

4. To generate allure report use following command,

        allure generate allure-results --clean && allure open

## Features
1. Test case for login with credential

2. Test case for verification item

3. Test case for email link check using mailosaur
