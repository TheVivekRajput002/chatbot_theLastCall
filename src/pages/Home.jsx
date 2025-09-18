import React from 'react'
import './styles_home.css'
import { useEffect } from "react";

const Home = () => {

    return (
        <>
            <div class="app-container">
                <nav class="top-nav">
                    <div class="nav-container">
                        <div class="header-brand">
                            <div class="brand-icon">K</div>
                            <div class="brand-info">
                                <div class="brand-name">KrishiMitra</div>
                                <div class="brand-subtitle">फसल परामर्श</div>
                            </div>
                        </div>
                        <div class="header-actions">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header-icon lucide lucide-globe-icon lucide-globe" aria-label="भाषा बदलें"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                            <div class="notification-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header-icon lucide lucide-bell-icon lucide-bell" aria-label="सूचनाएँ"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
                                <div class="notification-badge"></div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header-icon lucide lucide-menu-icon lucide-globe" aria-label="मेनू"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
                        </div>
                    </div>
                </nav>

                <main class="app-main">
                    <div class="welcome-section">
                        <img src="https://t3.ftcdn.net/jpg/13/38/51/12/360_F_1338511220_MeoFlTMRPoovcPmtmSn0cGR2zeU4yaJFnu.jpg?auto=format&fit=crop&w=230&h=230&q=80" alt="किसान अवतार" class="user-avatar" loading="lazy" />
                        <h1 class="welcome-title">नमस्ते, श्याम जी !</h1>
                        <p class="welcome-subtitle">आज आपकी फसल के लिए क्या योजना है?</p>
                    </div>

                    <div class="tools-section">
                        <div class="section-heading">
                            <h2>कृषि उपकरण</h2>
                        </div>

                        <div class="tools-grid">
                            <div class="tool-card soil-health" data-tool="soil-health">
                                <div class="tool-icon leaf">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="मृदा स्वास्थ्य आइकन"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                                </div>
                                <div class="tool-title">मृदा स्वास्थ्य</div>
                                <div class="tool-description">मिट्टी का विश्लेषण</div>
                            </div>

                            <div class="tool-card weather" data-tool="weather">
                                <div class="tool-icon cloud">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="मौसम आइकन"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v6" /><path d="M8 14v6" /><path d="M12 16v6" /></svg>
                                </div>
                                <div class="tool-title">मौसम</div>
                                <div class="tool-description">अद्यतन और पूर्वानुमान</div>
                            </div>

                            <div class="tool-card crop" data-tool="crop">
                                <div class="tool-icon camera">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="फसल आइकन"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" /><circle cx="12" cy="13" r="3" /></svg>
                                </div>
                                <div class="tool-title">फसल</div>
                                <div class="tool-description">रोग और कीट पहचान</div>
                            </div>

                            <div class="tool-card market" data-tool="market">
                                <div class="tool-icon rupee">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="बाज़ार आइकन"><path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" /></svg>
                                </div>
                                <div class="tool-title">बाज़ार</div>
                                <div class="tool-description">भाव और लाभ दर</div>
                            </div>

                            <div class="tool-card voice-chat" data-tool="voice-chat">
                                <div class="tool-icon mic">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="वॉइस चैट आइकन"><path d="M12 19v3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><rect x="9" y="2" width="6" height="13" rx="3" /></svg>
                                </div>
                                <div class="tool-title">वॉइस चैट</div>
                                <div class="tool-description">विशेषज्ञ से पूछें</div>
                            </div>

                            <div class="tool-card seeds" data-tool="seeds">
                                <div class="tool-icon book">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="सीड्स आइकन"><path d="M12 21V7" /><path d="m16 12 2 2 4-4" /><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" /></svg>
                                </div>
                                <div class="tool-title">सीड्स</div>
                                <div class="tool-description">बीज और गुणवत्ता</div>
                            </div>
                        </div>
                    </div>

                    <div class="learning-section">
                        <div class="section-heading">
                            <h2>क्विज़</h2>
                        </div>

                        <div class="progress">
                            <div class="text">साप्ताहिक प्रगति <br /> <span>3/5 पूर्ण हुआ</span></div>
                            <svg width="80" height="80" viewBox="0 0 100 100" class="circular-progress" aria-label="साप्ताहिक प्रगति: 60% पूर्ण">
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#2196F3;stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <circle class="bg" cx="50" cy="50" r="40" stroke="#ddd" stroke-width="10"></circle>
                                <circle class="fg" cx="50" cy="50" r="40" stroke-width="10"></circle>
                                <text x="45.3" y="40.6" dy="0.1em">60%</text>
                            </svg>
                        </div>

                        <div class="learning-card" data-learning="organic-farming">
                            <div class="learning-content-wrapper">
                                <div class="learning-icon">🌱</div>
                                <div class="learning-content">
                                    <div class="learning-title">जैविक खेती की मूल बातें</div>
                                    <div class="learning-meta">
                                        <span class="learning-time">⏱ 3 min</span>
                                        <span class="difficulty-badge easy">Easy</span>
                                        <span class="points-badge">+50 pts</span>
                                    </div>
                                </div>
                            </div>
                            <div class="learning-arrow">&gt;</div>
                        </div>

                        <div class="learning-card" data-learning="pest-management">
                            <div class="learning-content-wrapper">
                                <div class="learning-icon">🦗</div>
                                <div class="learning-content">
                                    <div class="learning-title">कीट प्रबंधन</div>
                                    <div class="learning-meta">
                                        <span class="learning-time">⏱ 5 min</span>
                                        <span class="difficulty-badge medium">Medium</span>
                                        <span class="points-badge">+80 pts</span>
                                    </div>
                                </div>
                            </div>
                            <div class="learning-arrow">&gt;</div>
                        </div>

                        <div class="learning-card monsoon" data-learning="monsoon-farming">
                            <div class="learning-content-wrapper">
                                <div class="learning-icon purple">🌧️</div>
                                <div class="learning-content">
                                    <div class="learning-title">मानसून खेती</div>
                                    <div class="learning-meta">
                                        <span class="learning-time">⏱ 4 min</span>
                                        <span class="difficulty-badge easy">Easy</span>
                                        <span class="points-badge">+60 pts</span>
                                    </div>
                                </div>
                            </div>
                            <div class="learning-arrow">&gt;</div>
                        </div>

                        <div class="learning-card challenge">
                            <div class="learning-content-wrapper">
                                <div class="learning-icon orange">🏆</div>
                                <div class="learning-content">
                                    <div class="learning-title">दैनिक चुनौती</div>
                                    <div class="learning-description">आज के लिए पूरा करें</div>
                                </div>
                            </div>
                            <button class="start-button">Start</button>
                        </div>
                    </div>

                    <div class="section-heading">
                        <h2>मौसम</h2>
                    </div>

                    <div class="weather-card">
                        <div class="weather-info">
                            <div class="weather-label">आज का मौसम</div>
                            <div class="weather-temp">28°C</div>
                            <div class="weather-description">
                                <span>🌧️</span>
                                <span>हल्की बारिश की संभावना</span>
                            </div>
                        </div>
                        <div class="weather-details">
                            <div>नमी 12°</div>
                            <div>हवा 6 किमी/घंटा</div>
                        </div>
                    </div>
                    <button class="weather-button">7 दिन का पूर्वानुमान देखें</button>

                    <div class="tool-content">
                        <h2 id="tool-content-title">Tool Title</h2>
                        <p id="tool-content-description">Tool Description</p>
                        <button class="back-button">वापस</button>
                    </div>

                    <div id="start-interface" class="start-interface">
                        {/* <!-- Placeholder for new content --> */}
                        <h2>दैनिक चुनौती शुरू</h2>
                        <p>Placeholder for the new start interface (to be replaced with your code).</p>
                        <button class="back-button">वापस</button>
                    </div>
                </main>

                <footer class="app-footer">
                    Image by <a href="https://www.freepik.com">Freepik</a>
                </footer>
            </div>

            <nav class="app-nav">
                <div class="nav-item active">
                    <i class="nav-icon" data-lucide="home"></i>
                    <div class="nav-label">होम</div>
                </div>
                <div class="nav-item">
                    <i class="nav-icon" data-lucide="message-square"></i>
                    <div class="nav-label">चैट</div>
                </div>
                <div class="nav-item">
                    <i class="nav-icon" data-lucide="camera"></i>
                    <div class="nav-label">स्कैन</div>
                </div>
                <div class="nav-item">
                    <i class="nav-icon" data-lucide="trending-up"></i>
                    <div class="nav-label">ट्रेंड्स</div>
                </div>
                <div class="nav-item">
                    <i class="nav-icon" data-lucide="user"></i>
                    <div class="nav-label">प्रोफाइल</div>
                </div>
            </nav>

        </>
    )
}

export default Home;