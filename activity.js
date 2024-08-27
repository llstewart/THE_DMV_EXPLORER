document.addEventListener('DOMContentLoaded', function() {
    
    let currentPage = 1;
    let searchTerm = '';
    const perPage = 10;


    // Event listener for state dropdown
    document.getElementById('stateDropdown').addEventListener('change', function() {
        const selectedState = this.value;
        loadActivities(currentPage, searchTerm, selectedState);
    });
    

            function generateStarRating(rating) {
                const maxStars = 5;
                let fullStars = Math.floor(rating);
                let halfStars = (rating - fullStars) >= 0.5 ? 1 : 0;
                let emptyStars = maxStars - fullStars - halfStars;
            
                let starsHTML = '';
                for (let i = 0; i < fullStars; i++) {
                    starsHTML += '<i class="fas fa-star" style="color: pink;"></i>';  // filled star
                }
                for (let i = 0; i < halfStars; i++) {
                    starsHTML += '<i class="fas fa-star-half-alt" style="color: pink;"></i>';  // half-filled star
                }
                for (let i = 0; i < emptyStars; i++) {
                    starsHTML += '<i class="far fa-star" style="color: pink;"></i>';  // empty star (outline)
                }
            
                return starsHTML;
            }
        
            function loadActivities(page, searchTerm = '', state = '') {
                fetch(`http://localhost:8080/api/activities?page=${page}&limit=${perPage}&search=${searchTerm}&state=${state}`)
                .then(response => response.json())
                .then(data => {
                    const activityContainer = document.getElementById('activity-container');
                    activityContainer.innerHTML = '';  // Clear current activities
        
                    data.forEach(activity => {
                        const listItem = document.createElement('div');
                        listItem.className = 'd-flex align-items-center mb-4';
                        listItem.style.borderRadius = '10px'; // Add rounded corners
                        listItem.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Add shadow
                        listItem.style.padding = '10px'; // Add padding
                        listItem.style.transition = 'transform 0.3s, box-shadow 0.3s'; // Add transitions
        
                        listItem.addEventListener('mouseenter', () => {
                            listItem.style.transform = 'scale(1.05)';
                            listItem.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                        });
        
                        listItem.addEventListener('mouseleave', () => {
                            listItem.style.transform = 'scale(1)';
                            listItem.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        });
        
                        listItem.innerHTML = `
                        <div style="flex: 0 0 150px; margin-right: 15px;">
                            <img src="${activity.image_url}" alt="${activity.name}" style="max-width: 100%; height: auto;">
                        </div>
                        <div style="flex: 1;">
                            <h5>${activity.name}</h5>
                            <p>Rating: ${generateStarRating(activity.rating)} (${activity.rating})</p>
                            <p>${activity.address}</p>
                            <p>Phone: <a href="tel:${activity.phone}" style="color: #007bff; text-decoration: none; border-bottom: 1px solid #007bff;">${activity.phone}</a></p>
                            <a href="${activity.url}" class="btn btn-primary btn-sm" target="_blank">Check it out!</a>
                        </div>
                    `;
        
                    activityContainer.appendChild(listItem);
                });
        
        
                    const paginationDiv = document.createElement('div');
                    paginationDiv.className = 'pagination-controls mt-4';
                    paginationDiv.innerHTML = `
                        <button id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
                        <span>Page ${currentPage}</span>
                        <button id="next-page">Next</button>
                    `;
        
                    activityContainer.appendChild(paginationDiv);
        
                    document.getElementById('prev-page').addEventListener('click', () => {
                        if (currentPage > 1) {
                            loadActivities(currentPage - 1, searchTerm);
                            currentPage--;
                        }
                    });
        
                    document.getElementById('next-page').addEventListener('click', () => {
                        loadActivities(currentPage + 1, searchTerm);
                        currentPage++;
                    });
                })
                .catch(error => {
                    console.error('Error fetching activities:', error);
                });
            }
        
            loadActivities(currentPage);
        
        
            // Search functionality
            const searchInput = document.getElementById('search-input');
            const searchButton = document.createElement('button');
            searchButton.textContent = "Search";
            searchInput.parentNode.appendChild(searchButton);
        
            searchButton.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default form submission
                searchTerm = searchInput.value;
                currentPage = 1; // reset to first page
                loadActivities(currentPage, searchTerm);
            });
        });
        