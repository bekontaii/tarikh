const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Раздаём статические файлы из корневой директории проекта
app.use(express.static(__dirname));

// Маршруты
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/database', (req, res) => {
    res.sendFile(path.join(__dirname, 'database.html'));
});

app.get('/eras', (req, res) => {
    res.sendFile(path.join(__dirname, 'eras.html'));
});

app.get('/archaeologists', (req, res) => {
    res.sendFile(path.join(__dirname, 'archaeologists.html'));
});

app.get('/students', (req, res) => {
    res.sendFile(path.join(__dirname, 'students.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// API для получения данных об артефактах
app.get('/api/artifacts', (req, res) => {
    const artifacts = [
        {
            id: 1,
            name: "Алтын адам",
            era: "Сақ дәуірі",
            period: "Б.з.б. 5-4 ғасырлар",
            location: "Есік қорғаны, Алматы облысы",
            description: "Сақ патшасының жас жауынгерінің қаңқасы, 4000-нан астам алтын бұйымдармен бірге табылған.",
            modelUrl: "https://sketchfab.com/models/...",
            image: "/assets/golden-man.jpg"
        },
        {
            id: 2,
            name: "Түркі ескерткіштері",
            era: "Түркі қағанаты",
            period: "6-8 ғасырлар",
            location: "Монғолшық, Шығыс Қазақстан",
            description: "Ежелгі түркілердің тас ескерткіштері және балбал тастары.",
            modelUrl: "https://sketchfab.com/models/...",
            image: "/assets/turkic-stones.jpg"
        },
        {
            id: 3,
            name: "Сарайшық қаласының қалдықтары",
            era: "Алтын Орда",
            period: "13-14 ғасырлар",
            location: "Атырау облысы",
            description: "Алтын Орданың ірі сауда орталығының қалдықтары.",
            modelUrl: "https://sketchfab.com/models/...",
            image: "/assets/sarayshyk.jpg"
        }
    ];
    res.json(artifacts);
});

// API для эпох
app.get('/api/eras', (req, res) => {
    const eras = [
        {
            id: "saki",
            name: "Сақ дәуірі",
            description: "Ежелгі сақтардың мәдениеті",
            artifactCount: 12,
            color: "#CD7F32"
        },
        {
            id: "turkic",
            name: "Түркі қағанаты",
            description: "Ежелгі түркілердің мәдени мұрасы",
            artifactCount: 8,
            color: "#A9A9A9"
        },
        {
            id: "golden-horde",
            name: "Алтын Орда",
            description: "Ортағасырлық қалалар мен өнер туындылары",
            artifactCount: 15,
            color: "#8B4513"
        },
        {
            id: "kazakh-khanate",
            name: "Қазақ хандығы",
            description: "Хандар дәуірінің тарихи заттары",
            artifactCount: 10,
            color: "#228B22"
        }
    ];
    res.json(eras);
});

// API для отправки контактной формы
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Здесь обычно сохраняем в базу данных
    console.log('Новое сообщение:', { name, email, message });

    res.json({
        success: true,
        message: 'Хабарламаңыз сәтті жіберілді!',
        timestamp: new Date().toISOString()
    });
});

// API для форума - получение тем
app.get('/api/forum/topics', (req, res) => {
    const topics = [
        {
            id: 1,
            title: 'Қарақабақ қазба жұмыстарының нәтижелері',
            author: 'Археолог А.Е. Астафьев',
            date: '2 күн бұрын',
            preview: 'Қарақабақ ауылындағы қазба жұмыстарының алғашқы нәтижелері...',
            comments: 12,
            views: 45
        },
        {
            id: 2,
            title: 'Остеологиялық материалдарды талдау әдістері',
            author: 'Ғалым Е.С. Богданов',
            date: '5 күн бұрын',
            preview: 'Сүйек қалдықтарын зерттеудің заманауи әдістері...',
            comments: 8,
            views: 32
        }
    ];
    res.json(topics);
});

// API для форума - создание новой темы
app.post('/api/forum/topics', (req, res) => {
    const { title, content, author } = req.body;
    
    console.log('Новая тема форума:', { title, content, author });
    
    res.json({
        success: true,
        message: 'Тақырып сәтті қосылды!',
        topicId: Date.now()
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
    console.log(`📁 Статические файлы: http://localhost:${PORT}/index.html`);
    console.log(`🔗 API доступно: http://localhost:${PORT}/api/artifacts`);
    console.log(`\n🌍 Откройте браузер и перейдите по адресу: http://localhost:${PORT}`);
});