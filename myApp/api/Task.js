const {Datastore} = require('@google-cloud/datastore')

const datastore = new Datastore()


const kind = 'Task'

async function createTask(id,task){
    const key = datastore.key([kind])
    const taskInfo = {createdBy:id,...task}
    await datastore.insert({key,data:taskInfo})
    console.log('saved 1 task')
}

createTask('user1',{description:'finsih this task',status:false})

module.exports = createTask