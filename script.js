const parkingSlots = [
    { available: true, vehicleNumber: '', entryTime: '', exitTime: '' },
    { available: true, vehicleNumber: '', entryTime: '', exitTime: '' },
    { available: true, vehicleNumber: '', entryTime: '', exitTime: '' },
    { available: true, vehicleNumber: '', entryTime: '', exitTime: '' },
    { available: true, vehicleNumber: '', entryTime: '', exitTime: '' }
];

// Event listener for vehicle entry form
document.getElementById('vehicle-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const vehicleNumber = document.getElementById('vehicle-number').value.trim();
    if (vehicleNumber) {
        parkVehicle(vehicleNumber);
    } else {
        alert('Please enter a valid vehicle number.');
    }
});

// Event listener for vehicle exit form
document.getElementById('exit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const vehicleNumber = document.getElementById('exit-vehicle-number').value.trim();
    if (vehicleNumber) {
        exitVehicle(vehicleNumber);
    } else {
        alert('Please enter a valid vehicle number.');
    }
});

// Function to park a vehicle
function parkVehicle(vehicleNumber) {
    const slot = parkingSlots.find(slot => slot.available);
    if (slot) {
        slot.available = false; // Mark the slot as occupied
        slot.vehicleNumber = vehicleNumber;
        slot.entryTime = new Date().toLocaleString();
        updateParkingLog();
        updateParkingSlots();
        alert(`Vehicle ${vehicleNumber} parked in Slot ${parkingSlots.indexOf(slot) + 1} at ${slot.entryTime}`);
    } else {
        alert('No available parking slots.');
    }
}

// Function to exit a vehicle
function exitVehicle(vehicleNumber) {
    const slot = parkingSlots.find(slot => slot.vehicleNumber === vehicleNumber && !slot.available);
    if (slot) {
        slot.exitTime = new Date().toLocaleString();
        slot.available = true; // Mark the slot as available
        slot.vehicleNumber = ''; // Clear vehicle number
        slot.entryTime = ''; // Clear entry time
        updateParkingLog();
        updateParkingSlots();
        alert(`Vehicle ${vehicleNumber} exited at ${slot.exitTime}`);
    } else {
        alert('Vehicle not found or already exited.');
    }
}

// Function to update the parking log table
function updateParkingLog() {
    const logTableBody = document.getElementById('parking-log').querySelector('tbody');
    logTableBody.innerHTML = ''; // Clear existing log
    parkingSlots.forEach((slot, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${slot.vehicleNumber || 'N/A'}</td>
            <td>${slot.entryTime || 'N/A'}</td>
            <td>${slot.exitTime || 'Still Parked'}</td>
        `;
        logTableBody.appendChild(row);
    });
}

// Function to update the parking slots display
function updateParkingSlots() {
    const parkingSlotsList = document.getElementById('parking-slots');
    parkingSlotsList.querySelectorAll('.status').forEach((status, index) => {
        status.textContent = parkingSlots[index].available ? 'Available' : 'Occupied';
    });
}

// Function to receive data from Arduino
function receiveDataFromArduino(data) {
    const { vehicleNumber, action } = data; // Assuming data is an object with vehicleNumber and action
    if (action === 'park') {
        parkVehicle(vehicleNumber);
    } else if (action === 'exit') {
        exitVehicle(vehicleNumber);
    }
}

// Example of how to handle incoming data from Arduino (pseudo-code)
function setupArduinoCommunication() {
    // This is a placeholder for actual communication setup
    // For example, using WebSockets or AJAX to listen for data from Arduino
    // On receiving data, call receiveDataFromArduino(data);
}
