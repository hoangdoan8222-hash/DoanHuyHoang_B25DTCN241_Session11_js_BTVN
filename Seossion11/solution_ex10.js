
console.log("========== 1. FUNCTION DECLARATION ==========");

console.log("Tong 5 + 3 =", add(5, 3));

function add(a, b) {
    return a + b;
}

console.log("Tong 10 + 20 =", add(10, 20));


console.log("========== 2. FUNCTION EXPRESSION ==========");

const subtract = function(a, b) {
    return a - b;
};

console.log("Hieu 10 - 3 =", subtract(10, 3));


console.log("========== 3. ARROW FUNCTION ==========");

const multiply = (a, b) => a * b;

console.log("Tich 5 * 4 =", multiply(5, 4));


console.log("========== 4. MINH HOA HOISTING ==========");

console.log("Declaration goi truoc khi khai bao:", divide(10, 2));

function divide(a, b) {
    return a / b;
}

const divideExpression = function(a, b) {
    return a / b;
};

const divideArrow = (a, b) => a / b;

console.log("Function Expression sau khi khai bao:", divideExpression(10, 2));
console.log("Arrow Function sau khi khai bao:", divideArrow(10, 2));


console.log("========== 5. UNG DUNG SMART HOME ==========");

const calculatePowerCost = (powerWatts, hours, pricePerKwh) => {
    const electricityUsed = (powerWatts * hours) / 1000;
    return electricityUsed * pricePerKwh;
};

const updateDeviceStatus = (device, isActive) => {
    if (isActive !== undefined) {
        device.isActive = isActive;
    }
    return device;
};

const device = {
    id: "DEV_001",
    name: "Dieu hoa",
    powerWatts: 1500,
    isActive: true
};

console.log("Chi phi dien trong 5 gio:", calculatePowerCost(1500, 5, 3000), "VND");

updateDeviceStatus(device, false);

console.log("Thiet bi sau khi tat:");
console.table([device]);
