simpleContext = document.getElementById('simple').getContext('2d')
const ornamentContext = document.getElementById('ornament').getContext('2d')
const muarContext = document.getElementById('muar').getContext('2d')

const params = {
    width: 1000,
    centerX: 300,
    centerY: 300,
    A: 350,
    R: 200,
    R1: 100,
    N: 100,
    N1: 300
}

const calculateRadius = (a) => {
    return a * Math.sqrt(3) / 3;
}

const getTriangleDrawer = (context) => (centerX, centerY, r, f) => {
    var ang120 = 2 * Math.PI / 3;
    context.beginPath()
    context.moveTo(centerX + Math.cos(f) * r, centerY + Math.sin(f) * r);
    context.lineTo(centerX + Math.cos(ang120 + f) * r, centerY + Math.sin(ang120 + f) * r);
    context.lineTo(centerX + Math.cos(ang120 * 2 + f) * r, centerY + Math.sin(ang120 * 2 + f) * r);
    context.lineTo(centerX + Math.cos(f) * r, centerY + Math.sin(f) * r);
    context.stroke();
}

const drawSimple = (triangleDrawer, centerX, centerY, r, f) => {
    triangleDrawer(centerX, centerY, r, f);
    triangleDrawer(centerX, centerY, r / 2, Math.PI + f);
}


const degreesToRadians = (degrees) => degrees * Math.PI / 180

const drawOrnament = (drawer, centerX, centerY, r1) => (n, r) => {
    const angle = 360 / n
    for (let i = 0; i < n; i++) {
        const x = centerX + Math.cos(degreesToRadians(angle * i)) * r;
        const y = centerY + Math.sin(degreesToRadians(angle * i)) * r;

        drawSimple(drawer, x, y, r1, -degreesToRadians(angle * i));
    }
}

const drawMuar = (drawer, centerX, centerY, r) => (L, N1) => {
    var scale = 3 * Math.PI / N1;
    var step = L / N1
    for (let i = 0; i < N1; i++) {
        const x = centerX + i * step;
        const y = centerY + Math.sin(i * scale) * r;

        drawSimple(drawer, x, y, r, scale * i);
    }
}

params.R = calculateRadius(params.A);

let simpleTriangleDrawer = getTriangleDrawer(simpleContext);
drawSimple(simpleTriangleDrawer, params.centerX, params.centerY, params.R, -Math.PI / 2);
let ornamentTriangleDrawer = getTriangleDrawer(ornamentContext);
drawOrnament(ornamentTriangleDrawer, params.centerX, params.centerY, params.R)(params.N, params.R1)
let muarTriangleDrawer = getTriangleDrawer(muarContext);
drawMuar(muarTriangleDrawer, params.centerY - 150, params.centerY + 200, params.R)(params.width, params.N1);