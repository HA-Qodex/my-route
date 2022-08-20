import React, { useEffect, useState } from 'react'
import './App.css'
import UserForm from './form/userForm'

const URL = 'https://rest-api-without-db.herokuapp.com/users/'

function App () {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [updateUser, setUpdateUser] = useState({ username: '', email: '' })
  const [selectedUserId, setSelecteduserId] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false)

  const getUsers = () => {
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw Error('Could not load data')
        }
        return res.json()
      })
      .then(data => {
        setUser(data.users)
        setError(false)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  const deleteUser = id => {
    fetch(URL + id, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          throw Error('could not delete')
        }
        getUsers()
      })
      .catch(error => {
        setError(error)
      })
  }

  const addUser = user => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (res.status === 201) {
          getUsers()
        } else {
          throw new Error('Could not add user')
        }
      })
      .catch(error => {
        setError(error)
      })
  }

  const editUser = id => {
    setUpdateFlag(true)
    setSelecteduserId(id);
    const findUser = user.filter(userData => userData.id === id)[0]
    setUpdateUser({ username: findUser.username, email: findUser.email })
  }

  const updateUserData = (user)=>{
    fetch(URL+`${selectedUserId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => {
      if (res.status === 200) {
        getUsers()
        setSelecteduserId('');
        setUpdateFlag(false)
      } else {
        throw new Error('Could not update user')
      }
    })
    .catch(error => {
      setError(error)
    })
  }

  return (
    <div>
      <h1>User Management</h1>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {updateFlag ? (
        <UserForm buttonType='Update user' selectedUser={updateUser} handleSubmitData={updateUserData}/>
      ) : (
        <UserForm buttonType='Add user' handleSubmitData={addUser} />
      )}

      <section>
        {user &&
          user.map(user => {
            const { id, username, email } = user
            return (
              <article className='card' key={id}>
                <h3>{username}</h3>
                <h4>{email}</h4>
                <button className='btn-1' onClick={() => editUser(id)}>
                  Edit
                </button>
                <button
                  className='btn-2'
                  onClick={() => {
                    deleteUser(id)
                  }}
                >
                  Delete
                </button>
              </article>
            )
          })}
      </section>
    </div>
  )
}

export default App
