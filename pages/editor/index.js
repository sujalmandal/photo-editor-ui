import { useRef, useState, useEffect } from 'react'
import styles from './Editor.module.css'

export default function Editor() {

  const canvasRef = useRef();
  const [context, setContext] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [draggedImage, setDraggedImage] = useState(null);
  const NO_DEPENDENCY=[];
  const [canvasX,setCanvasX] = useState(null);
  const [canvaxY,setCanvasY] = useState(null);

  /* init the component */
  useEffect(()=>{
    const canvas = canvasRef.current;
    setCanvas(canvas);
    const ctx = canvas.getContext("2d");
    setContext(ctx);
    setCanvasX(canvas.offsetLeft);
    setCanvasY(canvas.offsetTop);
  },NO_DEPENDENCY);
  
  const copyImage = ()=> {
    loadImage("https://ak.picdn.net/shutterstock/videos/15041104/thumb/1.jpg")
    .then(img => {
      context.drawImage(img,0,0);
      console.log(`w: ${img.width} | h: ${img.height}`);
    })
    .catch(err => console.error(err));
  }
  
  const clear = ()=>{
    context.clearRect(0,0,canvas.width,canvas.height);
  }

  const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
  });

  const dragStart = (e)=>{
    console.log("target : "+e.target);
    setDraggedImage(e.target);
  }

  function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  /* without this canvas won't fire drop events for some reason */
  const enableDropOnCanvas = (e)=>{
    e.preventDefault();
    return false;
  }

  const drawBox = (a,b,c,d)=>{
    context.beginPath();
    context.rect(a, b, c, d);
    context.stroke();
  }

  const dropped = (e)=>{
    console.log("image dropped!");
    console.log("target : "+e.target);
    var mousePos = getMousePos(canvas,e);
    console.log("mouseX: "+mousePos.x+" mouseY: "+mousePos.y);
    var img = draggedImage;
    context.drawImage(img,mousePos.x,mousePos.y);
    drawBox(mousePos.x,mousePos.y,img.width,img.height);
  }

  return (
    <div className={styles.flex_container}>
        <div className={styles.item_templates}>
          <img src='/template-circle.png'
             onDragStart={dragStart}
             width='64'
             height='48'
          />
          <img src='/template-rect.png'
            onDragStart={dragStart}
            width='64'
            height='48'
          />
        </div>
        <canvas 
          ref={canvasRef} 
          className={styles.item_canvas} 
          onDragOver={enableDropOnCanvas} 
          onDrop={dropped}
        ></canvas>
        <button onClick={copyImage} className={styles.item_btn}>Load Image</button>
        <button onClick={clear} className={styles.item_btn}>Clear</button>
    </div>
  )
}
