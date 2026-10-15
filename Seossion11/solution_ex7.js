
let devices = [
    {
        id: "DEV_001",
        name: "Dieu hoa",
        room: "Phong khach",
        powerWatts: 1500,
        isActive: true
    },
    {
        id: "DEV_002",
        name: "Den ngu",
        room: "Phong ngu",
        powerWatts: 10,
        isActive: true
    },
    {
        id: "DEV_003",
        name: "Quat dien",
        room: "Phong khach",
        powerWatts: 75,
        isActive: true
    }
];

const validateDevice = (newDev) => {
    if (!newDev.name || newDev.name.trim() === "") {
        return false;
    }

    if (!newDev.room || newDev.room.trim() === "") {
        return false;
    }

    if (typeof newDev.powerWatts !== "number" || newDev.powerWatts <= 0) {
        return false;
    }

    return true;
};

const createDevice = (list, newDev) => {
    if (!validateDevice(newDev)) {
        console.log("Du lieu thiet bi khong hop le.");
        return false;
    }

    const deviceNumber = list.length + 1;
    const newId = "DEV_" + String(deviceNumber).padStart(3, "0");

    const existingId = list.find(device => device.id === newId);

    if (existingId) {
        console.log("Ma thiet bi da ton tai, khong the them.");
        return false;
    }

    const device = {
        id: newId,
        name: newDev.name,
        room: newDev.room,
        powerWatts: newDev.powerWatts,
        isActive: newDev.isActive !== undefined ? newDev.isActive : true
    };

    list.push(device);
    console.log("Them thiet bi thanh cong:", newId);
    return true;
};

const readDevices = (list) => {
    console.table(list);
};

const readDevicesByRoom = (list, roomName) => {
    const result = list.filter(device => device.room === roomName);
    console.log("Thiet bi tai:", roomName);
    console.table(result);
    return result;
};

const updateDevice = (list, id, updateData) => {
    const device = list.find(item => item.id === id);

    if (!device) {
        console.log("Khong tim thay thiet bi:", id);
        return false;
    }

    if (updateData.name !== undefined) {
        if (typeof updateData.name !== "string" || updateData.name.trim() === "") {
            console.log("Ten thiet bi khong hop le.");
            return false;
        }
    }

    if (updateData.room !== undefined) {
        if (typeof updateData.room !== "string" || updateData.room.trim() === "") {
            console.log("Ten phong khong hop le.");
            return false;
        }
    }

    if (updateData.powerWatts !== undefined) {
        if (typeof updateData.powerWatts !== "number" || updateData.powerWatts < 0) {
            console.log("Cong suat khong hop le.");
            return false;
        }
    }

    if (updateData.isActive !== undefined && typeof updateData.isActive !== "boolean") {
        console.log("Trang thai thiet bi khong hop le.");
        return false;
    }

    if (updateData.name !== undefined) {
        device.name = updateData.name;
    }

    if (updateData.room !== undefined) {
        device.room = updateData.room;
    }

    if (updateData.powerWatts !== undefined) {
        device.powerWatts = updateData.powerWatts;
    }

    if (updateData.isActive !== undefined) {
        device.isActive = updateData.isActive;
    }

    console.log("Cap nhat thiet bi thanh cong:", id);
    return true;
};

const deleteDevice = (list, id) => {
    const index = list.findIndex(device => device.id === id);

    if (index === -1) {
        console.log("Khong tim thay thiet bi:", id);
        return false;
    }

    list.splice(index, 1);
    console.log("Da xoa thiet bi:", id);
    return true;
};

console.log("========== 1. DANH SACH BAN DAU ==========");
readDevices(devices);

console.log("========== 2. THEM THIET BI MOI ==========");
createDevice(devices, {
    name: "Smart TV",
    room: "Phong khach",
    powerWatts: 120
});
readDevices(devices);

console.log("========== 3. LOC THIET BI THEO PHONG ==========");
readDevicesByRoom(devices, "Phong khach");

console.log("========== 4. CAP NHAT TRANG THAI ==========");
updateDevice(devices, "DEV_001", {
    isActive: false,
    powerWatts: 0
});
readDevices(devices);

console.log("========== 5. KIEM TRA DU LIEU KHONG HOP LE ==========");
createDevice(devices, {
    name: "",
    room: "Phong ngu",
    powerWatts: 100
});

console.log("========== 6. XOA THIET BI ==========");
deleteDevice(devices, "DEV_002");
readDevices(devices);

console.log("========== 7. KIEM TRA ID KHONG TON TAI ==========");
deleteDevice(devices, "DEV_999");

console.log("========== 8. DANH SACH CUOI CUNG ==========");
readDevices(devices);
