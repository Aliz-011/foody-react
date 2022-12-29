import { Route, Routes } from 'react-router-dom';
import { CreateContainer, Header, MainContainer } from './components';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from './context/StateProvider';
import { getAllFoods } from './utils/firebaseFunctions';
import { useEffect } from 'react';
import { actionType } from './context/reducer';

function App() {
  const [{ foods }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoods().then((data) =>
      dispatch({ type: actionType.SET_FOODS, foods: data })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

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
