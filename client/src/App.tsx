import "./assets/css/app.css";
import FrontEndLayout from "./layouts/front-end/layout";
import Home from "./pages/home";
import "simplebar-react/dist/simplebar.min.css";

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
