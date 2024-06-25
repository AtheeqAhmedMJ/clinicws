document.addEventListener('DOMContentLoaded', function() {
    // Get current date
    let currentDate = new Date().toISOString().slice(0, 10);
    // Set the date input value
    document.getElementById('date').value = currentDate;

    // Fetch medications from JSON file
    fetchMedications();
});

// Function to fetch medications from JSON file
function fetchMedications() {
    fetch('medicine.json')
        .then(response => response.json())
        .then(data => {
            // Store medications data in a global variable
            window.medicationsData = data.medications;
        })
        .catch(error => console.error('Error fetching medications:', error));
}

// Function to filter medications based on user input
function filterMedications() {
    const searchInput = document.getElementById('medication').value.toLowerCase();
    const medicationsList = document.getElementById('dropdownList');
    medicationsList.innerHTML = '';

    if (searchInput.trim() === '') {
        medicationsList.style.display = 'none';
        return;
    }

    const filteredMedications = window.medicationsData.filter(medication => {
        return medication.name.toLowerCase().includes(searchInput);
    });

    filteredMedications.forEach(medication => {
        const medicationOption = document.createElement('a');
        medicationOption.textContent = medication.name;
        medicationOption.href = '#';
        medicationOption.addEventListener('click', function(event) {
            event.preventDefault();
            document.getElementById('medication').value = medication.name;
            medicationsList.style.display = 'none';
        });
        medicationsList.appendChild(medicationOption);
    });

    medicationsList.style.display = 'block';
}

// Function to add medication to the list
function addMedication() {
    let medicationType = document.getElementById('medication-type').value;
    let medication = document.getElementById('medication').value;
    let dosage = document.getElementById('dosage').value;
    let duration = document.getElementById('duration').value;
    let quantity = document.getElementById('quantity').value;
    let food = document.getElementById('food').value;

    if (medication && dosage && duration && quantity && food) {
        let medicationsList = document.getElementById('medications-list');

        let medicationItem = document.createElement('div');
        medicationItem.className = 'medication-item';

        let typeSpan = document.createElement('span');
        typeSpan.textContent = `${medicationType}`;

        let medSpan = document.createElement('span');
        medSpan.textContent = `${medication}`;

        let doseSpan = document.createElement('span');
        doseSpan.textContent = `${dosage}`;

        let durationSpan = document.createElement('span');
        durationSpan.textContent = `${duration}`;

        let quantitySpan = document.createElement('span');
        quantitySpan.textContent = `x ${quantity}`;

        let foodSpan = document.createElement('span');
        foodSpan.textContent = `${food}`;

        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'x';
        deleteButton.onclick = function() {
            medicationItem.remove();
        };

        medicationItem.appendChild(typeSpan);
        medicationItem.appendChild(medSpan);
        medicationItem.appendChild(doseSpan);
        medicationItem.appendChild(durationSpan);
        medicationItem.appendChild(quantitySpan);
        medicationItem.appendChild(foodSpan);
        medicationItem.appendChild(deleteButton);

        medicationsList.appendChild(medicationItem);

        // Clear inputs
        document.getElementById('medication').value = '';
        document.getElementById('dosage').value = '';
        document.getElementById('duration').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('food').value = '';
    }
}

// Function to print the prescription
function printPrescription() {
    window.print();
}
window.onbeforeprint = function() {
        document.body.style.height = 'auto';
        document.body.style.overflow = 'visible';
        document.documentElement.style.height = 'auto';
        document.documentElement.style.overflow = 'visible';
        
        // Scroll to top to ensure full content is captured
        window.scrollTo(0, 0);
    };

