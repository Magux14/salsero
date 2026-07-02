import { useState, useMemo } from 'react'
import { figures } from './data'
import FigureCard from './FigureCard'
import FigureModal from './FigureModal'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [selectedFigure, setSelectedFigure] = useState(null)
  const [filterFamily, setFilterFamily] = useState('todos')

  const families = ['todos', ...new Set(figures.map(f => f.family))]

  const filteredFigures = useMemo(() => {
    return figures.filter(fig => {
      const matchesSearch = fig.name.toLowerCase().includes(search.toLowerCase()) ||
        fig.steps.some(step => step.toLowerCase().includes(search.toLowerCase()))
      const matchesFamily = filterFamily === 'todos' || fig.family === filterFamily
      return matchesSearch && matchesFamily
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [search, filterFamily])

  return (
    <div className="app">
      <header className="header">
        <h1>💃 Catálogo de Figuras de Salsa</h1>
        {/* <p>Aprende y practica tus figuras favoritas</p> */}
      </header>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nombre o paso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <label>Familia:</label>
          <select value={filterFamily} onChange={(e) => setFilterFamily(e.target.value)}>
            {families.map(family => (
              <option key={family} value={family}>
                {family.charAt(0).toUpperCase() + family.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-info">
        <p>{filteredFigures.length} figura(s) encontrada(s)</p>
      </div>

      <div className="figures-grid">
        {filteredFigures.length > 0 ? (
          filteredFigures.map(figure => (
            <FigureCard
              key={figure.id}
              figure={figure}
              onSelect={setSelectedFigure}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron figuras. Intenta con otra búsqueda.</p>
          </div>
        )}
      </div>

      <FigureModal figure={selectedFigure} onClose={() => setSelectedFigure(null)} />
    </div>
  )
}

export default App
