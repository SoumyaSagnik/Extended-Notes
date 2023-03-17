import { useRef } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../features/theme";

const ChangeColor = () => {
  const colorRef = useRef(null);
  const dispatch = useDispatch();

  function handleColorChange() {
    dispatch(changeColor(colorRef.current.value));
  }
  return (
    <div className="color">
      <input type="text" ref={colorRef} />
      <button onClick={handleColorChange}>Change Color</button>
    </div>
  );
};

export default ChangeColor;
