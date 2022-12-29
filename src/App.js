import { Route, Routes } from 'react-router-dom';
import { CreateContainer, Header, MainContainer } from './components';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-16 md:mt-20 px-4 md:py-4 md:px-16 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />}></Route>
            <Route path="/createItem" element={<CreateContainer />}></Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
