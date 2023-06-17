import * as dotenv from 'dotenv'
import * as cron from 'node-cron'
import { botClocker } from './utils/puppet.js'

//
dotenv.config()

// build clock in schedule
const clockInHour = 15 // change to 10 for production
const workDays = 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday' // remove weekends on production
const clockInTime = `* ${clockInHour} * * ${workDays}`

// build clock out schedule
const clockOutHour = clockInHour + 1 // (clockInHour + 9) to add the whole 8hr shift and 1hr break
const clockOutTime = `* ${clockOutHour} * * ${workDays}`

/**
 * jobs
 */
console.log(`CLOCK_IN will trigger every "${workDays}" @ ${clockInHour}:00 MIL`)
cron.schedule(clockInTime, async () => {
  await botClocker('clock_in') // ETA < 10 seconds
})

console.log(
  `CLOCK_OUT will trigger every "${workDays}" @ ${clockOutHour}:00 MIL`
)
cron.schedule(clockOutTime, async () => {
  await botClocker('clock_out') // ETA < 10 seconds
})
