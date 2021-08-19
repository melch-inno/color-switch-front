import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';


export async function getColors(endpoint, options) {
  console.log(`${BASE_URL}${endpoint}/type?type=${options}`)
  if (options === '') {
    const result = await axios.get(`${BASE_URL}/${endpoint}`)
    return result;
  } else {
    const result = await axios.get(`${BASE_URL}/${endpoint}/type?type=${options}`)
    return result;
  }
}


export async function extractColors(data) {
  const colors = [];
  data.map((color, index) => {
    if (color.type === 'rgb') {
      colors.push({
        value: `rgb(${color.red}, ${color.green}, ${color.blue})`,
        type: 'rgb',
      });
    } else if (color.type === 'hsl') {
      colors.push({
        value: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
        type: 'hsl',
      });
    }
  });
  return colors;
}

