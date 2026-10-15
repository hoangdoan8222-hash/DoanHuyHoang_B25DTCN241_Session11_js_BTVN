
const devices = [
    {
        id: "DEV01",
        name: "Dieu hoa",
        powerWatts: 1500,
        isActive: true
    },
    {
        id: "DEV02",
        name: "Quat dien",
        powerWatts: 60,
        isActive: true
    },
    {
        id: "DEV03",
        name: "Den",
        powerWatts: 40,
        isActive: true
    }
];

const findDeviceById = (list, targetId) => {
    return list.find(device => device.id === targetId) || null;
};

const updateDeviceState = (list, targetId, updatedData) => {
    const device = findDeviceById(list, targetId);

    if (device === null) {
        console.log("Khong tim thay thiet bi:", targetId);
        return false;
    }

    if (updatedData.isActive !== undefined) {
        device.isActive = updatedData.isActive;
    }

    if (updatedData.powerWatts !== undefined) {
        if (
            typeof updatedData.powerWatts !== "number" ||
            updatedData.powerWatts < 0
        ) {
            console.log("Cong suat khong hop le.");
            return false;
        }

        device.powerWatts = updatedData.powerWatts;
    }

    console.log("Cap nhat thanh cong:", targetId);
    return true;
};

const calculateActivePower = (list) => {
    let totalPower = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i].isActive) {
            totalPower += list[i].powerWatts;
        }
    }

    return totalPower;
};

console.log("========== 1. DANH SACH BAN DAU ==========");
console.table(devices);

console.log(
    "Tong cong suat ban dau:",
    calculateActivePower(devices),
    "W"
);

console.log("========== 2. TAT DIEU HOA DEV01 ==========");

updateDeviceState(devices, "DEV01", {
    isActive: false
});

console.table(devices);

console.log(
    "Tong cong suat sau khi tat DEV01:",
    calculateActivePower(devices),
    "W"
);

console.log("========== 3. HA CONG SUAT DEN DEV03 VE 0W ==========");

updateDeviceState(devices, "DEV03", {
    powerWatts: 0
});

console.table(devices);

console.log(
    "Tong cong suat sau khi cap nhat DEV03:",
    calculateActivePower(devices),
    "W"
);

console.log("========== 4. KIEM TRA ID KHONG TON TAI ==========");

updateDeviceState(devices, "DEV99", {
    isActive: false
});

console.log("========== 5. KET QUA CUOI CUNG ==========");

console.table(devices);

const finalPower = calculateActivePower(devices);

console.log("Tong cong suat cuoi cung:", finalPower, "W");
console.log("Ket qua mong doi: 60 W");
console.log("Ket qua:", finalPower === 60 ? "CHINH XAC" : "SAI");
