import './App.css'
import { GridComponent } from './components/grid/gridComponent';
// import type { GridComponentProps } from './utils/interfaces';

function App() {
  return (
    <div className='main-container-grid'>
      <GridComponent columns={["Column 1", "Column 2", "Column 3"]} rows={["Activo", "Row 2", "Row 3"]} />
    </div>
  )
}

export default App
