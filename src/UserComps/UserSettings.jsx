import React from 'react'
import './settings.css'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const UserSettings = () => {
    const location = useLocation()
    return (
        <div className='p-lg-4'>
            <div className="col-12 d-none d-lg-block">
                <div className="row">
                    <div className="col-3 p-0 rounded-3" style={{ border: '1px solid white', overflow: 'hidden', maxHeight: '300px' }}>
                        <div className="card border-0">
                            <div className="card-header bg-dark text-light">
                                <h5>Header</h5>
                            </div>
                            <ul class="list-group nav-item text-light border-0 rounded-0" style={{ backgroundColor: 'black' }}>
                                <li className={`border-0  list-group-item Nav_pages ${location.pathname === '/settings/edit-profile' ? 'active' : ''}`} style={{ backgroundColor: 'black' }}>
                                    <NavLink className='nav-link text-light' to={'/settings/edit-profile'}><i class="fa-solid me-3  fa-pen-to-square"></i>Edit Profile</NavLink>
                                </li>
                                <li style={{ backgroundColor: 'black' }} className={`border-0 text-light  list-group-item Nav_pages ${location.pathname === '/settings/delete-profile' ? 'active' : ''}`}>

                                    <NavLink className='nav-link text-light' to={'/settings/delete-profile'}><i class="fa-solid me-3 fa-trash"></i>Delete Account</NavLink>
                                </li>
                                <li style={{ backgroundColor: 'black' }} className={`border-0 text-light  list-group-item Nav_pages ${location.pathname === '/settings/aboutUs' ? 'active' : ''}`}>

                                    <NavLink className='nav-link text-light' to={'/settings/aboutUs'}><i class="fa-solid me-3 fa-info"></i>About Us</NavLink>
                                </li>
                                <li style={{ backgroundColor: 'black' }} className={`border-0 text-light  list-group-item Nav_pages `}><i class="fa-solid fa-circle-exclamation me-2"></i>Have a problem.?</li>

                                <li style={{ backgroundColor: 'black' }} className={`border-0 text-light  list-group-item Nav_pages `}><i class="fa-solid fa-message me-2"></i>Feedback</li>
                            </ul>

                        </div>
                    </div>
                    <div className="col-9 px-5">
                        <div className="col-12 text-light">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" text-light col-12  d-block d-lg-none" >

                <ul class="nav-item text-light m text-center p-0 border-0 rounded-0" style={{ backgroundColor: 'black', display: 'flex', flexDirection: 'row', flex: 1, flexWrap: 'nowrap', overflow: 'auto' }}>
                    <li className={`border-0 p-2 list-group-item Nav_pages_md ${location.pathname === '/settings/edit-profile' ? 'active' : ''}`} style={{ backgroundColor: 'black',minWidth:'160px',display:'inline-block' }}>
                        <NavLink className='nav-link text-light' to={'/settings/edit-profile'}><i class="fa-solid me-3  fa-pen-to-square"></i>Edit Profile</NavLink>
                    </li>
                    <li style={{ backgroundColor: 'black',minWidth:'160px',display:'inline-block' }} className={`border-0 p-2 ;text-light  list-group-item Nav_pages_md ${location.pathname === '/settings/delete-profile' ? 'active' : ''}`}>

                        <NavLink className='nav-link text-light' to={'/settings/delete-profile'}><i class="fa-solid me-3 fa-trash"></i>Delete Account</NavLink>
                    </li>
                    <li style={{ backgroundColor: 'black',minWidth:'160px',display:'inline-block' }} className={`border-0 p-2 ;text-light  list-group-item Nav_pages_md ${location.pathname === '/settings/aboutUs' ? 'active' : ''}`}>

                        <NavLink className='nav-link text-light' to={'/settings/aboutUs'}><i class="fa-solid me-3 fa-info"></i>About Us</NavLink>
                    </li>
                    <li style={{ backgroundColor: 'black',minWidth:'160px',display:'inline-block' }} className={`border-0 p-2 ;text-light  list-group-item Nav_pages_md `}><i class="fa-solid fa-circle-exclamation me-2"></i>Have a problem.?</li>

                    <li style={{ backgroundColor: 'black',minWidth:'160px',display:'inline-block' }} className={`border-0 p-2 ;text-light  list-group-item Nav_pages_md `}><i class="fa-solid fa-message me-2"></i>Feedback</li>
                </ul>
                <div className="col-12 px-2">
                    <Outlet />
                    {/* <ModalSample/> */}
                </div>
            </div>
        </div>
    )
}
 
export default UserSettings
