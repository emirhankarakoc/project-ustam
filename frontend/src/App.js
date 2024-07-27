import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./router/AppRouter";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div>
        <AppRouter />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
