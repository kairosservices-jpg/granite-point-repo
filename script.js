document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Hero Background Slow Zoom
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('loaded');
    }, 100);

    // 3. Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 4. Chatbot Widget Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const chatOptions = document.getElementById('chatOptions');

    // Toggle window visibility
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Helper: Append a message bubble to the chat window
    const appendMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg';
        if (isUser) {
            msgDiv.style.background = 'var(--color-accent-light)';
            msgDiv.style.color = 'var(--color-accent)';
            msgDiv.style.marginLeft = '40px';
            msgDiv.style.marginRight = '0';
            msgDiv.style.borderBottomLeftRadius = 'var(--radius-sm)';
            msgDiv.style.borderBottomRightRadius = '0';
        } else {
            msgDiv.style.marginRight = '40px';
        }
        msgDiv.innerHTML = text;
        
        // Insert message right before the quick options
        chatBody.insertBefore(msgDiv, chatOptions);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Handle Quick Reply Options
    const handleOptionSelect = (e) => {
        if (e.target.classList.contains('chat-option-btn')) {
            const userMsg = e.target.getAttribute('data-reply');
            appendMessage(userMsg, true);
            chatOptions.style.display = 'none'; // Hide options while typing

            // Simulate bot processing delay
            setTimeout(() => {
                let botReply = '';
                
                // Knowledge base matching logic corresponding to SOP
                if (userMsg.includes('schedule')) {
                    botReply = "I can definitely help with that! You can call us at (555) 123-4567 or request an appointment directly from our <a href='#contact'>booking section</a>. Would you like help scheduling an appointment?";
                } else if (userMsg.includes('services')) {
                    botReply = "We offer 1-on-1 treatments including Vestibular Therapy, Aquatic Therapy, Pelvic Floor Rehab, Dry Needling, and more. *Note: I cannot diagnose conditions or provide specific treatment recommendations.* Please speak to our clinic staff if you are unsure. Would you like help scheduling an appointment?";
                } else if (userMsg.includes('insurance')) {
                    botReply = "We accept most major insurances (Medicare, BlueCross, Regence, etc.) and do not require a referral for most plans. Would you like help scheduling an appointment?";
                } else if (userMsg.includes('located')) {
                    botReply = "We have two convenient North Idaho locations in Sandpoint and Athol. Our regular hours are Monday-Friday. Would you like help scheduling an appointment?";
                } else {
                    botReply = "I am a virtual assistant and cannot provide medical advice. Please contact our front desk for assistance with your specific condition. Would you like help scheduling an appointment?";
                }
                
                appendMessage(botReply, false);

                // Reveal options again after reply
                setTimeout(() => {
                    chatOptions.style.display = 'flex';
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 800);
            }, 750);
        }
    };

    if (chatOptions) {
        chatOptions.addEventListener('click', handleOptionSelect);
    }
});
