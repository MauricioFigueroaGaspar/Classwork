'use client';
import { useState } from 'react';

const HelloComponent = ({ message, alertStyle = 'bg-transparent' } : { message: string, alertStyle?: string }) => {
  return (<div className={alertStyle}><p>{message}</p></div>);
}

const Home = () => {
  const [index, setIndex] = useState<number>(0); // useState: assigns an initial value to the variable

  const onClickButton = () => {
    setIndex(index + 1);
    console.log(index);
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HelloComponent message={`Hello World ${index}`}/>
      <HelloComponent message="Give me food" alertStyle="bg-red-400"/>
      <button className="btn btn-sm" onClick={onClickButton}> Click me {index%2 === 0 ? 'Even' : 'Odd'}</button>
      {index%10 === 0 && <HelloComponent message={`Gotcha`} />}
      {index%10 === 0 ? <HelloComponent message={`Gotcha`} /> : <HelloComponent message={`Not Gotcha`} />}
    </div>
  );
}

export default Home;