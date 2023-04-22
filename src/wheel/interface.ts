type rewardProps = {
    id: string;
    name: string;
    amount: number;
    type: string | "TOKEN" | "POINT" | "PRIZE" | "OTHER";
};

export interface wheelProps {
    rewards: rewardProps[];
    colors: string[];
    wheelWidth: number;
    duration?: number;
    handleSpin: () => string;
}
