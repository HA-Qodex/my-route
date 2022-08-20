import React, { useState, useEffect } from 'react'

export default function UserForm ({
  buttonType,
  handleSubmitData,
  selectedUser
}) {
  const [user, setUser] = useState({ username: '', email: '' })

  const { username, email } = user

  const handleChange = e => {
    const selectedField = e.target.name
    const selectedValue = e.target.value

    setUser(previousData => {
      return { ...previousData, [selectedField]: selectedValue }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleSubmitData(user)
    setUser({ username: '', email: '' })
  }

  useEffect(() => {
    // console.log(selectedUser);
    setUser({ username: selectedUser.username, email: selectedUser.email })


  }, [selectedUser])

  return (
    <div className='form-card'>
      <form onSubmit={handleSubmit}>
        <div className='field-group'>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            required
            onChange={handleChange}
          />
        </div>
        <div className='field-group'>
          <label htmlFor='email'>Email: </label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            required
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='form_btn'>
          {buttonType}
        </button>
      </form>
    </div>
  )
}

UserForm.defaultProps = {
    selectedUser:{
        username: '', email: ''
    }
}
