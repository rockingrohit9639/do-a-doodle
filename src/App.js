import React, { useEffect, useRef, useState } from "react";
import './App.css';

function App()
{

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) =>
  {
    const { offsetX, offsetY } = nativeEvent;
    console.log(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const endDrawing = () =>
  {
    console.log(false);
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({ nativeEvent }) =>
  {
    const { offsetX, offsetY } = nativeEvent;
    if(!isDrawing) return;

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }


  useEffect(() =>
  {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

    window.addEventListener("resize", () =>
    {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    })

  }, []);





  return (
    <div className="App">

      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
      >
      </canvas>

    </div>
  );
}

export default App;
