const parkingSlots = [true, true, true, true, true]; // true means available
const parkingLog = [];

document.getElementById('vehicle-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const vehicleNumber = document.getElementById('vehicle-number').value;
    parkVehicle(vehicleNumber);
});

document.getElementById('exit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const vehicleNumber = document.getElementById('exit-vehicle-number').value;
    exitVehicle(vehicleNumber);
});

function parkVehicle(vehicleNumber) {
    const slotIndex = parkingSlots.indexOf(true);
    if (slotIndex !== -1) {
        parkingSlots[slotIndex] = false; // Mark the slot as occupied
        const entryTime = new Date().toLocaleString();
        parkingLog.push({ vehicleNumber, entryTime, exitTime: '' });
        updateParkingLog();
        updateParkingSlots();
        alert(`Vehicle ${vehicleNumber} parked in Slot ${slotIndex + 1} at ${entryTime}`);
    } else {
        alert('No available parking slots.');
    }
}

function exitVehicle(vehicleNumber) {
    const logEntry = parkingLog.find(entry => entry.vehicleNumber === vehicleNumber && entry.exitTime === '');
    if (logEntry) {
        const exitTime = new Date().toLocaleString();
        logEntry.exitTime = exitTime;
        parkingSlots[parkingLog.indexOf(logEntry)] = true; // Mark the slot as available
        updateParkingLog();
        updateParkingSlots();
        alert(`Vehicle ${vehicleNumber} exited at ${exitTime}`);
    } else {
        alert('Vehicle not found or already exited.');
    }
}

function updateParkingLog() {
    const logTableBody = document.getElementById('parking-log').querySelector('tbody');
    logTableBody.innerHTML = ''; // Clear existing log
    parkingLog.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.vehicleNumber}</td>
            <td>${entry.entryTime}</td>
            <td>${entry.exitTime || 'Still Parked'}</td>
        `;
        logTableBody.appendChild(row);
    });
}

function updateParkingSlots() {
    const parkingSlotsList = document.getElementById('parking-slots');
    parkingSlotsList.querySelectorAll('.status').forEach((status, index) => {
        status.textContent = parkingSlots[index] ? 'Available' : 'Occupied';
    });
}