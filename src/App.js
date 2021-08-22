import { useEffect, useState } from 'react';
import {
  getColors, extractColors
} from './services/base-http.service';
import './css/App.scss';
import './css/switcher.scss'

const options = [
  { id: 1, label: "Select color default is Random", value: "" },
  { id: 2, label: "RGB colors", value: "rgb" },
  { id: 3, label: "HSL colors", value: "hsl" },
];
function App() {
  //Define useState
  const [generateColor, setGenerate] = useState('')
  const [theme, setTheme] = useState('');
  const [colors, setColors] = useState([]);

  //Define useEffect
  useEffect(() => {
    getThemeColors();
  }, []);

  async function getThemeColors() {
    try {
      const fetch = await getColors('color-swatch', generateColor);
      if (fetch) {
        setColors(await extractColors(fetch.data))
      }
      setTheme(colors[0].value)
    } catch (error) {
      const errorMessage = error.response;
      setTheme(errorMessage);
    }
  }

  return (
    <div className="App" style={{ backgroundColor: theme }}>
      <div className="theme-switcher">
        {colors.map((color, index) => (
          <>
            <div id="theme" onClick={() => setTheme(color.value)} style={{ backgroundColor: color.value }}></div>
            <p>{color.value}</p>
          </>
        )
        )}
      </div>

      <div className="content-box">
        <h3>Color Swatches</h3>
        <h5> * back-end to generate color swatches via an API in various
          color spaces.
        </h5>
        <h5> * Click on color to switch background.
        </h5>

      </div>
      <div className="RegeneratePanel">
        <select onChange={(event) => setGenerate(event.target.value)}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <button onClick={() => getThemeColors()}>Regenerate Colors</button>
      </div>

    </div >

  );
}

export default App;
