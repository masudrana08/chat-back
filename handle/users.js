let users = []

const addUser = (id, name, room)=>{
     name = name.trim().toLowerCase()
     room = room.trim().toLowerCase()
    const existingUser = users.find(user=>{
        if(user.room == room){
            if (user.name==name){
                return true
            }
        }
    })
    if(existingUser){
        console.log('already have this user')
        return {error : 'already user exists'}
    }
    const user = {id, name, room}
    users.push(user)
    console.log(users, 'users')
    return user
}

const removeUser = (id)=>{
    const myuser = []
    users.forEach(user=>{
        if( user.id != id){
            myuser.push(user)
        }
        users = myuser
        console.log(users)
    })
}

module.exports = {addUser, removeUser}