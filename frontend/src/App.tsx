import './App.css';
import { Dashboard } from './components/Dashboard';

function App() {
    return (
        <>
            <header className="app-header">
                <h1>Profile Generator 🏢</h1>
            </header>
            <main className="container">
                <Dashboard />
            </main>
        </>
    );
}

export default App;