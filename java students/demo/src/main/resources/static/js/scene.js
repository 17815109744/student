// scene.js
document.addEventListener('DOMContentLoaded', () => {
    // Three.js 3D 背景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-canvas').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
    const spheres = [];
    for (let i = 0; i < 50; i++) {
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50
        );
        scene.add(sphere);
        spheres.push(sphere);
    }

    camera.position.z = 50;

    function animate() {
        requestAnimationFrame(animate);
        spheres.forEach(sphere => {
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();

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
        e.preventDefault();
        loginBtn.classList.add('loading');
        setTimeout(() => {
            loginBtn.classList.remove('loading');
            window.location.href = '/home'; // 模拟登录成功跳转
        }, 2000);
    });
});