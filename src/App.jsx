import "./App.scss";
import Maker from "./Maker/Maker";

export default function App() {
  return (
    <main className="app">
      <nav>Nav Buttons Maker for Bellshade</nav>
      <div className="container">
        <Maker key="prev" name="Prev" />
        <Maker key="next" name="Next" />
      </div>
    </main>
  );
}
