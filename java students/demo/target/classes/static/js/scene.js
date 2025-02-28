document.addEventListener('DOMContentLoaded', () => {
    // 初始化Three.js场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 背景渐变
    const gradientTexture = new THREE.CanvasTexture(generateGradientCanvas());
    scene.background = gradientTexture;

    // 粒子系统
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        color: 0xffffff,
        vertexColors: true
    });

    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 20; // x
        positions[i3 + 1] = (Math.random() - 0.5) * 20; // y
        positions[i3 + 2] = (Math.random() - 0.5) * 20; // z

        velocities[i3] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 10;

    // 鼠标交互
    let mouse = { x: 0, y: 0 };
    let keyboardActivity = 0;
    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener('keydown', () => {
        keyboardActivity = 1;
    });
    window.addEventListener('keyup', () => {
        keyboardActivity *= 0.95;
    });

    // 登录框3D倾斜
    const loginContainer = document.getElementById('login-container');
    window.addEventListener('mousemove', (e) => {
        const xAngle = (mouse.y * 10);
        const yAngle = (mouse.x * 10);
        loginContainer.style.transform = `perspective(1000px) rotateX(${xAngle}deg) rotateY(${yAngle}deg)`;
    });

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);

        const positions = particlesGeometry.attributes.position.array;
        const colors = particlesGeometry.attributes.color.array;

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // 边界循环
            if (positions[i3] > 10) positions[i3] = -10;
            if (positions[i3] < -10) positions[i3] = 10;
            if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
            if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
            if (positions[i3 + 2] > 10) positions[i3 + 2] = -10;
            if (positions[i3 + 2] < -10) positions[i3 + 2] = 10;

            // 鼠标交互：粒子偏移
            const dx = mouse.x * 5 - positions[i3];
            const dy = mouse.y * 5 - positions[i3 + 1];
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 2) {
                const force = (2 - distance) / 2;
                velocities[i3] += (dx / distance) * force * 0.05;
                velocities[i3 + 1] += (dy / distance) * force * 0.05;
            }

            // 键盘输入：颜色变化
            const r = 1 - keyboardActivity * 0.2;
            const g = 1 - keyboardActivity * 0.1;
            const b = 1;
            colors[i3] = r;
            colors[i3 + 1] = g;
            colors[i3 + 2] = b;
        }

        particlesGeometry.attributes.position.needsUpdate = true;
        particlesGeometry.attributes.color.needsUpdate = true;

        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    // 动态背景渐变画布
    function generateGradientCanvas() {
        const gradientCanvas = document.createElement('canvas');
        gradientCanvas.width = 2;
        gradientCanvas.height = 2;
        const gCtx = gradientCanvas.getContext('2d');
        const gradient = gCtx.createLinearGradient(0, 0, 2, 2);
        gradient.addColorStop(0, '#1a2a3a');
        gradient.addColorStop(1, '#0d1b2a');
        gCtx.fillStyle = gradient;
        gCtx.fillRect(0, 0, 2, 2);
        return gradientCanvas;
    }

    // 调整画布大小
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // 启动动画
    console.log("Starting 3D particle animation using Three.js r174...");
    animate();

    // 输入框聚焦时的粒子聚集
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            mouse.x = (e.target.getBoundingClientRect().left + e.target.offsetWidth / 2) / window.innerWidth * 2 - 1;
            mouse.y = -((e.target.getBoundingClientRect().top + e.target.offsetHeight / 2) / window.innerHeight) * 2 + 1;
        });
        input.addEventListener('input', (e) => {
            mouse.x = (e.target.getBoundingClientRect().left + e.target.offsetWidth / 2) / window.innerWidth * 2 - 1;
            mouse.y = -((e.target.getBoundingClientRect().top + e.target.offsetHeight / 2) / window.innerHeight) * 2 + 1;
        });
    });

    // 按钮点击时的波纹效果
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', (e) => {
        const rect = loginBtn.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth * 2 - 1;
        const y = -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;
        mouse.x = x;
        mouse.y = y;
    });
});