import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    // Originally with Bootstrap
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            My Music Box
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search For Music
              </Nav.Link>
              {/* if user is logged in show saved music and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Music
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
    // Convert to Tailwind
    // <>
    //   {/* Navbar from bootstrap to tailwind */}
    //   <nav className='relative flex flex-wrap items-center content-between py-3 px-4 '>
    //     {/* Container fluid from bootstrap to tailwind */}
    //     <div className='container mx-auto sm:px-4 max-w-full mx-auto sm:px-4'>
    //       {/* Navbar.Brand from bootstrap to tailwind (may have to change div to <a></a> and delete current anchor tag) */}
    //       <div className='inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap'>
    //         <a href="/">My Music Box</a>
    //       </div>
    //       {/* Navbar.Toggle from bootstrap to tailwind */}
    //       <button className='py-1 px-2 text-md leading-normal bg-transparent border border-transparent rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation'>
    //         <span className='px-5 py-1 border border-gray-600 rounded'></span>
    //       </button>
    //       {/* Navbar.Collapse from bootstrap to tailwind (might need to change id to id="navbarNavDropdown") */}
    //       <div className='hidden flex-grow items-center' id='navbar'>
    //         {/* Nav from bootstrap to tailwind */}
    //         <ul className='flex flex-wrap list-reset pl-0 mb-0'>
    //           {/* Nav.Link from bootstrap to tailwind */}
    //           <li className='font-normal hover:font-bold'>
    //             <a className='inline-block py-2 px-4 no-underline active' aria-current="page" href="/">Search For Music</a>
    //           </li>
    //           {/* if user is logged in show saved music and logout */}
    //           {Auth.loggedIn() ? (
    //             <>
    //               {/* Nav.Link from bootstrap to tailwind */}
    //               <li className='font-normal hover:font-bold'>
    //                 <a className='inline-block py-2 px-4 no-underline' href="/saved">See Your Music</a>
    //               </li>
    //               {/* Nav.Link from bootstrap to tailwind (not sure how to logout with tailwind css) */}
    //               <li className='inline-block py-2 px-4 no-underline' onClick={Auth.logout}><a>Logout</a></li>
    //             </>
    //           ) : (
    //             // Nav.Link from bootstrap to tailwind (not sure how to send user to login page with tailwind)
    //             <li onClick={() => setShowModal(true)}><a>Login/Sign Up</a></li>
    //           )}
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    //   {/* set modal data up */}
    //   <Modal
    //     size='lg'
    //     show={showModal}
    //     onHide={() => setShowModal(false)}
    //     aria-labelledby='signup-modal'>
    //     {/* tab container to do either signup or login component */}
    //     <Tab.Container defaultActiveKey='login'>
    //       <Modal.Header closeButton>
    //         <Modal.Title id='signup-modal'>
    //           <Nav variant='pills'>
    //             <Nav.Item>
    //               <Nav.Link eventKey='login'>Login</Nav.Link>
    //             </Nav.Item>
    //             <Nav.Item>
    //               <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
    //             </Nav.Item>
    //           </Nav>
    //         </Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <Tab.Content>
    //           <Tab.Pane eventKey='login'>
    //             <LoginForm handleModalClose={() => setShowModal(false)} />
    //           </Tab.Pane>
    //           <Tab.Pane eventKey='signup'>
    //             <SignUpForm handleModalClose={() => setShowModal(false)} />
    //           </Tab.Pane>
    //         </Tab.Content>
    //       </Modal.Body>
    //     </Tab.Container>
    //   </Modal>
    // </>
  );
};

export default AppNavbar;