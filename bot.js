import * as dotenv from 'dotenv'
import * as cron from 'node-cron'
import { botClocker } from './utils/puppet.js'

//
dotenv.config()

// build clock in schedule
const clockInHour = 10
const clockInMins = 0

const workDays = 'Monday,Tuesday,Wednesday,Thursday,Friday' // remove weekends on production
const clockInTime = `${clockInMins} ${clockInHour} * * ${workDays}`

// build clock out schedule
const clockOutHour = clockInHour + 9 // (clockInHour + 9) to add the whole 8hr shift and 1hr break
const clockOutMins = 0

const clockOutTime = `${clockOutMins} ${clockOutHour} * * ${workDays}`

/**
 * jobs
 */
console.log(`CLOCK_IN will trigger every "${workDays}" @ ${clockInHour}:00 MIL`)
cron.schedule(clockInTime, async () => {
  try {
    await botClocker('clock_in') // ETA < 10 seconds
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})

console.log(
  `CLOCK_OUT will trigger every "${workDays}" @ ${clockOutHour}:00 MIL`
)
cron.schedule(clockOutTime, async () => {
  try {
    await botClocker('clock_out') // ETA < 10 seconds
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})
