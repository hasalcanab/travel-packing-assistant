// ======================================================
// PROJECT FINAL: Travel Packing Assistant
// STUDENT NAME: Ceyni Adan Ahmed
// STUDENT ID: C5240036
// COURSE CODE: CM241
// ======================================================

// 1. DATA: Initial packing items with Live Image Links
let packingItems = [
    { id: 1, itemName: "Passport", category: "Documents", status: "Packed", img: "https://images.unsplash.com/photo-1544333346-64670000bbd1?w=100" },
    { id: 2, itemName: "Sunscreen", category: "Personal Care", status: "Not Packed", img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100" }
];

const tableBody = document.getElementById('table-body');
const packingForm = document.getElementById('packing-form');

// 2. FUNCTION: Render the packing list to the table
function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = ""; 

    packingItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${item.img}" style="width:45px; height:45px; border-radius:8px; object-fit:cover; border:1px solid #ddd;">
                    <span>${item.itemName}</span>
                </div>
            </td>
            <td>${item.category}</td>
            <td style="color: ${item.status === 'Packed' ? '#27ae60' : '#e74c3c'}; font-weight:bold;">
                ${item.status}
            </td>
            <td>
                <button onclick="deleteItem(${item.id})" style="background:#ff4757; color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">
                    Remove
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 3. FUNCTION: Add new item (Fulfills Customization Requirement)
packingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('item-name').value;
    const cat = document.getElementById('category').value;
    const days = document.getElementById('duration').value;

    // VALIDATION: Ensures trip duration is positive (fixes your -20 error)
    if (name.trim() === "" || cat === "" || days <= 0) {
        alert("Error: Please fill all fields. Trip duration must be at least 1 day!");
        return;
    }

    packingItems.push({
        id: Date.now(),
        itemName: name,
        category: cat,
        status: "Not Packed",
        img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=100" // Default travel image
    });

    renderTable();
    this.reset();
});

// 4. FUNCTION: Delete item
function deleteItem(id) {
    if(confirm("Are you sure you want to remove this item?")) {
        packingItems = packingItems.filter(i => i.id !== id);
        renderTable();
    }
}

// Initial rendering
renderTable();