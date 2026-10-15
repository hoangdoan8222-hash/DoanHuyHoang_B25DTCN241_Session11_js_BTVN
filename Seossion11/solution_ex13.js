
const MAX_POWER_WATTS = 2500;

let devices = [
    {
        id: "DEV_001",
        name: "Den phong ngu",
        room: "Phong ngu",
        type: "light",
        powerWatts: 20,
        isActive: false,
        connected: true
    },
    {
        id: "DEV_002",
        name: "Dieu hoa",
        room: "Phong ngu",
        type: "airConditioner",
        powerWatts: 1800,
        isActive: true,
        connected: true
    },
    {
        id: "DEV_003",
        name: "TV",
        room: "Phong khach",
        type: "tv",
        powerWatts: 150,
        isActive: true,
        connected: true
    },
    {
        id: "DEV_004",
        name: "Den phong khach",
        room: "Phong khach",
        type: "light",
        powerWatts: 30,
        isActive: true,
        connected: false
    },
    {
        id: "DEV_005",
        name: "Binh nuoc nong",
        room: "Phong tam",
        type: "heater",
        powerWatts: 2000,
        isActive: true,
        connected: true
    }
];

const validateDevice = (dev) => {
    if (!dev || typeof dev !== "object") {
        return false;
    }

    if (typeof dev.name !== "string" || dev.name.trim() === "") {
        return false;
    }

    if (typeof dev.room !== "string" || dev.room.trim() === "") {
        return false;
    }

    if (typeof dev.powerWatts !== "number" ||
        !Number.isFinite(dev.powerWatts) ||
        dev.powerWatts <= 0) {
        return false;
    }

    if (typeof dev.isActive !== "boolean") {
        return false;
    }

    if (typeof dev.connected !== "boolean") {
        return false;
    }

    return true;
};

const createDevice = (list, dev) => {
    if (!validateDevice(dev)) {
        console.log("Du lieu thiet bi khong hop le.");
        return false;
    }

    const duplicate = list.find(
        item => item.name === dev.name && item.room === dev.room
    );

    if (duplicate) {
        console.log("Thiet bi nay da ton tai trong phong.");
        return false;
    }

    let maxId = 0;

    for (let i = 0; i < list.length; i++) {
        const number = Number(list[i].id.replace("DEV_", ""));

        if (Number.isInteger(number) && number > maxId) {
            maxId = number;
        }
    }

    const newDevice = {
        id: "DEV_" + String(maxId + 1).padStart(3, "0"),
        name: dev.name,
        room: dev.room,
        type: dev.type || "other",
        powerWatts: dev.powerWatts,
        isActive: dev.isActive,
        connected: dev.connected
    };

    list.push(newDevice);

    console.log("Them thiet bi thanh cong:", newDevice.id);
    return true;
};

const readDevices = (list) => {
    console.table(list);
};

const updateDevice = (list, id, updateData) => {
    const device = list.find(item => item.id === id);

    if (!device) {
        console.log("Khong tim thay thiet bi:", id);
        return false;
    }

    if (!device.connected) {
        console.log("Thiet bi mat ket noi:", device.name);
        return false;
    }

    if (updateData.isActive !== undefined &&
        typeof updateData.isActive !== "boolean") {
        console.log("Trang thai cap nhat khong hop le.");
        return false;
    }

    if (updateData.powerWatts !== undefined &&
        (typeof updateData.powerWatts !== "number" ||
         !Number.isFinite(updateData.powerWatts) ||
         updateData.powerWatts < 0)) {
        console.log("Cong suat cap nhat khong hop le.");
        return false;
    }

    if (updateData.name !== undefined) {
        device.name = updateData.name;
    }

    if (updateData.isActive !== undefined) {
        device.isActive = updateData.isActive;
    }

    if (updateData.powerWatts !== undefined) {
        device.powerWatts = updateData.powerWatts;
    }

    return true;
};

const calculateEnergy = (list) => {
    let totalPower = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i].isActive && list[i].connected) {
            totalPower += list[i].powerWatts;
        }
    }

    console.log("Tong cong suat dang hoat dong:", totalPower, "W");
    return totalPower;
};

const enforcePowerLimit = (list) => {
    let totalPower = calculateEnergy(list);

    while (totalPower > MAX_POWER_WATTS) {
        let largestDevice = null;

        for (let i = 0; i < list.length; i++) {
            const device = list[i];

            if (
                device.isActive &&
                device.connected &&
                (largestDevice === null ||
                 device.powerWatts > largestDevice.powerWatts)
            ) {
                largestDevice = device;
            }
        }

        if (largestDevice === null) {
            break;
        }

        largestDevice.isActive = false;

        console.log(
            "Tu dong tat:",
            largestDevice.name,
            "-",
            largestDevice.powerWatts,
            "W"
        );

        totalPower = calculateEnergy(list);
    }

    if (totalPower <= MAX_POWER_WATTS) {
        console.log("Cong suat he thong dang trong nguong an toan.");
    }
};

const triggerScene = (list, sceneName) => {
    const validScenes = ["GoodMorning", "LeaveHome", "SleepMode"];

    if (!validScenes.includes(sceneName)) {
        console.log("Ngu canh khong ton tai:", sceneName);
        return false;
    }

    console.log("Kich hoat ngu canh:", sceneName);

    for (let i = 0; i < list.length; i++) {
        const device = list[i];

        if (!device.connected) {
            console.log("Bo qua thiet bi mat ket noi:", device.name);
            continue;
        }

        if (sceneName === "GoodMorning") {
            if (
                device.type === "light" &&
                (device.room === "Phong ngu" ||
                 device.room === "Phong bep")
            ) {
                device.isActive = true;
            }

            if (device.type === "tv") {
                device.isActive = false;
            }
        }

        if (sceneName === "LeaveHome") {
            device.isActive = false;
        }

        if (sceneName === "SleepMode") {
            if (device.type === "light") {
                device.isActive = false;
            }

            if (device.type === "tv") {
                device.isActive = false;
            }

            if (device.type === "airConditioner") {
                device.isActive = true;
            }

            if (device.type === "heater") {
                device.isActive = false;
            }
        }
    }

    enforcePowerLimit(list);

    console.log("Trang thai thiet bi sau khi chay ngu canh:");
    readDevices(list);

    return true;
};

console.log("========== 1. DANH SACH BAN DAU ==========");
readDevices(devices);

console.log("========== 2. THEM THIET BI ==========");
createDevice(devices, {
    name: "Den phong bep",
    room: "Phong bep",
    type: "light",
    powerWatts: 15,
    isActive: false,
    connected: true
});
readDevices(devices);

console.log("========== 3. NGU CANH GOOD MORNING ==========");
triggerScene(devices, "GoodMorning");

console.log("========== 4. NGU CANH LEAVE HOME ==========");
triggerScene(devices, "LeaveHome");

console.log("========== 5. NGU CANH SLEEP MODE ==========");
triggerScene(devices, "SleepMode");

console.log("========== 6. KIEM TRA NGU CANH KHONG TON TAI ==========");
triggerScene(devices, "PartyMode");

console.log("========== 7. KIEM TRA MAT KET NOI ==========");
updateDevice(devices, "DEV_004", {
    isActive: false
});

console.log("========== 8. KIEM TRA QUA TAI CONG SUAT ==========");

updateDevice(devices, "DEV_002", {
    isActive: true
});

updateDevice(devices, "DEV_005", {
    isActive: true
});

enforcePowerLimit(devices);
readDevices(devices);

console.log("========== 9. BAO CAO NANG LUONG ==========");
const finalPower = calculateEnergy(devices);

console.log("Nguong cong suat:", MAX_POWER_WATTS, "W");
console.log("Cong suat cuoi cung:", finalPower, "W");
console.log(
    "Trang thai:",
    finalPower > MAX_POWER_WATTS ? "QUA TAI" : "AN TOAN"
);
