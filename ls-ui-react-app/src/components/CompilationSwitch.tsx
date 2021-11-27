/** @jsxImportSource @emotion/react */
import {useState} from 'react'; 
import {css} from "@emotion/react";

type CompilationSwitchProps = {
  compilation_text: string,
}

function CompilationSwitch({compilation_text}:CompilationSwitchProps) { 
  
  const [checked, setChecked] = useState(false); 
  const handleChange = () => { 
    setChecked(!checked); 
  }; 
  // console.log("comp text",compilation_text)
  return ( 
    
    <div>
      <div className="form-check form-switch">
        <input 
            className="form-check-input lg-checkbox" type="checkbox" id="flexSwitchCheckDefault" onChange={handleChange}>
        </input>
        <label className="form-check-label p-1">Display Compilation</label>
      </div>


      {checked ? 
        <div id="compilation-text" css={css`width:50%`}>
              {/* {console.log("comp text",compilation_text)} */}
              {compilation_text}
        </div> : <div></div>
      }
    </div>

  ); 
  
}; 

export default CompilationSwitch;