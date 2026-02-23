//your code here!
// script.js - Infinite scroll list for Topic Tags

// Get the list element (assuming it has id="list" or class="list")
const list = document.querySelector('#list, .list, ul, ol');
if (!list) {
    console.error('List element not found. Please check your HTML.');
}

// Counter for generating unique tag names
let tagCounter = 1;

// Array of sample topic tags for variety
const tagTemplates = [
    'JavaScript', 'CSS', 'HTML', 'React', 'Node.js', 'Bootstrap', 
    'Responsive', 'Accessibility', 'Flexbox', 'Grid', 'DOM', 
    'API', 'AJAX', 'ES6', 'TypeScript', 'Vue', 'Angular',
    'Webpack', 'Git', 'NPM', 'MongoDB'
];

// Function to create a new list item
function createTagItem() {
    const li = document.createElement('li');
    const tagName = tagTemplates[Math.floor(Math.random() * tagTemplates.length)];
    li.textContent = `${tagName} #${tagCounter++}`;
    li.className = 'topic-tag'; // Add class for styling
    return li;
}

// Initialize with 10 list items
function initializeList() {
    for (let i = 0; i < 10; i++) {
        list.appendChild(createTagItem());
    }
}

// Function to add 2 more items (infinite scroll load)
function loadMoreItems() {
    for (let i = 0; i < 2; i++) {
        list.appendChild(createTagItem());
    }
}

// Check if user has scrolled to the bottom
function isAtBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
}

// Infinite scroll handler
let loading = false; // Prevent multiple simultaneous loads

window.addEventListener('scroll', () => {
    if (isAtBottom() && !loading) {
        loading = true;
        setTimeout(() => {
            loadMoreItems();
            loading = false;
        }, 300); // Small delay for smooth UX
    }
});

// Initialize the list when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeList);

// Alternative: If using Intersection Observer (modern approach)
// Uncomment below for better performance on long lists
/*
const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0
};

function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !loading) {
                loading = true;
                setTimeout(() => {
                    loadMoreItems();
                    loading = false;
                }, 300);
            }
        });
    }, observerOptions);
    
    // Observe a sentinel element at the bottom
    const sentinel = document.createElement('div');
    sentinel.id = 'sentinel';
    list.appendChild(sentinel);
    observer.observe(sentinel);
}
*/


