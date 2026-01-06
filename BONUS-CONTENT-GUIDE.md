# Bonus Content System - Quick Guide

## Overview
Your bonus content system is now set up with three main components:

1. **bonus-content.html** - Main hub page where readers browse all bonus content
2. **bonus/** folder - Contains individual bonus content pages
3. **Links from books.html** - Direct links from each book card to its bonus content section

## Current Structure

```
Author Site/
├── bonus-content.html          (Main hub)
├── books.html                  (Updated with links)
├── bonus/
│   ├── TEMPLATE.md            (Template for new pages)
│   └── eras-end-magic-system.html  (Example page)
└── [other site files]
```

## How to Add New Bonus Content

### Quick Steps:
1. Create a new HTML file in the `bonus/` folder (use TEMPLATE.md as a guide)
2. Add a card for it in bonus-content.html under the right project section
3. That's it!

### Detailed Example:

**Step 1:** Create `bonus/eras-end-world-map.html`
- Copy the template from TEMPLATE.md
- Replace placeholders with your content
- Save in the bonus/ folder

**Step 2:** Add to bonus-content.html
Find the Era's End section and add:
```html
<div class="bonus-item">
    <h3><a href="bonus/eras-end-world-map.html">World Map</a></h3>
    <p>An interactive map showing the regions and locations in Era's End.</p>
</div>
```

## Navigation Flow

Readers can access bonus content three ways:

1. **From the nav bar:** Any page → "Bonus Content" button → bonus-content.html
2. **From Books page:** books.html → "View bonus content →" link → jumps to that project's section on bonus-content.html
3. **Direct links:** Any bonus-content.html card → individual bonus page

## Sections and IDs

The bonus-content.html page has section IDs for each project:
- `#eras-end` - Era's End section
- `#cord-of-three` - Cord of Three section

These IDs let you link directly to a specific project's section:
- `bonus-content.html#eras-end` - Jumps straight to Era's End
- `bonus-content.html#cord-of-three` - Jumps straight to Cord of Three

## Styling Features

Your bonus content uses these CSS classes:
- `.bonus-section` - Each project section
- `.bonus-grid` - Grid layout for bonus items
- `.bonus-item` - Individual bonus content cards
- `.coming-soon` - "Coming soon" placeholder text
- `.bonus-link` - Links from book cards
- `.breadcrumb` - Navigation path on detail pages
- `.back-link` - Return link on detail pages

All of these adapt to mobile screens automatically.

## Tips for Content

### Good Bonus Content Ideas:
- Maps and geography
- Character art/designs
- Magic system details
- Deleted scenes or alternate versions
- Character interviews
- Timeline of events
- Behind-the-scenes writing notes
- Inspiration boards
- World-building deep dives

### Content Notes:
- Include spoiler warnings if needed
- Keep descriptions short and enticing
- Use consistent naming (project-name-content-type.html)
- Images should go in the main images folder

## File Naming Convention

Use this pattern for consistency:
- `projectname-content-type.html`

Examples:
- `eras-end-magic-system.html` ✓
- `eras-end-character-art.html` ✓
- `cord-dragon-species.html` ✓
- `eras-end-map.html` ✓

## Future Projects

To add a new project (e.g., "101 Prompts for Plurals"):

1. Add a new section in bonus-content.html:
```html
<section id="prompts" class="bonus-section">
    <h2>101 Prompts for Plurals</h2>
    <div class="bonus-grid">
        <!-- Add bonus items here -->
    </div>
</section>
```

2. Add link from books.html:
```html
<p class="bonus-link"><a href="bonus-content.html#prompts">View bonus content →</a></p>
```

3. Create bonus pages in the bonus/ folder as usual

## Notes

- All navigation has been updated across all pages
- The system works with your existing theme system
- Pages are mobile-responsive
- The template file (TEMPLATE.md) has the full HTML structure
- You can always look at eras-end-magic-system.html as a working example
