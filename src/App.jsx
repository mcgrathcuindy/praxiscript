import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FileSystem from './components/FileSystem'
import ListScheduler from './components/ListScheduler'
import { SelectedFileViewer } from './components/SelectedFileViewer'

function App() {

  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div>
      <ListScheduler />
      <FileSystem selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
      <SelectedFileViewer 
        node={selectedNode ? selectedNode : null}
      />
    </div>
  )
}

export default App
