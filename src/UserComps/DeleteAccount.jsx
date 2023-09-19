import React from 'react'

const DeleteAccount = () => {
  return (
    <div>
      <div className="col-12">
        <h1>Delete Profile</h1>
        <hr />
        <div className="col-6">
          <div className="col-12 my-1">
            <p className='p-0 m-0' style={{ fontSize: '10px' }}><span className='text-danger'>* </span>Deleting account will erase all your data from the DataBase </p>
            <div className="form-floating ">
              <input type="text" className={`form-control text-light inputStyle `} id="floatingInput" name='Username' placeholder="name@example.com" />
              <label htmlFor="floatingInput">Confirm your Password</label>
            </div>
            <button className="btn btn-danger my-2">Delete</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default DeleteAccount
