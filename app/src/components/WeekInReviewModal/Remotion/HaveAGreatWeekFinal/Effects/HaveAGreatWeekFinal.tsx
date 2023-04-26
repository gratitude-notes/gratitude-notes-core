import { useEffect, useMemo, useRef } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import './HaveAGreatWeekFinal.css';
import React from 'react';

const texts = ['Have', 'a', 'Great', 'Week!'];

export const HaveAGreatWeekFinal = () => {
    const text1 = useRef<HTMLElement>(null);
    const text2 = useRef<HTMLElement>(null);

    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    // Controls the speed of morphing.
    const morphTime = fps;
    const cooldownTime = fps / 4;

    const { textIndex, morph, fraction } = useMemo(() => {
        let cooldown = cooldownTime;
        let textIndex = texts.length - 1;
        let morph = 0;
        let fraction = morph / morphTime;

        function doMorph() {
            morph -= cooldown;
            cooldown = 0;

            fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }
        }

        function doCooldown() {
            morph = 0;
        }

        for (let i = 0; i < frame; i++) {
            const shouldIncrementIndex = cooldown > 0;
            const dt = 1;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }

                doMorph();
            } else {
                doCooldown();
            }
        }

        return { textIndex, cooldown, morph, fraction };
    }, [cooldownTime, frame, morphTime]);

    useEffect(() => {
        if (!text1.current || !text2.current) {
            return;
        }
        text1.current.textContent = texts[textIndex % texts.length];
        text2.current.textContent = texts[(textIndex + 1) % texts.length];

        // A lot of the magic happens here, this is what applies the blur filter to the text.
        function setMorph(fr: number) {
            if (!text1.current || !text2.current) {
                return;
            }
            text2.current.style.filter = `blur(${Math.min(8 / fr - 8, 100)}px)`;
            text2.current.style.opacity = `${Math.pow(fr, 0.4) * 100}%`;

            fr = 1 - fr;
            text1.current.style.filter = `blur(${Math.min(8 / fr - 8, 100)}px)`;
            text1.current.style.opacity = `${Math.pow(fr, 0.4) * 100}%`;

            if (text1.current) {
                text1.current.textContent = texts[textIndex % texts.length];
            }
            if (text2.current) {
                text2.current.textContent = texts[(textIndex + 1) % texts.length];
            }
        }

        if (morph === 0) {
            text2.current.style.filter = '';
            text2.current.style.opacity = '100%';

            text1.current.style.filter = '';
            text1.current.style.opacity = '0%';
        } else {
            setMorph(fraction);
        }
    }, [fraction, morph, textIndex]);

    const { durationInFrames } = useVideoConfig();

    // Fade-in
    // [0, ( durationInFrames / 2)] * the fade-in will occur from start of clip thru 1/2 thru clip
    // [0, 1] * this is the range of values we expect for opacity
    const opacityTitle = interpolate(frame, [0, durationInFrames / 2], [0, 1]);

    return (
        // MORPH EFFECT
        // <AbsoluteFill>
        // 	<div id="container">
        // 		<span
        // 			ref={text1}
        // 			style={{
        // 				lineHeight: height + 'px',
        // 			}}
        // 			id="text1"
        // 		/>
        // 		<span
        // 			ref={text2}
        // 			style={{
        // 				lineHeight: height + 'px',
        // 			}}
        // 			id="text2"
        // 		/>
        // 	</div>

        // 	<svg id="filters">
        // 		<defs>
        // 			<filter id="threshold">
        // 				<feColorMatrix
        // 					in="SourceGraphic"
        // 					type="matrix"
        // 					values="1 0 0 0 0
        // 							0 1 0 0 0
        // 							0 0 1 0 0
        // 							0 0 0 255 -140"
        // 				/>
        // 			</filter>
        // 		</defs>
        // 	</svg>
        // </AbsoluteFill>
        <AbsoluteFill className="justify-center items-center text-[100px]">
            <h1 style={{ opacity: opacityTitle }} className="font-bold">
                Have a great week!
            </h1>
        </AbsoluteFill>
    );
};
