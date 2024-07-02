WELCOME

Before you start running the tests in this project, there are a few things you need to do.

1. Install node.
   You can download and install node from here: https://nodejs.org/en/download/

2. Open the project in VSC, click on the 'Terminal' menu -> 'New Terminal' and type the following:
   npm i
   npm install cypress --save-dev

3. This project typically executes tests from the cypress test runner (test GUI). The way this project is set up, you open the test runner in a particular environment. For example, if you want to execute your tests in the local environment you would open the terminal in VSC and type the following command;
   npm run cy:local
   This command executes the following script 'npx cypress open --env fileConfig=local'.
   If you wanted to execute your tests in the other environment (i.e. dev), you would;
   npm run cy:dev
   Etc. This gives the tester a lot of control over specific environment variables.
