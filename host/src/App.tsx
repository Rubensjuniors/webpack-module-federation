import React, { lazy, ReactNode, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem
} from 'reactstrap';


const HomePage = lazy(() => import("HomeApp/HomePage"));
const ContactPage = lazy(() => import("ContactApp/ContactPage"));

const ErrorBoundary = ({ children }: { children : ReactNode}) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar color="light" light expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/contact">Contact</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
