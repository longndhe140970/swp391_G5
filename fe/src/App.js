
import { Route, Routes } from 'react-router-dom';
import { ConfigRotues } from './routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <Routes>
        {
          ConfigRotues?.map?.((el) => (<Route path={el?.path} element={el?.page} />))
        }
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
