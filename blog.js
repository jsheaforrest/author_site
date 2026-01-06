// ============================================================================
// BLOG PAGINATION SYSTEM - DEBUG VERSION
// ============================================================================
// This script handles displaying blog posts with pagination controls

// Global variables to track our pagination state
let allPosts = [];           // Store all posts from JSON
let currentPage = 1;         // Which page we're currently on
let postsPerPage = 10;       // How many posts to show per page

// ============================================================================
// INITIALIZATION - Runs when page loads
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing blog...');
    
    // Load saved preferences from browser storage
    loadUserPreferences();
    
    // Fetch the blog posts from JSON file
    loadBlogPosts();
    
    // Set up event listeners for controls
    setupEventListeners();
});

// ============================================================================
// LOAD USER PREFERENCES
// ============================================================================
// Check if user has saved preferences in localStorage
function loadUserPreferences() {
    console.log('Loading user preferences...');
    const savedPostsPerPage = localStorage.getItem('postsPerPage');
    const savedCurrentPage = localStorage.getItem('currentPage');
    
    if (savedPostsPerPage) {
        postsPerPage = savedPostsPerPage === 'all' ? 'all' : parseInt(savedPostsPerPage);
        const select = document.getElementById('posts-per-page');
        if (select) {
            select.value = savedPostsPerPage;
        }
    }
    
    if (savedCurrentPage) {
        currentPage = parseInt(savedCurrentPage);
    }
    console.log('Preferences loaded:', { postsPerPage, currentPage });
}

// ============================================================================
// SAVE USER PREFERENCES
// ============================================================================
// Save preferences so they persist across page reloads
function saveUserPreferences() {
    localStorage.setItem('postsPerPage', postsPerPage);
    localStorage.setItem('currentPage', currentPage);
}

// ============================================================================
// LOAD BLOG POSTS FROM JSON
// ============================================================================
function loadBlogPosts() {
    console.log('Attempting to fetch blog-posts.json...');
    
    fetch('blog-posts.json')
        .then(response => {
            console.log('Fetch response received:', response);
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON parsed successfully:', data);
            console.log('Number of posts:', data.posts ? data.posts.length : 'no posts array');
            allPosts = data.posts;
            displayCurrentPage();
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            
            const container = document.getElementById('blog-posts-container');
            if (container) {
                container.innerHTML = `
                    <p style="color: red; font-weight: bold;">Error loading blog posts:</p>
                    <p>${error.message}</p>
                    <p>Check the browser console (F12) for more details.</p>
                `;
            }
        });
}

// ============================================================================
// DISPLAY POSTS FOR CURRENT PAGE
// ============================================================================
function displayCurrentPage() {
    console.log('Displaying current page:', currentPage);
    const container = document.getElementById('blog-posts-container');
    
    if (!container) {
        console.error('Container element not found!');
        return;
    }
    
    container.innerHTML = ''; // Clear existing posts
    
    // If showing all posts, display them all
    if (postsPerPage === 'all') {
        console.log('Showing all posts');
        allPosts.forEach(post => {
            container.innerHTML += createPostHTML(post);
        });
        document.getElementById('pagination-nav').innerHTML = ''; // Hide pagination
        return;
    }
    
    // Calculate which posts to show
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = allPosts.slice(startIndex, endIndex);
    
    console.log(`Showing posts ${startIndex} to ${endIndex}:`, postsToShow.length);
    
    // Display the posts
    postsToShow.forEach(post => {
        container.innerHTML += createPostHTML(post);
    });
    
    // Update pagination controls
    updatePaginationControls();
    
    // Scroll to top of posts when page changes
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================================
// CREATE HTML FOR A SINGLE POST
// ============================================================================
function createPostHTML(post) {
    return `
        <div class="blog-post">
            <h3>${post.title}</h3>
            <p class="blog-date">${post.date}</p>
            <p>${post.excerpt}</p>
            <a href="posts/${post.slug}.html" class="read-more">Read more →</a>
        </div>
    `;
}

// ============================================================================
// UPDATE PAGINATION CONTROLS
// ============================================================================
function updatePaginationControls() {
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const paginationNav = document.getElementById('pagination-nav');
    
    if (!paginationNav) {
        console.error('Pagination nav element not found!');
        return;
    }
    
    // Don't show pagination if there's only one page or less
    if (totalPages <= 1) {
        paginationNav.innerHTML = '';
        return;
    }
    
    let html = '<div class="pagination">';
    
    // Previous button
    if (currentPage > 1) {
        html += `<button class="page-btn" onclick="goToPage(${currentPage - 1})">← Previous</button>`;
    } else {
        html += `<button class="page-btn" disabled>← Previous</button>`;
    }
    
    // Page number buttons
    // Show first page, current page area, and last page
    for (let i = 1; i <= totalPages; i++) {
        // Always show first page, last page, and pages around current page
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            if (i === currentPage) {
                html += `<button class="page-btn active">${i}</button>`;
            } else {
                html += `<button class="page-btn" onclick="goToPage(${i})">${i}</button>`;
            }
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            // Show ellipsis for skipped pages
            html += `<span class="page-ellipsis">...</span>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        html += `<button class="page-btn" onclick="goToPage(${currentPage + 1})">Next →</button>`;
    } else {
        html += `<button class="page-btn" disabled>Next →</button>`;
    }
    
    html += '</div>';
    
    // Add page info
    const startPost = (currentPage - 1) * postsPerPage + 1;
    const endPost = Math.min(currentPage * postsPerPage, allPosts.length);
    html += `<p class="page-info">Showing ${startPost}-${endPost} of ${allPosts.length} posts</p>`;
    
    paginationNav.innerHTML = html;
}

// ============================================================================
// NAVIGATE TO A SPECIFIC PAGE
// ============================================================================
function goToPage(pageNumber) {
    console.log('Going to page:', pageNumber);
    currentPage = pageNumber;
    saveUserPreferences();
    displayCurrentPage();
}

// ============================================================================
// SETUP EVENT LISTENERS
// ============================================================================
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Listen for changes to posts-per-page dropdown
    const select = document.getElementById('posts-per-page');
    if (select) {
        select.addEventListener('change', function(e) {
            console.log('Posts per page changed to:', e.target.value);
            const value = e.target.value;
            postsPerPage = value === 'all' ? 'all' : parseInt(value);
            currentPage = 1; // Reset to first page when changing posts per page
            saveUserPreferences();
            displayCurrentPage();
        });
        console.log('Event listener attached to posts-per-page');
    } else {
        console.error('Posts-per-page select element not found!');
    }
}
