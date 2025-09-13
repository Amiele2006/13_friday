import React from 'react';
import './App.css';
import NavBar from './nav';
import ProfileCard from './profile-card';
import { ProfileProvider } from './provider';
import ThemeCard from './theme';
import { ThemeProvider } from './theme-provider';

function App() {
  return (
  <div className="App">
      <ProfileProvider initial={{
        name: "User",
        job: "Dev",
        email: "email",
        phone: "phone",
        age: 17,
      }}>
    <NavBar />
    <ProfileCard>
     I AM A PROFILE
    </ProfileCard>
   </ProfileProvider>
   <ThemeProvider>
    <ThemeCard/>
   </ThemeProvider>
  </div>
  );
}

export default App;

// Create a theme switcher that switches your app between light and dark mode
// Create a card that holds theme info (Theme name, Card name)
// Create a component called switcher
//Give the switcher component two buttons called light mode and dark mode
// Use usecontext to manage the state of the theme
