// ============================================================================
// BLOG PAGINATION SYSTEM
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
    const savedPostsPerPage = localStorage.getItem('postsPerPage');
    const savedCurrentPage = localStorage.getItem('currentPage');
    
    if (savedPostsPerPage) {
        postsPerPage = savedPostsPerPage === 'all' ? 'all' : parseInt(savedPostsPerPage);
        document.getElementById('posts-per-page').value = savedPostsPerPage;
    }
    
    if (savedCurrentPage) {
        currentPage = parseInt(savedCurrentPage);
    }
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
    fetch('blog-posts.json')
        .then(response => response.json())
        .then(data => {
            allPosts = data.posts;
            displayCurrentPage();
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog-posts-container').innerHTML = 
                '<p>Sorry, there was an error loading the blog posts.</p>';
        });
}

// ============================================================================
// DISPLAY POSTS FOR CURRENT PAGE
// ============================================================================
function displayCurrentPage() {
    const container = document.getElementById('blog-posts-container');
    container.innerHTML = ''; // Clear existing posts
    
    // If showing all posts, display them all
    if (postsPerPage === 'all') {
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
    currentPage = pageNumber;
    saveUserPreferences();
    displayCurrentPage();
}

// ============================================================================
// SETUP EVENT LISTENERS
// ============================================================================
function setupEventListeners() {
    // Listen for changes to posts-per-page dropdown
    document.getElementById('posts-per-page').addEventListener('change', function(e) {
        const value = e.target.value;
        postsPerPage = value === 'all' ? 'all' : parseInt(value);
        currentPage = 1; // Reset to first page when changing posts per page
        saveUserPreferences();
        displayCurrentPage();
    });
}
