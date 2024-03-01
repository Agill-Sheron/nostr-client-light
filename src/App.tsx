import { Heading } from '@chakra-ui/react'
import ProjectsGrid from './components/projects/ProjectsGrid'
import './App.css'

function App() {

  return (
    <>
      <div>
        <Heading as="h1" size="xl" textAlign="center" my={5}>
          Geyser projects of the last 30 days
        </Heading>
        <ProjectsGrid />
      </div>
    </>
  )
}

export default App
