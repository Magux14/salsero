import { useState, useMemo, useEffect } from 'react'
import { figures } from './data'
import { hasTag } from './utils/tags'
import AppHeader from './components/app-header/AppHeader'
import FigureFilters from './components/figure-filters/FigureFilters'
import FigureGrid from './components/figure-grid/FigureGrid'
import FigureModal from './components/figure-modal/FigureModal'
import './App.scss'

function App() {
  const [search, setSearch] = useState('')
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [filterFamily, setFilterFamily] = useState('todos');
  const [showWheel, setShowWheel] = useState(true);

  const families = useMemo(() => ['todos', ...new Set(figures.map(f => f.family))], []);

  const filteredFigures = useMemo(() => {
    const visibleFigures = showWheel ? figures : figures.filter(fig => !hasTag(fig, 'onlyCuban'));

    return visibleFigures
      .filter(fig => {
        const matchesSearch = fig.name.toLowerCase().includes(search.toLowerCase());
        const matchesFamily = filterFamily === 'todos' || fig.family === filterFamily
        return matchesSearch && matchesFamily
      })
      .sort((a, b) => (hasTag(b, 'new') - hasTag(a, 'new')) || b.difficulty - a.difficulty);
  }, [search, filterFamily, showWheel]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const figureId = params.get("id");
    if (figureId) {
      const figure = figures.find(fig => fig.id == figureId);
      if (figure) {
        setSelectedFigure(figure);
      }
    }
  }, []);

  return (
    <div className="app">
      <AppHeader />

      <FigureFilters
        search={search}
        onSearchChange={setSearch}
        families={families}
        filterFamily={filterFamily}
        onFilterFamilyChange={setFilterFamily}
        showWheel={showWheel}
        onShowWheelChange={() => setShowWheel(!showWheel)}
      />

      <FigureGrid figures={filteredFigures} onSelect={setSelectedFigure} />

      <FigureModal figure={selectedFigure} onClose={() => setSelectedFigure(null)} />
    </div>
  )
}

export default App
