import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import getHelloWorld from './action/getHelloWorld'

function App() {
  const [message, setMessage] = useState<string>();
  
  const onFetch = async () => {
    const message = await getHelloWorld()
    setMessage(message);
  }

  useEffect(() => {
    onFetch()
  }, [])

  return (
    <div>
        {message}
    </div>
  );
}

export default App;
