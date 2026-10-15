
const devices = [
    {
        id: "AC01",
        name: "Dieu hoa phong khach",
        isActive: true,
        powerWatts: 1500
    },
    {
        id: "LT01",
        name: "Den ngu",
        isActive: true,
        powerWatts: 10
    }
];

const findDeviceById = (devices, targetId) => {
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].id === targetId) {
            return devices[i];
        }
    }
    return null;
};

const updateDevice = (devices, targetId, updatedData) => {
    const targetDevice = findDeviceById(devices, targetId);

    if (targetDevice === null) {
        return false;
    }

    if (updatedData.name !== undefined) {
        targetDevice.name = updatedData.name;
    }

    if (updatedData.isActive !== undefined) {
        targetDevice.isActive = updatedData.isActive;
    }

    if (updatedData.powerWatts !== undefined) {
        targetDevice.powerWatts = updatedData.powerWatts;
    }

    return true;
};

console.log("========== DANH SACH THIET BI BAN DAU ==========");
console.table(devices);

console.log("========== TEST CASE 1: TAT DIEU HOA ==========");

const result1 = updateDevice(devices, "AC01", {
    isActive: false
});

console.log("Cap nhat thanh cong:", result1);
console.table(devices);

console.log("========== TEST CASE 2: HA CONG SUAT DEN ==========");

const result2 = updateDevice(devices, "LT01", {
    powerWatts: 0
});

console.log("Cap nhat thanh cong:", result2);
console.table(devices);

console.log("========== TEST CASE 3: DOI TEN THIET BI ==========");

const result3 = updateDevice(devices, "AC01", {
    name: "Dieu hoa phong khach da cap nhat"
});

console.log("Cap nhat thanh cong:", result3);
console.table(devices);

console.log("========== TEST CASE 4: ID KHONG TON TAI ==========");

const result4 = updateDevice(devices, "XX99", {
    isActive: false
});

console.log("Cap nhat thanh cong:", result4);
console.table(devices);
