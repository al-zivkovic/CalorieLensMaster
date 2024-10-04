import React, { useRef, useState } from 'react';
import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router';

const Home = () => {

  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/dashboard'} />
  }

  return <Redirect href="/welcome" />
}

export default Home;
