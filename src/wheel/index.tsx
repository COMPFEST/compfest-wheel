import React, { useState } from "react";
import { wheelProps } from "./interface";

import "./index.css";

export const Wheel: React.FC<
    React.ComponentPropsWithoutRef<"div"> & wheelProps
> = ({
    rewards,
    colors,
    wheelWidth,
    duration = 10000,
    handleSpin,
    ...props
}) => {
    const [prizeRotate, setPrizeRotate] = useState(Math.random() * 500);
    const [onSpin, setOnSpin] = useState(false);

    const totalDegree = 360;
    const panjang = rewards.length;
    const perputaran = totalDegree / panjang;
    const strokeDash = wheelWidth * 3.02;
    const stiling = {
        strokeDasharray: strokeDash,
    };

    function spinTheWheel(prize: string) {
        let prizeId = null;
        for (let i = 0; i < rewards.length; i++) {
            if (rewards[i].id === prize) {
                prizeId = i;
            }
        }

        if (prizeId === null) throw new Error("Prize not found");

        const random = Math.random();
        setOnSpin(true);
        setPrizeRotate(
            -(270 + prizeId * perputaran + perputaran * random) -
                360 * Math.ceil(random * 700)
        );
        setTimeout(() => {
            setOnSpin(false);
        }, duration + 10);
    }

    async function getPrize(): Promise<string> {
        const promise: Promise<string> = new Promise((resolve, reject) => {
            try {
                resolve(handleSpin());
            } catch (error) {
                throw new Error(
                    `Something error, please make sure the function handleSpin is work. Error log: ${error}`
                );
            }
        });

        return promise;
    }

    async function clickSpin() {
        const result: string = await getPrize();
        spinTheWheel(result);
    }

    return (
        <div {...props}>
            <div
                className="container"
                style={{
                    width: wheelWidth,
                    height: wheelWidth,
                }}
            >
                <div
                    className="arrow"
                    onClick={onSpin ? () => {} : clickSpin}
                    style={{
                        fontSize: `${(wheelWidth * 4) / 100}px`,
                        cursor: onSpin ? "not-allowed" : "pointer",
                    }}
                >
                    SPIN
                </div>
                <div className="triangle-container">
                    <svg
                        width={(wheelWidth * 20) / 100}
                        height={(wheelWidth * 20) / 100}
                        viewBox="-50 -50 300 300"
                    >
                        <defs>
                            <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop offset="0%" stopColor="#1c1c28" />
                                <stop offset="100%" stopColor="#363649" />
                            </linearGradient>
                        </defs>
                        <filter id="shadow" colorInterpolationFilters="sRGB">
                            <feDropShadow
                                dx="0"
                                dy="-4"
                                stdDeviation="28"
                                floodColor="#C4A9FE40"
                            />
                        </filter>
                        <polygon
                            className="triangle"
                            strokeLinejoin="round"
                            points="100,0 0,200 200,200"
                            fill="url(#gradient)"
                            stroke="url(#gradient)"
                            filter="url(#shadow)"
                        />
                    </svg>
                </div>
                <div
                    className="wheel"
                    style={{
                        transform: `rotate(${prizeRotate}deg)`,
                        transitionDuration: `${duration}ms`,
                    }}
                >
                    {rewards.map((e, id) => (
                        <div
                            key={e.id}
                            className="reward-container"
                            style={{
                                transform: `rotate(${perputaran * id}deg)`,
                            }}
                        >
                            <span
                                className="reward-box"
                                style={{
                                    transform: `translate(0, -50%) rotate(${
                                        180 + perputaran / 2
                                    }deg)`,
                                    fontSize: `${(wheelWidth * 7) / 100}px`,
                                }}
                            >
                                {e?.type === "POINT" ? (
                                    <span
                                        className="point-icon"
                                        style={{
                                            color: `${
                                                colors[id % colors.length]
                                            }`,
                                            fontSize: `${
                                                (wheelWidth * 3) / 100
                                            }px`,
                                            width: `${
                                                (wheelWidth * 5) / 100
                                            }px`,
                                            height: `${
                                                (wheelWidth * 5) / 100
                                            }px`,
                                            marginRight: `${
                                                (wheelWidth * 1.5) / 100
                                            }px`,
                                        }}
                                    >
                                        P
                                    </span>
                                ) : (
                                    ""
                                )}
                                {e.name}
                            </span>
                            <svg className="circle-container">
                                <circle
                                    className="circle"
                                    style={{
                                        ...stiling,
                                        strokeDashoffset:
                                            strokeDash -
                                            (strokeDash * perputaran) / 360,
                                        stroke: `${colors[id % colors.length]}`,
                                    }}
                                    cx="50%"
                                    cy="50%"
                                    r="48%"
                                ></circle>
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
