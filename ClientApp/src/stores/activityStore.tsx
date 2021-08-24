import {makeAutoObservable, runInAction} from 'mobx';
import {IActivity} from '../interfaces/interfaces';
import callApi from '../helpers/api/callApi';

export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>()
  selectedActivity: IActivity | undefined = undefined
  editMode = false
  loading = false
  loadingInitial = true

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  }
  
  get groupedActivities() {
    return Object.entries(this.activitiesByDate.reduce((activities, activity) => {
      const date = activity.date
      activities[date] = activities[date] ? [...activities[date], activity] : [activity]
      return activities
    }, {} as {[key: string]: IActivity[]}))
  }

  loadActivities = async () => {
    this.loadingInitial = true
    try {
      const activities = await callApi.Activities.list()
      runInAction(() => {
        activities.forEach(activity => {
          this.setActivity(activity)
        })
        this.setLoadingInitial(false)
      })
    } catch (e) {
      runInAction(() => {
        this.setLoadingInitial(false)
      })
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id)
    if (activity) {
      this.selectedActivity = activity
      return activity
    } else {
      this.loadingInitial = true
      try {
        activity = await callApi.Activities.details(id)
        this.setActivity(activity)
        runInAction(() => {
          this.selectedActivity = activity
        })
        this.setLoadingInitial(false)
        return activity
      } catch (e) {
        this.setLoadingInitial(false)
      }
    }
  }

  private setActivity = (activity: IActivity) => {
    activity.date = activity.date.split('T')[0]
    this.activityRegistry.set(activity.id, activity)
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id)
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state
  }

  createActivity = async (activity: IActivity) => {
    this.loading = true
    try {
      await callApi.Activities.create(activity)
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
        this.loading = false
      })
    } catch (e) {
      runInAction(() => {
        this.loading = false
      })
      console.log(e)
    }
  }

  updateActivity = async (activity: IActivity) => {
    this.loading = true
    try {
      await callApi.Activities.update(activity)
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
        this.loading = false
      })
    } catch (e) {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true
    try {
      await callApi.Activities.delete(id)
      runInAction(() => {
        this.activityRegistry.delete(id)
        this.editMode = false
        this.loading = false
      })
    } catch (e) {
      runInAction(() => {
        this.loading = false
      })
    }
  }

}