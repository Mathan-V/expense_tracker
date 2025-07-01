import { RouterProvider } from 'react-router-dom'
import { FrappeProvider } from 'frappe-react-sdk'
import router from './routes'

function App() {
  return (
    <FrappeProvider
      url="http://localhost:8000"
      enableSocket={true}
      socketPort={9000}
    >
      <RouterProvider router={router} />
    </FrappeProvider>
  )
}

export default App
