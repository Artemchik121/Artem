// ========== ДАННЫЕ ГАЛЕРЕИ С РАЗВЁРНУТЫМИ ОПИСАНИЯМИ ==========
const galleryData = [
    {
        title: "Туманность Ориона",
        desc: "Звёздное облако — колыбель новых звёзд. Туманность Ориона (M42) — одна из самых ярких и изученных областей звездообразования. Она находится на расстоянии около 1 344 световых лет от Земли. Внутри неё рождаются тысячи молодых звёзд, а её яркость позволяет увидеть её даже невооружённым глазом.",
        category: "nature",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/The_Great_Orion_Nebula_%28M42%29.jpg/500px-The_Great_Orion_Nebula_%28M42%29.jpg",
        likes: 0
    },
    {
        title: "Млечный Путь",
        desc: "Наша галактика, дом миллиардов звёзд. Млечный Путь — спиральная галактика, в которой находится наша Солнечная система. Её диаметр составляет около 100 000 световых лет, а количество звёзд достигает 400 миллиардов. С Земли мы видим её как яркую полосу, пересекающую ночное небо.",
        category: "nature",
        img: "https://avatars.mds.yandex.net/i?id=3f82fe04679ee8743cebb63f316e8921_l-4575484-images-thumbs&n=13",
        likes: 0
    },
    {
        title: "Земля из космоса",
        desc: "Наш хрупкий голубой дом. Земля — третья планета от Солнца и единственное известное место во Вселенной, где существует жизнь. С высоты космоса видно её тонкую атмосферу, океаны и континенты. Этот вид напоминает нам, насколько уникальна и уязвима наша планета.",
        category: "space",
        img: "https://avatars.mds.yandex.net/i?id=35ae95104ad526779a8e8139f787bcec_l-4346197-images-thumbs&n=13",
        likes: 0
    },
    {
        title: "Солнечная буря",
        desc: "Мощная вспышка на Солнце. Солнечные вспышки — это внезапные выбросы энергии, которые могут влиять на магнитное поле Земли. Они вызывают полярные сияния и могут нарушать работу спутников и электросетей. Самая мощная зарегистрированная вспышка произошла в 1859 году — событие Каррингтона.",
        category: "sun",
        img: "https://img.gazeta.ru/files3/484/16741484/shutterstock_2150154895-pic4_zoom-1500x1500-35071.jpg",
        likes: 0
    },
    {
        title: "Сверхновая",
        desc: "Грандиозный взрыв умирающей звезды. Сверхновая — это финальная стадия жизни массивной звезды. За несколько секунд она выделяет больше энергии, чем Солнце за всю свою жизнь. Остатки таких взрывов разлетаются по космосу, формируя новые звёзды и планеты.",
        category: "star",
        img: "https://avatars.mds.yandex.net/i?id=fe271985b81279b37e3be7dea2ff2f0e_l-16119096-images-thumbs&n=13",
        likes: 0
    },
    {
        title: "Чёрная дыра",
        desc: "Область с огромной гравитацией. Чёрная дыра — это область пространства-времени, гравитационное притяжение которой настолько велико, что её не может покинуть даже свет. В центре нашей галактики находится сверхмассивная чёрная дыра Стрелец А* массой в 4 миллиона солнечных.",
        category: "space",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Black_Hole_Full.png/1280px-Black_Hole_Full.png",
        likes: 0
    }
];

// ========== СОХРАНЕНИЕ ЛАЙКОВ В localStorage ==========
function saveLikesToStorage() {
    const likesData = galleryData.map(item => item.likes);
    localStorage.setItem('spaceGalleryLikes', JSON.stringify(likesData));
}

function loadLikesFromStorage() {
    const saved = localStorage.getItem('spaceGalleryLikes');
    if (saved) {
        const likesArray = JSON.parse(saved);
        for (let i = 0; i < galleryData.length && i < likesArray.length; i++) {
            galleryData[i].likes = likesArray[i];
        }
    }
}

// ========== ЭКРАНИРОВАНИЕ HTML ==========
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ========== ОБНОВЛЕНИЕ ОБЩЕГО СЧЁТЧИКА ЛАЙКОВ ==========
function updateTotalLikes() {
    const total = galleryData.reduce((sum, img) => sum + img.likes, 0);
    const totalSpan = document.getElementById("total-likes");
    if (totalSpan) {
        totalSpan.innerText = total;
        totalSpan.style.transform = "scale(1.1)";
        setTimeout(() => { if (totalSpan) totalSpan.style.transform = ""; }, 200);
    }
}

// ========== РЕНДЕР ГАЛЕРЕИ ==========
function renderGallery() {
    const container = document.getElementById("image-gallery");
    if (!container) return;

    loadLikesFromStorage();

    container.innerHTML = galleryData.map((item, index) => `
        <div class="image-card" data-id="${index}">
            <div class="card-image">
                <img src="${item.img}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.src='https://placehold.co/400x300/1e293b/7aa2f7?text=Image+not+found'">
                <button class="like-btn" data-id="${index}">
                    <i class="${item.likes > 0 ? 'fas' : 'far'} fa-heart"></i>
                    <span class="like-count">${item.likes}</span>
                </button>
            </div>
            <div class="card-content">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.desc)}</p>
            </div>
        </div>
    `).join("");

    const counterSpan = document.getElementById("image-counter");
    if (counterSpan) counterSpan.innerText = galleryData.length;

    updateTotalLikes();

    // Обработчики лайков на карточках
    document.querySelectorAll(".like-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            galleryData[id].likes++;

            const likeIcon = btn.querySelector("i");
            likeIcon.className = "fas fa-heart";
            likeIcon.style.animation = "likePop 0.3s ease";
            setTimeout(() => { likeIcon.style.animation = ""; }, 300);

            btn.querySelector(".like-count").innerText = galleryData[id].likes;
            btn.classList.add("liked");

            // Обновляем модалку если открыта
            if (currentModalId === id) {
                modalLikeCountSpan.textContent = galleryData[id].likes;
                const modalIcon = modalLikeBtn.querySelector('i');
                if (modalIcon) modalIcon.className = 'fas fa-heart';
                modalLikeBtn.classList.add('liked');
            }

            saveLikesToStorage();
            updateTotalLikes();
        });
    });

    // Добавляем клик по карточкам для открытия модалки
    document.querySelectorAll('.image-card').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) return;
            const id = parseInt(card.dataset.id);
            openModal(id);
        });
    });

    // Анимация появления карточек
    setTimeout(() => {
        document.querySelectorAll('.image-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}

// ========== МОДАЛЬНОЕ ОКНО ==========
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLikeBtn = document.getElementById('modalLikeBtn');
const modalLikeCountSpan = document.getElementById('modalLikeCount');
let currentModalId = null;

function openModal(index) {
    const item = galleryData[index];
    if (!item) return;

    currentModalId = index;
    modalImg.src = item.img;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.desc;
    modalLikeCountSpan.textContent = item.likes;

    const likeIcon = modalLikeBtn.querySelector('i');
    if (item.likes > 0) {
        likeIcon.className = 'fas fa-heart';
        modalLikeBtn.classList.add('liked');
    } else {
        likeIcon.className = 'far fa-heart';
        modalLikeBtn.classList.remove('liked');
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    currentModalId = null;
}

function handleModalLike() {
    if (currentModalId === null) return;

    const item = galleryData[currentModalId];
    item.likes++;

    modalLikeCountSpan.textContent = item.likes;
    const likeIcon = modalLikeBtn.querySelector('i');
    likeIcon.className = 'fas fa-heart';
    modalLikeBtn.classList.add('liked');

    modalLikeBtn.style.transform = 'scale(1.2)';
    setTimeout(() => { if (modalLikeBtn) modalLikeBtn.style.transform = ''; }, 200);

    const cardLikeBtn = document.querySelector(`.like-btn[data-id="${currentModalId}"]`);
    if (cardLikeBtn) {
        const cardLikeIcon = cardLikeBtn.querySelector('i');
        const cardLikeSpan = cardLikeBtn.querySelector('.like-count');
        if (cardLikeIcon) cardLikeIcon.className = 'fas fa-heart';
        if (cardLikeSpan) cardLikeSpan.textContent = item.likes;
        cardLikeBtn.classList.add('liked');
    }

    saveLikesToStorage();
    updateTotalLikes();
}

// Инициализация обработчиков модалки
if (modal) {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) closeModal();
    });
    if (modalLikeBtn) modalLikeBtn.addEventListener('click', handleModalLike);
}

// ========== ФОРМА КОНТАКТОВ (ВАЛИДАЦИЯ) ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';
        const agree = document.getElementById('agree')?.checked || false;
        const messageDiv = document.getElementById('formMessage');

        if (!name) {
            showFormMessage('Пожалуйста, введите ваше имя', 'error');
            return;
        }
        if (!email) {
            showFormMessage('Пожалуйста, введите email', 'error');
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            showFormMessage('Введите корректный email (пример: name@mail.ru)', 'error');
            return;
        }
        if (!message) {
            showFormMessage('Пожалуйста, напишите сообщение', 'error');
            return;
        }
        if (message.length < 5) {
            showFormMessage('Сообщение должно содержать минимум 5 символов', 'error');
            return;
        }
        if (!agree) {
            showFormMessage('Подтвердите согласие на обработку данных', 'error');
            return;
        }

        showFormMessage('✅ Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
        form.reset();
    });
}

function showFormMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type === 'error' ? 'form-error' : 'form-success'}`;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 4000);
}

// ========== АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ==========
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.image-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
}

// ========== ЗАПУСК ВСЕГО ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========
document.addEventListener("DOMContentLoaded", () => {
    renderGallery();
    initContactForm();
    animateCardsOnScroll();
});

// ========== ДОБАВЛЯЕМ CSS-АНИМАЦИЮ ЛАЙКА ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes likePop {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    .form-message {
        margin-top: 15px;
        padding: 10px;
        border-radius: 12px;
        text-align: center;
        display: none;
    }
    .form-success {
        background: rgba(34, 197, 94, 0.2);
        color: #4ade80;
        border: 1px solid #4ade80;
    }
    .form-error {
        background: rgba(239, 68, 68, 0.2);
        color: #f87171;
        border: 1px solid #f87171;
    }
`;
document.head.appendChild(style);