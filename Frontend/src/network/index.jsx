import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/calc.css'
import React from 'react'

function ThemeChange() {
    const [i, changei] = useState(0);
    const [i2, changei2] = useState(0);
    const [indexElement, changeElement] = useState(0);
  
    const backgroundThemes = ["blueBackground", "blackBackground", "whiteBackground"];
    const themes = ["whiteButton", "whiteButton", "blueButton"];
    const themes2 = ["blueButton", "blackButton", "whiteButton"];
    const elementThemes = ["whiteElement", "whiteElement", "blueElement"];
  
    const applyTheme = (index) => {
      document.body.classList.remove(...backgroundThemes);
      document.body.classList.add(backgroundThemes[index]);
  
      const buttons = document.getElementsByClassName("main_buttons");
      const carButt = document.getElementsByClassName("car_buttons");
      const elements = document.getElementsByClassName("element-background");
  
      for (let button of buttons) {
        button.classList.remove("whiteButton", "blueButton", "blackButton");
        button.classList.add(themes[index]);
      }
  
      for (let button of carButt) {
        button.classList.remove("whiteButton", "blueButton", "blackButton");
        button.classList.add(themes2[index]);
      }
  
      for (let element of elements) {
        element.classList.remove("whiteElement", "blueElement", "blackElement");
        element.classList.add(elementThemes[index]);
      }
    };
  
    useEffect(() => {
      applyTheme(0);
    }, []);
  
    const CycleTheme = () => {
      const nextIndex = (i + 1) % themes.length;
      changei(nextIndex);
      changei2((i2 + 1) % themes2.length);
      changeElement((indexElement + 1) % elementThemes.length);
  
      applyTheme(nextIndex);
    };
  
    return (
      <div id='themebox'>
        <button className="main_buttons" id='themebutton' onClick={CycleTheme}>
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </button>
      </div>
    );
  }





createRoot(document.getElementById('rootmain')).render(
    <StrictMode>
        <ThemeChange/>      
    </StrictMode>
  )

createRoot(document.getElementById('carousel-box')).render(
    <StrictMode>
        <Carousel/>
    </StrictMode>
  )
  