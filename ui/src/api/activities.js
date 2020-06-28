import api from '../utils/api'

const baseURL = '/activities'

export const activitiesApi = {
    fetchActivities: () => {
        return api.get(baseURL)
    },
    addNewActivity: (data) => {
        return api.post(baseURL, 
            { title: data.title, description: data.description, status: 'Pending' }
        )
    },
    changeStatus: (data) => {
        return api.put(`${baseURL}/${data.id}/status`, {status: data.status})
    }
}