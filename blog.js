// Step 1: Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    
    // Step 2: Fetch (read) the JSON file
    fetch('blog-posts.json')
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            // Step 3: Find the container where we'll put the posts
            const container = document.getElementById('blog-posts-container');
            
            // Step 4: Get the array of posts from the data
            const posts = data.posts;
            
            // Step 5: Loop through each post and create HTML
            posts.forEach(post => {
                // Create the HTML for one blog post
                const postHTML = `
                    <div class="blog-post">
                        <h3>${post.title}</h3>
                        <p class="blog-date">${post.date}</p>
                        <p>${post.excerpt}</p>
                        <a href="posts/${post.slug}.html" class="read-more">Read more →</a>
                    </div>
                `;
                
                // Step 6: Add this post to the container
                container.innerHTML += postHTML;
            });
        })
        .catch(error => {
            // If something goes wrong, show an error message
            console.error('Error loading blog posts:', error);
        });
});
