import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Calendar from "expo-calendar";

import * as DB from './db';

const taskName = 'SYNC-CALENDERS';

const task = async () => {
  try {
    const { granted } = await Calendar.getCalendarPermissionsAsync();
    if (!granted) {
      return BackgroundFetch.Result.Failed;
    }
    const calendars = await DB.getCalenders();
    calendars.map((calendar, idx) => {
      //ToDO: fetch and sync events with sql lite.
    });
    const receivedNewData = console.log("Running tasks");
    return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
}

const init = async () => {
  await deRegisterTask().catch(e => console.log(e.message));
  await BackgroundFetch.setMinimumIntervalAsync(30)
  let isTaskRegistered = await TaskManager.isTaskRegisteredAsync(taskName);
  if (isTaskRegistered) {
    console.log("Task Already Registered");
    return false;
  }
  await TaskManager.defineTask(taskName, task);
  let isAvailable = await BackgroundFetch.getStatusAsync();
  if (isAvailable !== BackgroundFetch.Status.Available) {
    console.log("Background syncing not permitted");
    return false;
  }
  let options = {
    minimumInterval: 600,
    stopOnTerminate: false,
    startOnBoot: true,
  }
  return await BackgroundFetch.registerTaskAsync(taskName, options);
}

const deRegisterTask = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(taskName)
    await TaskManager.unregisterTaskAsync(taskName);
    return true;
  } catch (e) {
    return e;
  }
}

export {
  init,
  deRegisterTask,
}
