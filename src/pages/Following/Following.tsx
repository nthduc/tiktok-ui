import React from 'react';
import Portal from '@/components/Portal';

const Following: React.FC = () => {

  const handlePublish = () => {

  }

  return (
    <div>
      <h1>Following</h1>
      <Portal containerId='publish-btn'>
        <button onClick={handlePublish}>Save and Publish</button>
      </Portal>
    </div>
  )
}

export default Following;





/**
  * @author - Nguyen Thai Duc
  * @course -  F8
*/