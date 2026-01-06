# Bonus Content Template

This is a template for creating new bonus content pages. Copy this file and customize it for each piece of bonus content you want to add.

## Steps to Add New Bonus Content:

### 1. Create the Bonus Content Page
Copy the template below and save it in the `bonus/` folder with a descriptive filename like:
- `eras-end-world-map.html`
- `cord-character-art.html`
- `eras-end-deleted-scene-1.html`

### 2. Update bonus-content.html
Add a new item in the appropriate section (Era's End or Cord of Three):

```html
<div class="bonus-item">
    <h3><a href="bonus/YOUR-FILENAME.html">Title of Bonus Content</a></h3>
    <p>Brief description of what this content contains.</p>
</div>
```

### 3. Page Template
Use this HTML structure for each bonus content page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YOUR TITLE - Bonus Content</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cutive&display=swap" rel="stylesheet">
</head>
<body class="text-page">
    <nav>
        <div class="nav-container">
            <div class="nav-links">
                <a href="../index.html" class="nav-button" title="Home page">Home</a>
                <a href="../blog.html" class="nav-button" title="Read our blog posts">Blog</a>
                <a href="../books.html" class="nav-button" title="View our books and stories">Books</a>
                <a href="../bonus-content.html" class="nav-button active" title="Bonus content for our stories">Bonus Content</a>
                <a href="../about.html" class="nav-button" title="Learn about us">About</a>
            </div>
            <div class="theme-switcher">
                <button class="theme-btn" data-theme="light" onclick="setTheme('light')" aria-label="Light theme" title="Switch to light theme">☀️</button>
                <button class="theme-btn active" data-theme="colorful" onclick="setTheme('colorful')" aria-label="Colorful theme" title="Switch to colorful theme">🌈</button>
                <button class="theme-btn" data-theme="dark" onclick="setTheme('dark')" aria-label="Dark theme" title="Switch to dark theme">🌙</button>
            </div>
        </div>
    </nav>

    <div class="container">
        <nav class="breadcrumb">
            <a href="../bonus-content.html">Bonus Content</a> › 
            <a href="../bonus-content.html#PROJECT-ID">Project Name</a> › 
            Page Title
        </nav>

        <article>
            <h1>Your Content Title</h1>
            
            <p><em>Optional spoiler warning or content note goes here.</em></p>

            <!-- Your content goes here -->
            <h2>Section Heading</h2>
            <p>Your content...</p>

            <!-- You can add images like this: -->
            <!-- <img src="../images/your-image.png" alt="Description" style="max-width: 100%; height: auto;"> -->

            <div class="back-link">
                <a href="../bonus-content.html#PROJECT-ID">← Back to Project Name Bonus Content</a>
            </div>
        </article>
    </div>

    <footer>
        <div class="pencils"></div>
        <div class="social-bar">
            <a href="https://tumblr.com/yourusername" target="_blank" title="Follow us on Tumblr">Tumblr</a>
            <a href="https://bsky.app/profile/yourusername" target="_blank" title="Follow us on Bluesky">Bluesky</a>
        </div>
    </footer>
    <script src="../theme.js"></script>
</body>
</html>
```

### 4. Remember to Replace:
- `YOUR TITLE` - The title for your bonus content
- `PROJECT-ID` - Either `eras-end` or `cord-of-three`
- `Project Name` - Either "Era's End" or "Cord of Three"
- `Page Title` - The title of this specific bonus content page

## Content Ideas:
- Character art and designs
- World maps
- Magic system details
- Deleted scenes
- Character backstories
- Timeline of events
- Cultural details
- Language/naming guides
- Inspiration and references
- Behind-the-scenes writing process
