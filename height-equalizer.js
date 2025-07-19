// ULTRATHINK HEIGHT EQUALIZER - Dynamic Perfect Alignment System
class HeightEqualizer {
    constructor() {
        this.leftElement = null;
        this.rightElement = null;
        this.isInitialized = false;
        this.resizeObserver = null;
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.leftElement = document.querySelector('.about-visual');
        this.rightElement = document.querySelector('.about-card');
        
        if (!this.leftElement || !this.rightElement) {
            console.warn('Height Equalizer: Elements not found');
            return;
        }

        // Reset any existing heights
        this.resetHeights();
        
        // Initial equalization
        this.equalizeHeights();
        
        // Set up resize observer for dynamic adjustment
        this.setupResizeObserver();
        
        // Set up window resize listener
        window.addEventListener('resize', this.debounce(() => {
            this.equalizeHeights();
        }, 250));

        this.isInitialized = true;
        console.log('Height Equalizer: Initialized successfully');
    }

    resetHeights() {
        if (this.leftElement) {
            this.leftElement.style.height = 'auto';
            this.leftElement.style.minHeight = 'auto';
        }
        if (this.rightElement) {
            this.rightElement.style.height = 'auto';
            this.rightElement.style.minHeight = 'auto';
        }
    }

    equalizeHeights() {
        if (!this.leftElement || !this.rightElement) return;

        // Reset heights first
        this.resetHeights();

        // Force reflow
        this.leftElement.offsetHeight;
        this.rightElement.offsetHeight;

        // Get natural heights
        const leftHeight = this.getElementHeight(this.leftElement);
        const rightHeight = this.getElementHeight(this.rightElement);

        // Calculate target height (use the larger one + padding)
        const targetHeight = Math.max(leftHeight, rightHeight) + 20;

        // Apply the target height to both elements
        this.leftElement.style.height = `${targetHeight}px`;
        this.rightElement.style.height = `${targetHeight}px`;

        // Ensure flexbox centering works
        this.leftElement.style.display = 'flex';
        this.leftElement.style.flexDirection = 'column';
        this.leftElement.style.justifyContent = 'center';

        this.rightElement.style.display = 'flex';
        this.rightElement.style.flexDirection = 'column';
        this.rightElement.style.justifyContent = 'center';

        console.log(`Height Equalizer: Set both elements to ${targetHeight}px`);
        console.log(`Left natural: ${leftHeight}px, Right natural: ${rightHeight}px`);
    }

    getElementHeight(element) {
        // Get the full height including margins
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const marginTop = parseFloat(computedStyle.marginTop) || 0;
        const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
        
        return rect.height + marginTop + marginBottom;
    }

    setupResizeObserver() {
        if ('ResizeObserver' in window) {
            this.resizeObserver = new ResizeObserver(this.debounce(() => {
                this.equalizeHeights();
            }, 100));

            this.resizeObserver.observe(this.leftElement);
            this.resizeObserver.observe(this.rightElement);
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    destroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        window.removeEventListener('resize', this.equalizeHeights);
        this.resetHeights();
        this.isInitialized = false;
    }
}

// Initialize the height equalizer
const heightEqualizer = new HeightEqualizer();
heightEqualizer.init();

// Expose globally for debugging
window.heightEqualizer = heightEqualizer;
