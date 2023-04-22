enum spinWheelType {
    TOKEN = "TOKEN",
    POINT = "POINT",
    PRIZE = "PRIZE",
}

export const rewardDefault = [
    { id: "1", name: "300", amount: 300, type: spinWheelType.POINT },
    { id: "2", name: "200", amount: 200, type: spinWheelType.POINT },
    { id: "3", name: "Token", amount: 1, type: spinWheelType.TOKEN },
    { id: "4", name: "Baju Uw", amount: 1, type: spinWheelType.PRIZE },
    { id: "5", name: "700", amount: 700, type: spinWheelType.POINT },
    { id: "6", name: "400", amount: 400, type: spinWheelType.POINT },
    { id: "7", name: "700", amount: 700, type: spinWheelType.POINT },
    { id: "8", name: "ZONK", amount: 0, type: spinWheelType.PRIZE },
];

export const colorDefault = ["#32A4A0", "#4A57F0", "#E92936", "#F98F00"];
