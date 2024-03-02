import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

/**
 * 
      <Spotlight>
        <img alt="spotlight card" src="/spotlight.png" className="animate-in fade-in" />
        <div className="p-12">
          <div className="mt-2 flex items-center gap-x-2">
            <span className="text-4xl font-bold tracking-tight text-white">
              Add your bot
            </span>
          </div>
          <p className="mt-6 text-base leading-7 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
            illum eum ullam nostrum atque quam.
          </p>
        </div>
      </Spotlight>
 */

export default function Spotlight({ children }: { children: ReactNode }) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<div
			className="group relative max-w-md rounded-xl bg-card shadow-2xl overflow-hidden"
			onMouseMove={handleMouseMove}
		>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
				style={{
					background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.06),
              transparent 80%
            )
          `,
				}}
			/>
			{children}
		</div>
	);
}
