import React from 'react';
import Partition from './components/Partition';
import { usePartitionStore } from './store/partitionStore';


function App() {

  const root = usePartitionStore((state) => state.root);


  return <div className='w-screen h-screen'>
          <Partition partition={root} isRoot />
  </div>;
}

export default App;
