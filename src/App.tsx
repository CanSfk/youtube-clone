import "./assets/css/app.css";
import FrontEndLayout from "./layouts/front-end/layout";
import Home from "./pages/home";

function App() {
  return (
    <>
      <FrontEndLayout>
        <Home />
      </FrontEndLayout>
    </>
  );
}

export default App;
