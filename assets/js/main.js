/**
 * Main JavaScript for Buzdy
 * Handles navigation, mobile menu, and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Buzdy App Initialized');


    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Add sticky header shadow on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- AI Advisor Functionality ---
    const advisorTrigger = document.getElementById('ai-advisor-trigger');
    if (advisorTrigger) {
        // Inject Modal HTML
        const modalHTML = `
            <div id="ai-advisor-modal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity opacity-0 pointer-events-none">
                <div class="bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl transform scale-95 transition-transform duration-200" style="max-height: 80vh; display: flex; flex-direction: column;">
                    <!-- Header -->
                    <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#F0FDF4] rounded-t-2xl">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A3A] to-[#00A86B] flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-900">Buzdy AI Advisor</h3>
                                <p class="text-xs text-[#00A86B] font-medium">Online</p>
                            </div>
                        </div>
                        <button id="close-advisor" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    
                    <!-- Body -->
                    <div class="p-6 overflow-y-auto flex-1 space-y-4" style="min-height: 300px;">
                        <div class="flex gap-3">
                            <div class="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">🤖</div>
                            <div class="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 max-w-[85%]">
                                Hello! I'm your Buzdy AI Assistant. I can help you analyze crypto trends, check account balances, or find the nearest branch. How can I assist you today?
                            </div>
                        </div>
                        <!-- User message placeholder -->
                        <!-- <div class="flex gap-3 justify-end">
                            <div class="bg-[#00A86B] text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%]">
                                Show me Bitcoin trends.
                            </div>
                        </div> -->
                    </div>

                    <!-- Footer -->
                    <div class="p-4 border-t border-gray-100">
                        <form class="flex gap-2" onsubmit="event.preventDefault(); alert('This is a demo. AI integration coming soon!');">
                            <input type="text" placeholder="Type your message..." class="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#00A86B] focus:ring-1 focus:ring-[#00A86B] text-sm">
                            <button type="submit" class="w-10 h-10 bg-[#00A86B] text-white rounded-full flex items-center justify-center hover:bg-[#059669] transition-colors shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Logic
        const modal = document.getElementById('ai-advisor-modal');
        const closeBtn = document.getElementById('close-advisor');

        function openModal() {
            modal.classList.remove('hidden');
            // Small delay to allow display:flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modal.querySelector('div').classList.remove('scale-95');
                modal.querySelector('div').classList.add('scale-100');
            }, 10);
        }

        function closeModal() {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.querySelector('div').classList.remove('scale-100');
            modal.querySelector('div').classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        }

        advisorTrigger.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);

        // Close on clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }


    // Generic Button Handling (for unlinked buttons)
    document.querySelectorAll('button:not([type="submit"]):not(.mobile-menu-btn):not(#close-advisor)').forEach(btn => {
        // Skip if it has a click listener attached by us or framework (hard to detect, but we can check ID)
        if (!btn.id && !btn.closest('form')) {
            btn.addEventListener('click', (e) => {
                // Check if it's "Table View" or similar
                const text = btn.innerText.trim();
                // Country Selector specific
                if (btn.querySelector('img[alt="United States"]')) {
                    alert('Region selection is coming soon.');
                    return;
                }

                if (['Table View', 'Upgrade', 'Learn more'].includes(text) || text === '') {
                    // text === '' handles icon-only buttons like table view if innerText is empty
                    alert(`This feature is currently under development.`);
                }
            });
        }
    });

    // Active Link Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav a, .mobile-menu nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Simple check: matches filename
        if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('text-[#00A86B]', 'font-semibold');
            link.classList.remove('text-gray-500');
        } else if (currentPath.endsWith('/') && linkPath === 'index.html') {
            // Home page case
            link.classList.add('text-[#00A86B]', 'font-semibold');
            link.classList.remove('text-gray-500');
        }
    });

    // --- Crypto Market Tab Switching ---
    const filterTabs = document.querySelectorAll('.filter-tab-btn');
    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Reset all tabs
                filterTabs.forEach(t => {
                    t.className = 'filter-tab-btn px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors';
                });

                // Activate clicked tab
                tab.className = 'filter-tab-btn px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-semibold text-[#00A86B] transition-all';

                // Feedback
                const filterName = tab.innerText;
                // create a temporary toast
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 transition-opacity duration-300';
                toast.innerText = `Filtering by: ${filterName}`;
                document.body.appendChild(toast);

                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 300);
                }, 2000);
            });
        });
    }

});
