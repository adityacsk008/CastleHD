// /api.js - Mock Backend API (EXPANDED with MovieX data)

// --- Helper function to simulate network delay ---
const simulateNetwork = (ms = 50) => new Promise(res => setTimeout(res, ms));

// --- MOCK DATABASE ---
// Helper to merge and standardize data from MovieX
const standardizeMovieXData = (movieArray, category, language) => {
    return movieArray.map((movie, index) => ({
        id: `${category.slice(0, 3)}${index}`, // Unique ID
        title: movie.title,
        description: `An exciting ${movie.genre} film.`, // Placeholder description
        poster_url: movie.imgSrc,
        genre: movie.genre.split(', '),
        release_year: Math.floor(Math.random() * (2024 - 1990 + 1)) + 1990, // Random year
        language: language || "Hindi",
        is_featured: Math.random() < 0.2,
        is_trending: Math.random() < 0.3,
        rating: (Math.random() * (9.0 - 6.5) + 6.5).toFixed(1), // Random rating
        category: category // NEW: For library filtering
    }));
};
const standardizeSeriesData = (seriesArray, category) => {
     return seriesArray.map((series, index) => ({
        id: `s-${category.slice(0, 3)}${index}`, // Unique ID
        title: series.title,
        poster_url: series.imgSrc,
        seasons: Math.floor(Math.random() * 5) + 1,
        synopsis: `A gripping ${series.genre} series that will keep you on the edge of your seat.`,
        genre: series.genre.split(', '),
        language: "Hindi",
        category: category
    }));
}


// --- DATA FROM MOVIEX ---
const popularOttMovies = standardizeMovieXData([ { title: "RRR", genre: "Action, Drama", imgSrc: "https://iili.io/F2ziUOJ.jpg" }, { title: "Darlings", genre: "Dark Comedy", imgSrc: "https://iili.io/F2ziDRs.jpg" }, { title: "Choked", genre: "Drama", imgSrc: "https://iili.io/F2ziSRa.jpg" }, { title: "Shershaah", genre: "Biographical War", imgSrc: "https://iili.io/F2zi8Hg.jpg" }, { title: "Drishyam 2", genre: "Thriller", imgSrc: "https://iili.io/F2zikUF.jpg" }, { title: "Jai Bhim", genre: "Legal Drama", imgSrc: "https://iili.io/F2zigDv.jpg" }, { title: "Freddy", genre: "Thriller", imgSrc: "https://iili.io/F2z1RHJ.jpg" }, { title: "Brahmāstra: Part One – Shiva", genre: "Fantasy Adventure", imgSrc: "https://iili.io/F2zi6Vp.jpg" }, { title: "Tanhaji: The Unsung Warrior", genre: "Historical Action", imgSrc: "https://iili.io/F2ziPiN.jpg" }, { title: "Sita Ramam", genre: "Romantic Drama", imgSrc: "https://iili.io/F2zisfI.jpg" }, { title: "Sirf Ek Bandaa Kaafi Hai", genre: "Courtroom Drama", imgSrc: "https://iili.io/F2ziLlt.jpg" }, { title: "12th Fail", genre: "Biographical Drama", imgSrc: "https://iili.io/F2ziQUX.jpg" }], 'popularOtt');
const classicHindiMovies = standardizeMovieXData([ { title: "Sholay", genre: "Action, Adventure", imgSrc: "https://iili.io/F2IW15X.jpg" }, { title: "Mughal-e-Azam", genre: "Historical Drama", imgSrc: "https://iili.io/F2IUrQI.jpg" }, { title: "Mother India", genre: "Drama", imgSrc: "https://iili.io/F2I6Ywx.jpg" }, { title: "Amar Akbar Anthony", genre: "Comedy, Action", imgSrc: "https://iili.io/F2IicrP.jpg" }, { title: "Pakeezah", genre: "Musical, Romance", imgSrc: "https://iili.io/F2IsBwJ.jpg" }, { title: "Deewar", genre: "Crime, Drama", imgSrc: "https://iili.io/F2ILSs4.jpg" }, { title: "Guide", genre: "Musical, Romance", imgSrc: "https://iili.io/F2IZyR1.jpg" }, { title: "Chupke Chupke", genre: "Comedy", imgSrc: "https://iili.io/F2IDi6x.jpg" }, { title: "Anand", genre: "Drama", imgSrc: "https://iili.io/F2T9Wqg.jpg" }, { title: "Kaagaz Ke Phool", genre: "Drama, Musical", imgSrc: "https://iili.io/F2THe3b.jpg" }], 'classicHindi');
const latestHindiMovies = standardizeMovieXData([ { title: "Animal", genre: "Action, Crime", imgSrc: "https://iili.io/F2TIfZg.jpg" }, { title: "Jawan", genre: "Action, Thriller", imgSrc: "https://iili.io/F2TIKwF.jpg" }, { title: "Pathaan", genre: "Action, Thriller", imgSrc: "https://iili.io/F2TExXR.jpg" }, { title: "12th Fail", genre: "Biographical Drama", imgSrc: "https://iili.io/F2TzDZu.jpg" }, { title: "Gadar 2", genre: "Action, Drama", imgSrc: "https://iili.io/F2Tzy6x.jpg" }, { title: "Article 370", genre: "Political Thriller", imgSrc: "https://iili.io/F2TzLy7.jpg" }, { title: "Bhediya", genre: "Comedy Horror", imgSrc: "https://iili.io/F2TIBna.jpg" }, { title: "Zara Hatke Zara Bachke", genre: "Romantic Comedy", imgSrc: "https://iili.io/F2TI2yP.jpg" }, { title: "Bhool Bhulaiyaa 2", genre: "Comedy Horror", imgSrc: "https://iili.io/F2TIH3Q.jpg" }, { title: "Rocky Aur Rani Kii Prem Kahaani", genre: "Romantic Comedy", imgSrc: "https://iili.io/F2TIFu1.jpg" }], 'latestHindi');
const popularSouthMovies = standardizeMovieXData([ { title: "Baahubali: The Beginning", genre: "Action, Fantasy", imgSrc: "https://iili.io/F2TtA6x.jpg" }, { title: "Baahubali 2: The Conclusion", genre: "Action, Fantasy", imgSrc: "https://iili.io/F2Tt1Zg.jpg" }, { title: "RRR", genre: "Action, Drama", imgSrc: "https://iili.io/F2Ttxje.jpg" }, { title: "Pushpa: The Rise", genre: "Action, Crime", imgSrc: "https://iili.io/F2TtCy7.jpg" }, { title: "KGF Chapter 1", genre: "Action, Crime", imgSrc: "https://iili.io/F2TtBvS.jpg" }, { title: "KGF Chapter 2", genre: "Action, Crime", imgSrc: "https://iili.io/F2Ttqa2.jpg" }, { title: "Sita Ramam", genre: "Romantic Drama", imgSrc: "https://iili.io/F2TtzZu.jpg" }, { title: "Jai Bhim", genre: "Legal Drama", imgSrc: "https://iili.io/F2TtTCb.jpg" }, { title: "Master", genre: "Action, Thriller", imgSrc: "https://iili.io/F2TtuGj.jpg" }, { title: "Vikram", genre: "Action, Thriller", imgSrc: "https://iili.io/F2Tt53Q.jpg" }], 'popularSouth', 'South');
const bollywoodBlockbusters = standardizeMovieXData([ { title: "Mission Mangal", genre: "Drama, Sci-Fi", imgSrc: "https://iili.io/F2AfPzG.jpg" }, { title: "Gadar 2", genre: "Action, Drama", imgSrc: "https://iili.io/F2AqdLx.jpg" }, { title: "BHARAT", genre: "Drama", imgSrc: "https://iili.io/F2Aq3qQ.webp" }, { title: "War", genre: "Action, Thriller", imgSrc: "https://iili.io/F2Af4bs.jpg" }, { title: "Kabir Singh", genre: "Romantic Drama", imgSrc: "https://iili.io/F2Afg5X.jpg" }, { title: "Fighter", genre: "Action, Aerial", imgSrc: "https://iili.io/F2AfUJt.jpg" }, { title: "Dangal", genre: "Biographical Sport", imgSrc: "https://iili.io/F2AfiXf.jpg" }, { title: "Sultan", genre: "Sport, Drama", imgSrc: "https://iili.io/F2Afss4.jpg" }], 'bollywood');
const financialScamMovies = standardizeMovieXData([ { title: "The Big Bull", genre: "Financial Scam", imgSrc: "https://iili.io/F2ksfcX.jpg" }, { title: "Baazaar", genre: "Financial Thriller", imgSrc: "https://iili.io/F2ksKFt.jpg" }, { title: "Special 26", genre: "Heist", imgSrc: "https://iili.io/F2ks3PI.jpg" }, { title: "Guru", genre: "Biographical Drama", imgSrc: "https://iili.io/F2ks2MN.jpg" }, { title: "Rocket Singh", genre: "Comedy Drama", imgSrc: "https://iili.io/F2ksC9s.jpg" }], 'financialScam');
const politicalCrimeMovies = standardizeMovieXData([ { title: "Raid", genre: "Political Crime", imgSrc: "https://iili.io/F2vk5Ga.jpg" }, { title: "Satyagraha", genre: "Political Crime", imgSrc: "https://iili.io/F2vklvp.jpg" }, { title: "Madras Cafe", genre: "Political Crime", imgSrc: "https://iili.io/F2vk3Qe.jpg" }, { title: "Article 15", genre: "Political Crime", imgSrc: "https://iili.io/F2vkKCu.jpg" }, { title: "Section 375", genre: "Courtroom Drama", imgSrc: "https://iili.io/F2vk2j9.jpg" }], 'politicalCrime');
const gangsterCrimeMovies = standardizeMovieXData([ { title: "Gangs of Wasseypur", genre: "Gangster Crime", imgSrc: "https://iili.io/F28LbQj.jpg" }, { title: "Satya", genre: "Gangster Crime", imgSrc: "https://iili.io/F28LpCx.jpg" }, { title: "Company", genre: "Gangster Crime", imgSrc: "https://iili.io/F28LrB4.jpg" }, { title: "D-Day", genre: "Gangster Crime", imgSrc: "https://iili.io/F28LShG.jpg" }, { title: "Raees", genre: "Gangster Crime", imgSrc: "https://iili.io/F28L8Is.jpg" }], 'gangsterCrime');
const popularWebSeries = standardizeSeriesData([ { title: "Mirzapur", genre: "Crime Thriller", imgSrc: "https://iili.io/F27Hhgt.jpg" }, { title: "The Family Man", genre: "Spy Thriller", imgSrc: "https://iili.io/F27HyrP.jpg" }, { title: "Asur 2", genre: "Crime Thriller", imgSrc: "https://iili.io/F27HOes.jpg" }, { title: "Sacred Games", genre: "Crime Thriller", imgSrc: "https://iili.io/F27HN7n.jpg" }, { title: "Paatal Lok", genre: "Crime Thriller", imgSrc: "https://iili.io/F27HSLl.jpg" }, { title: "Farzi", genre: "Crime Thriller", imgSrc: "https://iili.io/F39aGXj.jpg" }, { title: "Scam 1992", genre: "Biographical Crime", imgSrc: "https://iili.io/F27Hr1S.jpg" }, { title: "Panchayat", genre: "Comedy Drama", imgSrc: "https://iili.io/F27HgB2.jpg" }], 'popularSeries');
const cyberCrimeSeries = standardizeSeriesData([ { title: "Jamtara", genre: "Cyber Crime", imgSrc: "https://iili.io/F2ksTV2.jpg" }, { title: "Hacked", genre: "Cyber Crime", imgSrc: "https://iili.io/F2SWFta.jpg" }, { title: "Hello Mini", genre: "Cyber Crime", imgSrc: "https://iili.io/F2SWocN.jpg" }, { title: "Chakravyuh – Inspector Virkar", genre: "Cyber Crime", imgSrc: "https://iili.io/F2SWBPR.jpg" }, { title: "Breathe: Into the Shadows", genre: "Cyber Crime", imgSrc: "https://iili.io/F2SWqMv.jpg" }, { title: "Rudra: The Edge of Darkness", genre: "Cyber Crime", imgSrc: "https://iili.io/F2SWfoJ.jpg" }], 'cyberCrime');

// --- ORIGINAL CASTLE HD DATA ---
const originalMovies = [
    { id: 1, title: "Dune: Part Two", year: 2024, poster_url: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", genre: ["Sci-Fi", "Action"], language: "English", isNew: true, isTrending: true, rating: 8.5, description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family." },
    { id: 2, title: "Godzilla x Kong", year: 2024, poster_url: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGs_3f8sRGYxGv6Ie.jpg", genre: ["Action", "Sci-Fi"], language: "English", isNew: true, isPopular: true, rating: 7.8, description: "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins." },
    { id: 4, title: "Oppenheimer", year: 2023, poster_url: "https://image.tmdb.org/t/p/w500/8GKIyM4FVo29crn5bSclIHsY2SA.jpg", genre: ["Drama", "History"], language: "English", isTrending: true, isPopular: true, rating: 8.6, description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb." },
    { id: 6, title: "The Dark Knight", year: 2008, poster_url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", genre: ["Action", "Crime", "Drama"], language: "English", isPopular: true, rating: 9.0, description: "Batman must accept one of the greatest psychological tests of his ability to fight injustice." },
    { id: 7, title: "Inception", year: 2010, poster_url: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq27gApcjBMS0gPSC.jpg", genre: ["Action", "Sci-Fi"], language: "English", isPopular: true, rating: 8.8, description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
    { id: 14, title: "The Conjuring", year: 2013, poster_url: "https://image.tmdb.org/t/p/w500/wVYfK9tC4sXyJp3CGLkAyh1w8P2.jpg", genre: ["Horror", "Thriller"], language: "English", rating: 7.5, description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse." },
    { id: 17, "title": "Interstellar", "year": 2014, "poster_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", "genre": ["Adventure", "Drama", "Sci-Fi"], "language": "English", "isPopular": true, "rating": 8.6, "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
];
const originalSeries = [
    { id: 101, title: "Breaking Bad", poster_url: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", seasons: 5, synopsis: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.", genre: ["Crime", "Drama", "Thriller"], language: "English" },
    { id: 102, title: "Game of Thrones", poster_url: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg", seasons: 8, synopsis: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.", genre: ["Sci-Fi", "Fantasy", "Action"], language: "English" },
    { id: 104, title: "Stranger Things", poster_url: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", seasons: 4, synopsis: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and one strange little girl.", genre: ["Sci-Fi", "Horror", "Mystery"], language: "English" },
];


// --- FINAL COMBINED DATABASE ---
const moviesData = [
    ...originalMovies,
    ...popularOttMovies, ...classicHindiMovies, ...latestHindiMovies, ...popularSouthMovies, ...bollywoodBlockbusters, ...financialScamMovies, ...politicalCrimeMovies, ...gangsterCrimeMovies
];
const seriesData = [
    ...originalSeries,
    ...popularWebSeries, ...cyberCrimeSeries
];

let myList = [1, 'pop0', 'cla1', 's-pop0']; // Default items in "My List"

// --- API Functions ---

// GET /movies
const getMovies = async (filters = {}) => {
    await simulateNetwork();
    let result = [...moviesData];
    if (filters.isNew) result = result.filter(m => m.isNew);
    if (filters.isTrending) result = result.filter(m => m.isTrending);
    if (filters.isPopular) result = result.filter(m => m.isPopular);
    if (filters.genre) result = result.filter(m => m.genre.map(g => g.toLowerCase()).includes(filters.genre.toLowerCase()));
    if (filters.language) result = result.filter(m => m.language === filters.language);
    if (filters.year) result = result.filter(m => m.year == filters.year);
    if (filters.category) result = result.filter(m => m.category === filters.category); // Filter by new category property
    if (filters.sort === 'rating_desc') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return result;
};

// GET /series
const getSeries = async (filters = {}) => {
    await simulateNetwork();
    let result = [...seriesData];
    if (filters.genre) result = result.filter(s => s.genre.map(g => g.toLowerCase()).includes(filters.genre.toLowerCase()));
    if (filters.language) result = result.filter(s => s.language === filters.language);
    if (filters.category) result = result.filter(s => s.category === filters.category);
    return result;
};

// GET /content/:id
const getContentById = async (id) => {
    await simulateNetwork();
    // ID can be number or string now
    return moviesData.find(m => m.id == id) || seriesData.find(s => s.id == id);
}

// GET /mylist
const getMyList = async () => {
    await simulateNetwork();
    const listMovies = moviesData.filter(m => myList.includes(m.id));
    const listSeries = seriesData.filter(s => myList.includes(s.id));
    return [...listMovies, ...listSeries];
};

// POST /mylist/add
const addToMyList = async (contentId) => {
    await simulateNetwork();
    if (!myList.includes(contentId)) {
        myList.push(contentId);
    }
    return { success: true, list: myList };
};

// DELETE /mylist/remove/:id
const removeFromMyList = async (contentId) => {
    await simulateNetwork();
    myList = myList.filter(id => id !== contentId);
    return { success: true, list: myList };
};

// GET /search?q=...
const searchContent = async (query) => {
    await simulateNetwork(150); // Search might be slower
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    const allContent = [...moviesData, ...seriesData];
    return allContent.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
        (item.synopsis && item.synopsis.toLowerCase().includes(lowerQuery))
    );
};

// GET /legal/terms
const getLegalContent = async (type) => {
    await simulateNetwork();
    if (type === 'terms') {
        return { title: 'Terms of Use', content: `These are the terms and conditions for using Castle HD. By using our app, you agree to these terms...` };
    }
    if (type === 'privacy') {
        return { title: 'Privacy Policy', content: `Your privacy is important to us. This policy explains what data we collect and why...` };
    }
    return { title: 'Not Found', content: 'This document was not found.' };
}



// /script.js - Frontend Application Logic (UPGRADED)

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('app-container');
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    // --- State Management ---
    let currentPage = 'home';
    let myWatchlist = [];

    // --- Templating Functions ---
    const createContentTile = (item, inList) => `
        <div class="content-tile" data-id="${item.id}">
            <img src="${item.poster_url}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">
            ${item.isNew ? '<div class="tile-label">New</div>' : ''}
            <button class="add-to-list-btn ${inList ? 'in-list' : ''}" data-id="${item.id}">
                ${inList ? '✓' : '+'}
            </button>
            <div class="tile-info">
                <h4 class="tile-title">${item.title}</h4>
            </div>
        </div>
    `;
    
    const createSection = (title, content) => {
        if (!content || content.trim() === '') return ''; // Don't render empty sections
        return `
        <div class="content-section">
            <h3 class="section-title">${title}</h3>
            <div class="content-carousel">
                ${content}
            </div>
        </div>
    `};

    // --- Animation Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const observeTiles = (container) => {
        const tiles = container.querySelectorAll('.content-tile');
        tiles.forEach(tile => observer.observe(tile));
    };

    // --- Rendering Functions ---

    const renderHomePage = async () => {
        const homePage = document.getElementById('page-home');
        homePage.innerHTML = '<h2>Loading...</h2>';
        
        try {
            const [newReleases, trending, popular, crime, romance] = await Promise.all([
                getMovies({ isNew: true }),
                getMovies({ isTrending: true }),
                getMovies({ isPopular: true }),
                getMovies({ genre: 'Crime' }),
                getMovies({ genre: 'Romance' }),
            ]);

            const newReleasesHtml = newReleases.map(m => createContentTile(m, myWatchlist.includes(m.id))).join('');
            const trendingHtml = trending.map(m => createContentTile(m, myWatchlist.includes(m.id))).join('');
            const popularHtml = popular.map(m => createContentTile(m, myWatchlist.includes(m.id))).join('');
            const crimeHtml = crime.map(m => createContentTile(m, myWatchlist.includes(m.id))).join('');
            const romanceHtml = romance.map(m => createContentTile(m, myWatchlist.includes(m.id))).join('');

            homePage.innerHTML = `
                ${createSection('New Releases', newReleasesHtml)}
                ${createSection('Trending Now', trendingHtml)}
                ${createSection('Popular on Castle HD', popularHtml)}
                ${createSection('Gripping Crime Thrillers', crimeHtml)}
                ${createSection('Heartfelt Romance', romanceHtml)}
            `;
            observeTiles(homePage);
        } catch (error) {
            homePage.innerHTML = '<h2>Failed to load content. Please try again later.</h2>';
        }
    };
    
    const renderDiscoverPage = async (filters = {}) => {
        const discoverGrid = document.getElementById('discover-grid');
        discoverGrid.innerHTML = '<p>Searching...</p>';
        
        // Render Tags
        const tagsContainer = document.getElementById('tags-container');
        const tags = ['Bollywood', 'South', 'OTT Releases', 'Trending', 'New', 'Action', 'Romantic', 'Comedy', 'Thriller', 'Sci-Fi', 'Crime'];
        tagsContainer.innerHTML = tags.map(tag => `<button class="tag-btn" data-tag="${tag}">${tag}</button>`).join('');

        const allContent = await searchContent(filters.query || '');
        let results = filters.query ? allContent : [...(await getMovies(filters)), ...(await getSeries(filters))];
        
        if (filters.genre) results = results.filter(item => item.genre.map(g=>g.toLowerCase()).includes(filters.genre.toLowerCase()));
        if (filters.language) results = results.filter(item => item.language === filters.language);
        
        if (results.length === 0) {
            discoverGrid.innerHTML = '<p>No results found for your criteria.</p>';
            return;
        }

        discoverGrid.innerHTML = results.map(item => createContentTile(item, myWatchlist.includes(item.id))).join('');
        observeTiles(discoverGrid);
    };

    // NEW: Expanded Library Page Render
    const renderLibraryPage = async () => {
        const moviesContent = document.getElementById('library-movies-content');
        const seriesContent = document.getElementById('library-series-content');
        moviesContent.innerHTML = '<h2>Loading Movies...</h2>';
        seriesContent.innerHTML = '<h2>Loading Series...</h2>';

        // Fetch all categorized data in parallel
        const [
            popularOtt, classicHindi, latestHindi, popularSouth, bollywood,
            financial, political, gangster, popularSeries, cyberCrimeSeries
        ] = await Promise.all([
            getMovies({ category: 'popularOtt' }), getMovies({ category: 'classicHindi' }),
            getMovies({ category: 'latestHindi' }), getMovies({ category: 'popularSouth' }),
            getMovies({ category: 'bollywood' }), getMovies({ category: 'financialScam' }),
            getMovies({ category: 'politicalCrime' }), getMovies({ category: 'gangsterCrime' }),
            getSeries({ category: 'popularSeries' }), getSeries({ category: 'cyberCrime' })
        ]);

        // Build HTML for Movie sections
        moviesContent.innerHTML = `
            ${createSection('Popular on OTT', popularOtt.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
            ${createSection('Latest Hindi Movies', latestHindi.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
            ${createSection('Bollywood Blockbusters', bollywood.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
            ${createSection('Popular South Indian', popularSouth.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
            ${createSection('Classic Hindi Cinema', classicHindi.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
            <h2 style="text-align:center; margin: 2rem 0 1rem;">Based on Crime & Scams</h2>
            ${createSection('Financial & Corporate Scam', financial.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
            ${createSection('Political Corruption', political.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
            ${createSection('Underworld & Gangster', gangster.map(m => createContentTile(m, myWatchlist.includes(m.id))).join(''))}
        `;
        observeTiles(moviesContent);
        
        // Build HTML for Series sections
        seriesContent.innerHTML = `
            ${createSection('Trending Indian Series', popularSeries.map(s => createContentTile(s, myWatchlist.includes(s.id))).join(''))}
            ${createSection('Cyber Crime & Tech Thrillers', cyberCrimeSeries.map(s => createContentTile(s, myWatchlist.includes(s.id))).join(''))}
        `;
        observeTiles(seriesContent);
    };

    const renderMyListPage = async () => {
        const myListGrid = document.getElementById('my-list-grid');
        myListGrid.innerHTML = '<p>Loading your list...</p>';

        const items = await getMyList();

        if (items.length === 0) {
            myListGrid.innerHTML = '<p>Your list is empty. Add movies and shows to see them here.</p>';
            return;
        }

        myListGrid.innerHTML = items.map(item => createContentTile(item, true)).join('');
        observeTiles(myListGrid);
    };

    // --- Navigation ---
    const navigateTo = (pageName) => {
        currentPage = pageName;
        pages.forEach(page => page.classList.toggle('active', page.id === `page-${pageName}`));
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.page === pageName));

        switch (pageName) {
            case 'home': renderHomePage(); break;
            case 'discover': renderDiscoverPage(); break;
            case 'library': renderLibraryPage(); break;
            case 'my-list': renderMyListPage(); break;
        }
        window.scrollTo(0, 0);
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => navigateTo(button.dataset.page));
    });

    // --- Event Listeners and Handlers ---

    // My List button clicks (Event Delegation)
    mainContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('add-to-list-btn')) {
            const button = e.target;
            const contentId = isNaN(parseInt(button.dataset.id)) ? button.dataset.id : parseInt(button.dataset.id);
            const isInList = button.classList.contains('in-list');

            if (isInList) {
                await removeFromMyList(contentId);
                button.classList.remove('in-list');
                button.innerHTML = '+';
            } else {
                await addToMyList(contentId);
                button.classList.add('in-list');
                button.innerHTML = '✓';
            }
            
            if (currentPage === 'my-list') renderMyListPage();
            
            const listData = await getMyList();
            myWatchlist = listData.map(item => item.id);
        }
    });

    // Discover Page: Search Input
    let searchTimeout;
    document.getElementById('search-input').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderDiscoverPage({ query: e.target.value });
        }, 300);
    });

    // Discover Page: Tag Clicks (Event Delegation)
    document.getElementById('tags-container').addEventListener('click', (e) => {
        if(e.target.classList.contains('tag-btn')) {
            const tag = e.target.dataset.tag;
            document.getElementById('search-input').value = tag;
            renderDiscoverPage({ query: tag });
        }
    });

    // Discover Page: Filter Button
    document.getElementById('filter-btn').addEventListener('click', () => {
        const filters = {
            genre: document.getElementById('genre-filter').value,
            language: document.getElementById('lang-filter').value,
        };
        Object.keys(filters).forEach(key => filters[key] === '' && delete filters[key]);
        renderDiscoverPage(filters);
    });

    // Library Page Toggle
    document.getElementById('show-movies-btn').addEventListener('click', (e) => {
        document.getElementById('library-movies-content').style.display = 'block';
        document.getElementById('library-series-content').style.display = 'none';
        e.target.classList.add('active');
        document.getElementById('show-series-btn').classList.remove('active');
    });
     document.getElementById('show-series-btn').addEventListener('click', (e) => {
        document.getElementById('library-movies-content').style.display = 'none';
        document.getElementById('library-series-content').style.display = 'block';
        e.target.classList.add('active');
        document.getElementById('show-movies-btn').classList.remove('active');
    });

    // "More" page actions and Modal controls (omitted for brevity, same as before)
     const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const showModal = (title, body) => {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-body').innerHTML = body;
        modalContainer.classList.add('show');
    };
    const showLegalModal = async (type) => {
        const { title, content } = await getLegalContent(type);
        showModal(title, content);
    }
    const hideModal = () => modalContainer.classList.remove('show');
    modalCloseBtn.addEventListener('click', hideModal);
    modalContainer.addEventListener('click', (e) => { if (e.target === modalContainer) hideModal(); });
    document.getElementById('page-more').addEventListener('click', (e) => {
        const item = e.target.closest('.more-menu-item');
        if (!item) return;
        const action = item.dataset.action;
        switch(action) {
            case 'notifications': const toggle = document.getElementById('notifications-toggle'); showModal('Notifications', `Push notifications are now ${toggle.checked ? 'ENABLED' : 'DISABLED'}.`); break;
            case 'email-support': window.location.href = "mailto:support@castlehd.com?subject=App Feedback"; break;
            case 'terms': showLegalModal('terms'); break;
            case 'rate-app': showModal('Rate App', 'You will be redirected to the Play Store.'); break;
            case 'share-app': if (navigator.share) { navigator.share({ title: 'Castle HD', text: 'Watch your favorite movies in HD – Download Castle HD now!', url: window.location.href }); } else { showModal('Share App', 'Use this link to share: ' + window.location.href); } break;
        }
    });


    // --- Initial Load ---
    const initializeApp = async () => {
        const listData = await getMyList();
        myWatchlist = listData.map(item => item.id);
        navigateTo('home');
    };

    initializeApp();
});
