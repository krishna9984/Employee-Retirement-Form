// Employee Management System JavaScript

// Sample data for demonstration
const sampleEmployees = [
    { id: 'EMP001', name: 'KRISHNA MOHAN YADAV', password: 'emp123', category: 'Full-time' },
    { id: 'EMP002', name: 'PRITISH ', password: 'emp456', category: 'Part-time' },
    { id: 'EMP003', name: 'KALLI', password: 'emp789', category: 'Contract' }
];

const sampleAdmins = [
    { id: 'ADMIN001', password: 'admin123', name: 'Admin User' }
];

// Sample resignation applications for demo
const sampleApplications = [
    {
        employeeId: 'EMP001',
        employeeName: 'KRISHNA MOHAN YADAV',
        employeeCategory: 'Full-time',
        resignationDate: '2024-02-15',
        resignationReason: 'Better Opportunity',
        resignationDescription: 'I have received an offer for a senior position at another company that aligns better with my career goals.',
        lastWorkingDay: '2024-03-15',
        noticePeriod: 30,
        handoverNotes: 'I will complete all pending projects and train my replacement.',
        submittedDate: '2024-01-15T10:30:00.000Z',
        status: 'pending',
        adminComment: '',
        responseDate: ''
    },
    {
        employeeId: 'EMP002',
        employeeName: 'PRITISH',
        employeeCategory: 'Part-time',
        resignationDate: '2024-02-20',
        resignationReason: 'Personal Reasons',
        resignationDescription: 'Due to family commitments and personal circumstances, I need to step down from my current position.',
        lastWorkingDay: '2024-02-28',
        noticePeriod: 15,
        handoverNotes: 'All documentation is up to date and ready for handover.',
        submittedDate: '2024-01-20T14:15:00.000Z',
        status: 'accepted',
        adminComment: 'We understand your situation. Best of luck with your future endeavors.',
        responseDate: '2024-01-21'
    },
    {
        employeeId: 'EMP003',
        employeeName: 'KALLI',
        employeeCategory: 'Contract',
        resignationDate: '2024-03-01',
        resignationReason: 'Career Change',
        resignationDescription: 'I have decided to pursue a different career path in the technology sector.',
        lastWorkingDay: '2024-03-15',
        noticePeriod: 30,
        handoverNotes: 'Contract deliverables will be completed before departure.',
        submittedDate: '2024-01-25T09:45:00.000Z',
        status: 'rejected',
        adminComment: 'We would like to discuss this further. Please schedule a meeting.',
        responseDate: '2024-01-26'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to prevent navigation throttling
    setTimeout(() => {
        initializeApp();
    }, 100);
});

function initializeApp() {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Show appropriate dashboard based on user role
        if (currentUser.role === 'employee') {
            showEmployeeDashboard();
        } else if (currentUser.role === 'admin') {
            showAdminDashboard();
        }
    } else {
        // Show login page
        showLoginPage();
    }

    // Initialize role selector
    initializeRoleSelector();
    
    // Initialize forms
    initializeForms();
}

// Navigation Functions
function showLoginPage() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('employee-dashboard-section').style.display = 'none';
    document.getElementById('admin-dashboard-section').style.display = 'none';
}

function showEmployeeDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('employee-dashboard-section').style.display = 'block';
    document.getElementById('admin-dashboard-section').style.display = 'none';
    
    // Initialize employee dashboard
    initializeEmployeeDashboard();
}

function showAdminDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('employee-dashboard-section').style.display = 'none';
    document.getElementById('admin-dashboard-section').style.display = 'block';
    
    // Initialize admin dashboard
    initializeAdminDashboard();
}

// Role Selector Functionality
function initializeRoleSelector() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const loginForms = document.querySelectorAll('.login-form');

    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Update active button
            roleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            loginForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${role}-login`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// Form Initialization
function initializeForms() {
    const employeeForm = document.getElementById('employeeForm');
    const adminForm = document.getElementById('adminForm');

    if (employeeForm) {
        employeeForm.addEventListener('submit', handleEmployeeLogin);
    }

    if (adminForm) {
        adminForm.addEventListener('submit', handleAdminLogin);
    }
}

// Authentication Functions
function handleEmployeeLogin(e) {
    e.preventDefault();
    
    const empId = document.getElementById('empId').value;
    const password = document.getElementById('empPassword').value;
    
    const employee = sampleEmployees.find(emp => emp.id === empId && emp.password === password);
    
    if (employee) {
        // Store user session
        setCurrentUser({
            id: employee.id,
            name: employee.name,
            role: 'employee',
            category: employee.category
        });
        
        // Show employee dashboard
        showEmployeeDashboard();
    } else {
        showNotification('Invalid Employee ID or Password', 'error');
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    
    const adminId = document.getElementById('adminId').value;
    const password = document.getElementById('adminPassword').value;
    
    const admin = sampleAdmins.find(adm => adm.id === adminId && adm.password === password);
    
    if (admin) {
        // Store user session
        setCurrentUser({
            id: admin.id,
            name: admin.name,
            role: 'admin'
        });
        
        // Show admin dashboard
        showAdminDashboard();
    } else {
        showNotification('Invalid Admin ID or Password', 'error');
    }
}

// Employee Dashboard Functions
function initializeEmployeeDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'employee') {
        showLoginPage();
        return;
    }

    // Update employee info
    document.getElementById('employeeName').textContent = `Welcome, ${currentUser.name}`;
    // Note: Employee ID and Name fields are now editable, so we don't auto-fill them

    // Initialize exit form
    initializeExitForm();
    
    // Load resignation status
    loadResignationStatus();
}

function initializeExitForm() {
    const exitForm = document.getElementById('exitForm');
    if (exitForm) {
        exitForm.addEventListener('submit', handleExitFormSubmission);
    }

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('resignationDate').setAttribute('min', today);
    document.getElementById('lastWorkingDay').setAttribute('min', today);
}

function handleExitFormSubmission(e) {
    e.preventDefault();
    
    const currentUser = getCurrentUser();
    const formData = {
        employeeId: document.getElementById('employeeId').value,
        employeeName: document.getElementById('employeeNameField').value,
        employeeCategory: document.getElementById('employeeCategory').value,
        resignationDate: document.getElementById('resignationDate').value,
        resignationReason: document.getElementById('resignationReason').value,
        resignationDescription: document.getElementById('resignationDescription').value,
        lastWorkingDay: document.getElementById('lastWorkingDay').value,
        noticePeriod: document.getElementById('noticePeriod').value || 30,
        handoverNotes: document.getElementById('handoverNotes').value,
        submittedDate: new Date().toISOString(),
        status: 'pending',
        adminComment: '',
        responseDate: ''
    };

    // Save resignation application
    saveResignationApplication(formData);
    
    // Show success message
    showNotification('Resignation application submitted successfully!', 'success');
    
    // Clear form
    clearForm();
    
    // Update status display
    loadResignationStatus();
}

function clearForm() {
    document.getElementById('exitForm').reset();
    // Employee ID and Name fields are now editable, so we don't auto-fill them
}

function loadResignationStatus() {
    const currentUser = getCurrentUser();
    const applications = getResignationApplications();
    const userApplication = applications.find(app => app.employeeId === currentUser.id);
    
    const statusDisplay = document.getElementById('resignationStatus');
    
    if (userApplication) {
        const statusClass = `status-${userApplication.status}`;
        statusDisplay.innerHTML = `
            <div class="app-detail">
                <h4><i class="fas fa-info-circle"></i> Application Status</h4>
                <p><strong>Status:</strong> <span class="status-badge ${statusClass}">${userApplication.status.toUpperCase()}</span></p>
                <p><strong>Submitted Date:</strong> <span class="value">${formatDate(userApplication.submittedDate)}</span></p>
                <p><strong>Resignation Date:</strong> <span class="value">${formatDate(userApplication.resignationDate)}</span></p>
                <p><strong>Last Working Day:</strong> <span class="value">${formatDate(userApplication.lastWorkingDay)}</span></p>
                ${userApplication.adminComment ? `<p><strong>Admin Comment:</strong> <span class="value">${userApplication.adminComment}</span></p>` : ''}
                ${userApplication.responseDate ? `<p><strong>Response Date:</strong> <span class="value">${formatDate(userApplication.responseDate)}</span></p>` : ''}
            </div>
        `;
    } else {
        statusDisplay.innerHTML = '<p>No resignation submitted yet.</p>';
    }
}

// Admin Dashboard Functions
function initializeAdminDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        showLoginPage();
        return;
    }

    // Update admin info
    document.getElementById('adminName').textContent = `Welcome, ${currentUser.name}`;

    // Load applications
    loadApplications();
    
    // Initialize filters
    initializeFilters();
}

function loadApplications() {
    const applications = getResignationApplications();
    updateStatistics(applications);
    displayApplications(applications);
}

function updateStatistics(applications) {
    const total = applications.length;
    const pending = applications.filter(app => app.status === 'pending').length;
    const accepted = applications.filter(app => app.status === 'accepted').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;

    document.getElementById('totalApplications').textContent = total;
    document.getElementById('pendingApplications').textContent = pending;
    document.getElementById('acceptedApplications').textContent = accepted;
    document.getElementById('rejectedApplications').textContent = rejected;
}

function displayApplications(applications) {
    const tbody = document.getElementById('applicationsTableBody');
    tbody.innerHTML = '';

    if (applications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #666;">No applications found</td></tr>';
        return;
    }

    applications.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.employeeId}</td>
            <td>${app.employeeName}</td>
            <td>${app.employeeCategory}</td>
            <td>${formatDate(app.resignationDate)}</td>
            <td>${formatDate(app.lastWorkingDay)}</td>
            <td><span class="status-badge status-${app.status}">${app.status.toUpperCase()}</span></td>
            <td>${formatDate(app.submittedDate)}</td>
            <td>
                <button class="action-btn view-btn" onclick="viewApplication('${app.employeeId}')">
                    <i class="fas fa-eye"></i> View
                </button>
                ${app.status === 'pending' ? `
                    <button class="action-btn respond-btn" onclick="openResponseModal('${app.employeeId}')">
                        <i class="fas fa-comment"></i> Respond
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');

    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    const applications = getResignationApplications();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    let filteredApplications = applications;

    // Apply search filter
    if (searchTerm) {
        filteredApplications = filteredApplications.filter(app => 
            app.employeeId.toLowerCase().includes(searchTerm) ||
            app.employeeName.toLowerCase().includes(searchTerm)
        );
    }

    // Apply status filter
    if (statusFilter) {
        filteredApplications = filteredApplications.filter(app => app.status === statusFilter);
    }

    displayApplications(filteredApplications);
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = '';
    loadApplications();
}

// Application Detail Modal
function viewApplication(employeeId) {
    const applications = getResignationApplications();
    const application = applications.find(app => app.employeeId === employeeId);
    
    if (!application) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="app-detail">
            <h4><i class="fas fa-user"></i> Employee Information</h4>
            <p><strong>Employee ID:</strong> <span class="value">${application.employeeId}</span></p>
            <p><strong>Name:</strong> <span class="value">${application.employeeName}</span></p>
            <p><strong>Category:</strong> <span class="value">${application.employeeCategory}</span></p>
        </div>
        
        <div class="app-detail">
            <h4><i class="fas fa-calendar"></i> Resignation Details</h4>
            <p><strong>Resignation Date:</strong> <span class="value">${formatDate(application.resignationDate)}</span></p>
            <p><strong>Last Working Day:</strong> <span class="value">${formatDate(application.lastWorkingDay)}</span></p>
            <p><strong>Notice Period:</strong> <span class="value">${application.noticePeriod} days</span></p>
            <p><strong>Reason:</strong> <span class="value">${application.resignationReason}</span></p>
        </div>
        
        <div class="app-detail">
            <h4><i class="fas fa-file-alt"></i> Description</h4>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                ${application.resignationDescription}
            </p>
        </div>
        
        ${application.handoverNotes ? `
        <div class="app-detail">
            <h4><i class="fas fa-clipboard-list"></i> Handover Notes</h4>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
                ${application.handoverNotes}
            </p>
        </div>
        ` : ''}
        
        <div class="app-detail">
            <h4><i class="fas fa-info-circle"></i> Application Status</h4>
            <p><strong>Status:</strong> <span class="status-badge status-${application.status}">${application.status.toUpperCase()}</span></p>
            <p><strong>Submitted Date:</strong> <span class="value">${formatDate(application.submittedDate)}</span></p>
            ${application.responseDate ? `<p><strong>Response Date:</strong> <span class="value">${formatDate(application.responseDate)}</span></p>` : ''}
            ${application.adminComment ? `<p><strong>Admin Comment:</strong> <span class="value">${application.adminComment}</span></p>` : ''}
        </div>
    `;

    const modalFooter = document.getElementById('modalFooter');
    modalFooter.innerHTML = `
        <button class="btn-secondary" onclick="closeModal()">Close</button>
        ${application.status === 'pending' ? `
            <button class="btn-primary" onclick="openResponseModal('${application.employeeId}')">
                <i class="fas fa-comment"></i> Respond
            </button>
        ` : ''}
    `;

    document.getElementById('applicationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('applicationModal').style.display = 'none';
}

// Response Modal Functions
let currentApplicationId = null;

function openResponseModal(employeeId) {
    currentApplicationId = employeeId;
    document.getElementById('responseDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('responseModal').style.display = 'block';
}

function closeResponseModal() {
    document.getElementById('responseModal').style.display = 'none';
    document.getElementById('responseForm').reset();
    currentApplicationId = null;
}

function submitResponse() {
    const status = document.getElementById('responseStatus').value;
    const comment = document.getElementById('adminComment').value;
    const responseDate = document.getElementById('responseDate').value;

    if (!status) {
        showNotification('Please select a response status', 'error');
        return;
    }

    // Update application
    const applications = getResignationApplications();
    const applicationIndex = applications.findIndex(app => app.employeeId === currentApplicationId);
    
    if (applicationIndex !== -1) {
        applications[applicationIndex].status = status;
        applications[applicationIndex].adminComment = comment;
        applications[applicationIndex].responseDate = responseDate;
        
        // Save updated applications
        localStorage.setItem('resignationApplications', JSON.stringify(applications));
        
        // Show success message
        showNotification(`Application ${status} successfully!`, 'success');
        
        // Close modal
        closeResponseModal();
        
        // Refresh data
        loadApplications();
    }
}

// Utility Functions
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function saveResignationApplication(application) {
    const applications = getResignationApplications();
    applications.push(application);
    localStorage.setItem('resignationApplications', JSON.stringify(applications));
}

function getResignationApplications() {
    const applications = localStorage.getItem('resignationApplications');
    if (applications) {
        return JSON.parse(applications);
    } else {
        // Load sample data for demo
        localStorage.setItem('resignationApplications', JSON.stringify(sampleApplications));
        return sampleApplications;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function logout() {
    localStorage.removeItem('currentUser');
    showLoginPage();
}

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Close modals when clicking outside
window.onclick = function(event) {
    const applicationModal = document.getElementById('applicationModal');
    const responseModal = document.getElementById('responseModal');
    
    if (event.target === applicationModal) {
        closeModal();
    }
    if (event.target === responseModal) {
        closeResponseModal();
    }
}
