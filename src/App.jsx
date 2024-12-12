import React from 'react';
import Partition from './components/Partition/Partition';
import { generateRandomColor } from './hooks/useGenerateColor';
import { usePartitions } from './hooks/usePartions';


function App() {

  const {partitions} = usePartitions();
  console.log(partitions);

  const color = generateRandomColor();
  console.log(color);

  const partions = usePartitions();
  console.log(partions);

  return <div className=''>
    {
      partitions.map((partition, index) => {
        return <Partition key={index} partition={partition} />
      })
    }
  </div>;
}

export default App;
