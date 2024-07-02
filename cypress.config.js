import { defineConfig } from 'cypress';
import * as path from 'path';
import fs from 'fs-extra';

function getConfigurationByFile(envFileName) {
	const pathToConfigFile = path.resolve('.', 'test/cypress/configs',`${envFileName}.json`);
	return fs.readJson(pathToConfigFile);
}

export default defineConfig({
  chromeWebSecurity: false,
	fixturesFolder: 'test/cypress/fixtures',
	videosFolder: 'test/cypress/videos',
	downloadsFolder: 'test/cypress/downloads',
	screenshotsFolder: 'test/cypress/screenshots',
	defaultCommandTimeout: 12000,
	execTimeout: 12000,
	requestTimeout: 12000,
	responseTimeout: 12000,
  e2e: {
	specPattern: 'test/cypress/e2e/**/*.test.cy.{js,jsx,ts,tsx}',
	supportFile: 'test/cypress/support/e2e.js',
   
	setupNodeEvents(on, config) {
		const specifiedEnv = config.env.fileConfig;
		return getConfigurationByFile(specifiedEnv);
    },
  },
});
