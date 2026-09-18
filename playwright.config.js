// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const config = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  workers: 1,

  use: {
    baseURL: process.env.BASE_URL,

    browserName: 'chromium',

    headless: false,

    screenshot: 'on',

    trace: 'retain-on-failure',
  },
});

export default config;