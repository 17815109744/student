document.addEventListener('DOMContentLoaded', () => {
    // Three.js 3D 背景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        velocities[i] = (Math.random() - 0.5) * 0.01;
        velocities[i + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i + 2] = (Math.random() - 0.5) * 0.01;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 10;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
            if (positions[i] > 10 || positions[i] < -10) velocities[i] *= -1;
            if (positions[i + 1] > 10 || positions[i + 1] < -10) velocities[i + 1] *= -1;
            if (positions[i + 2] > 10 || positions[i + 2] < -10) velocities[i + 2] *= -1;
            const dx = mouseX * 5 - positions[i];
            const dy = mouseY * 5 - positions[i + 1];
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 2) {
                const force = (2 - distance) / 2;
                velocities[i] += (dx / distance) * force * 0.05;
                velocities[i + 1] += (dy / distance) * force * 0.05;
            }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // 密码显示/隐藏切换
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });

    // 登录按钮加载动画
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.querySelector('.login-btn');
    loginForm.addEventListener('submit', (e) => {
        loginBtn.classList.add('loading');
    });
});