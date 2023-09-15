
function clock (){
  const now = new Date();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let radius = canvas.height/2;

  // Setup Canvas
  ctx.save(); // Save the default state
  ctx.clearRect(0 ,0 ,500 ,500);
  ctx.translate(250, 250);
  ctx.rotate(-Math.PI / 2) // Rotate clock -90 deg

  // Set default styles
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 32;
  ctx.strokeStyle = '#7161AA';
  ctx.arc(0, 0, 200, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour lines
  ctx.save();
  ctx.strokeStyle = '#EF5146';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(170, 0);
    ctx.lineTo(180, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute lines
  ctx.save();
  ctx.strokeStyle = '#1D3C4E';
  ctx.lineWidth = 2;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(175, 0);
      ctx.lineTo(180, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

 // Draw hour hand
 ctx.save();
 ctx.rotate(
   (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
 );
 ctx.strokeStyle = '#00ABC5';
 ctx.lineWidth = 14;
 ctx.beginPath();
 ctx.moveTo(0, 0);
 ctx.lineTo(110, 0);
 ctx.stroke();
 ctx.restore();

  // Draw min hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = '#5D5F5E';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(120, 0);
  ctx.stroke();
  ctx.restore();

  // Draw sec hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = '#FF7F50';
  ctx.fillStyle = '#FF7F50';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(120, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  drawNumbers(ctx, radius);

  ctx.restore(); // restore default state

  console.log(`${hr}:${min}:${sec}`);

  requestAnimationFrame(clock);
}

function drawNumbers(ctx, radius) {
  ctx.rotate(Math.PI / 2) // Rotate clock -90 deg
  ctx.font = 24 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  ctx.fillStyle = 'black';
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.60);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.60);
    ctx.rotate(-ang);
    console.log(ang);
  }
}


requestAnimationFrame(clock);

