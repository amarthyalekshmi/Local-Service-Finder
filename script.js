const API_URL = 'http://localhost:8000/api/services/'; // Replace with your API URL

document.addEventListener('DOMContentLoaded', () => {
    fetchServices();
    document.getElementById('back-button').addEventListener('click', () => {
        document.getElementById('service-list').style.display = 'block';
        document.getElementById('service-detail').style.display = 'none';
    });
});

async function fetchServices() {
    try {
        const response = await fetch(API_URL);
        const services = await response.json();
        displayServices(services);
    } catch (error) {
        console.error('Error fetching services:', error);
    }
}

function displayServices(services) {
    const servicesList = document.getElementById('services');
    servicesList.innerHTML = '';

    services.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="showServiceDetail(${service.id}); return false;">${service.name} - ${service.category}</a>`;
        servicesList.appendChild(li);
    });
}

async function showServiceDetail(id) {
    try {
        const response = await fetch(`${API_URL}${id}/`);
        const service = await response.json();
        displayServiceDetail(service);
    } catch (error) {
        console.error('Error fetching service details:', error);
    }
}

function displayServiceDetail(service) {
    document.getElementById('service-list').style.display = 'none';
    document.getElementById('service-detail').style.display = 'block';

    const serviceInfo = document.getElementById('service-info');
    serviceInfo.innerHTML = `
        <p><strong>Name:</strong> ${service.name}</p>
        <p><strong>Category:</strong> ${service.category}</p>
        <p><strong>Description:</strong> ${service.description}</p>
        <p><strong>Address:</strong> ${service.address}</p>
        <p><strong>Phone:</strong> ${service.phone}</p>
        <p><strong>Email:</strong> ${service.email}</p>
    `;
}
