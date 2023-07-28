import * as dotenv from 'dotenv'
import * as cron from 'node-cron'
import { botClocker, puppetTester } from './utils/puppet.js'

await puppetTester()

//
dotenv.config()

// build clock in schedule
const clockInMins = 0
const clockInHour = 10

const workDays = 'Monday,Tuesday,Wednesday,Thursday,Friday' // remove weekends on production
const clockInTime = `${clockInMins} ${clockInHour} * * ${workDays}`

// build clock out schedule
const clockOutMins = 0
const clockOutHour = clockInHour + 9 // (clockInHour + 9) to add the whole 8hr shift and 1hr break

const clockOutTime = `${clockOutMins} ${clockOutHour} * * ${workDays}`

/**
 * CLOCK IN
 */
console.log(`CLOCK_IN will trigger every "${workDays}" @ ${clockInHour}:00 MIL`)
cron.schedule(
  clockInTime,
  async () => {
    try {
      await botClocker('clock_in') // ETA < 10 seconds
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Taipei',
  }
)

/**
 * CLOCK OUT
 */
console.log(
  `CLOCK_OUT will trigger every "${workDays}" @ ${clockOutHour}:00 MIL`
)
cron.schedule(
  clockOutTime,
  async () => {
    try {
      await botClocker('clock_out') // ETA < 10 seconds
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Taipei',
  }
)
