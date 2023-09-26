import React, { useState } from 'react'
import { wheelProps } from './interface'

import './index.css'

export const Wheel: React.FC<
  React.ComponentPropsWithoutRef<'div'> & wheelProps
> = ({
  rewards,
  colors = ['#32A4A0', '#4A57F0', '#E92936', '#F98F00', '#4A57F0'],
  wheelWidth,
  duration = 10000,
  handleSpin,
  ...props
}) => {
  const [prizeRotate, setPrizeRotate] = useState(Math.random() * 500)
  const [onSpin, setOnSpin] = useState(false)

  const totalDegree = 360
  const panjang = rewards.length
  const perputaran = totalDegree / panjang
  const strokeDash = wheelWidth * 3.02
  const stiling = {
    strokeDasharray: strokeDash,
  }

  function spinTheWheel(prize: string) {
    let prizeId = null
    for (let i = 0; i < rewards.length; i++) {
      if (rewards[i].id === prize) {
        prizeId = i
      }
    }

    if (prizeId === null) throw new Error('Prize not found')

    const random = Math.random()
    setOnSpin(true)
    setPrizeRotate(
      -(270 + (prizeId as number) * perputaran + perputaran * random) -
        360 * Math.ceil(random * 700)
    )
    setTimeout(() => {
      setOnSpin(false)
    }, duration + 10)
  }

  async function getPrize(): Promise<string> {
    const promise: Promise<string> = new Promise((resolve, reject) => {
      resolve(handleSpin() as Promise<string>)
    })

    return promise
  }

  async function clickSpin() {
    try {
      const result: string = await getPrize()
      spinTheWheel(result)
    } catch (error) {
      console.error('COMPFEST WHEEL ERROR')
    }
  }

  return (
    <div {...props}>
      <div
        className="wheel-container"
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
            cursor: onSpin ? 'not-allowed' : 'pointer',
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
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
          {rewards.map(({ amount, id }, index) => (
            <div
              key={id}
              className="reward-container"
              style={{
                transform: `rotate(${perputaran * index}deg)`,
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
                {amount > 0 && (
                  <span
                    className="point-icon"
                    style={{
                      color: `${colors[index % colors.length]}`,
                      fontSize: `${(wheelWidth * 3) / 100}px`,
                      width: `${(wheelWidth * 5) / 100}px`,
                      height: `${(wheelWidth * 5) / 100}px`,
                      marginRight: `${(wheelWidth * 1.5) / 100}px`,
                    }}
                  >
                    P
                  </span>
                )}
                {amount === 0 ? 'ZONK' : amount}
              </span>
              <svg className="circle-container">
                <circle
                  className="circle"
                  style={{
                    ...stiling,
                    strokeDashoffset:
                      strokeDash - (strokeDash * perputaran) / 360,
                    stroke: `${colors[index % colors.length]}`,
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
  )
}
