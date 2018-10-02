const simpleContext = document.getElementById('simple').getContext('2d')
const ornamentContext = document.getElementById('ornament').getContext('2d')
const muarContext = document.getElementById('muar').getContext('2d')

const params = {
    width: 1000,
    centerX: 300,
    centerY: 300,
    acc: 400,
    R: 15,
    N: 100,
    m: 0.12,
    R1: 100,
    N1: 300,
    R2: 200
}

const funcX = (R, m) => (t) => {
    return R * (Math.cos(t) + Math.cos(m * t) / m)
}
const funcY = (R, m) => (t) => {
    return R * (Math.sin(t) + Math.sin(m * t) / m)
}


const func = (R, m) => (t) => {
    return {
        x: funcX(R, m)(t),
        y: funcY(R, m)(t)
    }
}

const degreesToRadians = (degrees) => degrees * Math.PI / 180

const getModelDrawer = (context, N, acc, R, m) => (centerX, centerY) => {
    let movePoint = (p) => {
        return {
            x: p.x + centerX,
            y: p.y + centerY
        }
    }
    let f = func(R, m);
    let step = N * Math.PI / acc;
    let point = movePoint(f(0));
    context.beginPath()
    context.moveTo(point.x, point.y);
    for (let i = 1; i < acc; i++) {
        point = movePoint(f(i * step))
        context.lineTo(point.x, point.y);
    }
    context.stroke();
}

const drawOrnament = (drawer, centerX, centerY) => (n, r) => {
    const angle = 360 / n
    for (let i = 0; i < n; i++) {
        const x = centerX + Math.cos(degreesToRadians(angle * i)) * r;
        const y = centerY + Math.sin(degreesToRadians(angle * i)) * r;

        drawer(x, y);
    }
}

const drawMuar = (drawer, centerX, centerY, r) => (L, N1) => {
    var scale = 3 * Math.PI / N1;
    var step = L / N1
    for (let i = 0; i < N1; i++) {
        const x = centerX + i * step;
        const y = centerY + Math.cos(i * scale) * r;

        drawer(x, y);
    }
}

// params.R = calculateRadius(params.A);
let simpleDrawer = getModelDrawer(simpleContext, params.N, params.acc, params.R, params.m);
simpleDrawer(params.centerX, params.centerY);
let ornamentDrawer = getModelDrawer(ornamentContext, params.N, params.acc, params.R, params.m);
drawOrnament(ornamentDrawer, params.centerX, params.centerY)(params.N, params.R1)
let muarDrawer = getModelDrawer(muarContext, params.N, params.acc, params.R, params.m);
drawMuar(muarDrawer, params.centerY - 150, params.centerY + 200, params.R2)(params.width, params.N1);