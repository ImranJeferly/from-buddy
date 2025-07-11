import React from "react";
import BrandButton from "./BrandButton";
import WhiteButton from "./WhiteButton";

const plans = [
	{
		title: "Free",
		price: "$0/month", // Keep for alt text
		features: [
			"3 form uploads total",
			"Explains up to 5 fields per form",
			"Text-only explanations in English",
			"No audio or avatar support",
		],
	},
	{
		title: "Basic",
		price: "$9/month", // Keep for alt text
		features: [
			"Up to 15 forms per month",
			"Explains all fields",
			"Voice explanations in 1 language",
			"Audio + avatar support",
		],
		badge: "POPULAR",
	},
	{
		title: "Pro",
		price: "$29/month", // Keep for alt text
		features: [
			"Unlimited form uploads",
			"Explains all fields",
			"Multilingual voice explanations",
			"Audio + avatar support",
		],
		badge: "BEST",
	},
];

export default function PricingSection() {
	return (
		<section id="pricing" className="pricing-section py-20">
			<div className="mx-auto px-6 py-16 bg-gradient-to-br from-[#2196F3] to-[#1565C0] rounded-3xl shadow-lg" style={{ 
				backgroundImage: "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%), linear-gradient(to bottom right, #2196F3, #1565C0)"
			}}>
				<h2 className="home-h2 text-white mb-20 pb-16 text-center tracking-tight !font-poppins font-bold" style={{marginBottom: "6rem"}}>
					Simple Pricing
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mx-auto max-w-6xl">
					{plans.map((plan, idx) => (
						<div
							key={plan.title}
							className={`relative flex flex-col items-center rounded-3xl shadow-xl border-0 bg-white p-6 lg:p-10 transition-all duration-300 max-w-md w-full mx-auto ${
								idx === 1 ? "md:scale-110 md:translate-y-[-10px] z-10" : ""
							} ${plan.badge === "BEST" ? "hover:shadow-2xl hover:shadow-blue-200" : "hover:shadow-xl"}`}
							style={{
								background: "white",
								boxShadow: plan.badge ? "0 10px 25px -5px rgba(59, 130, 246, 0.15)" : ""
							}}
						>
							{plan.badge && (
								<div 
									className={`absolute top-0 px-6 py-2 rounded-full shadow-lg font-brand font-extrabold text-sm tracking-wider flex items-center animate-pulse-subtle ${
										plan.badge === "BEST" ? 
										"bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white" : 
										"bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 text-white"
									}`}
									style={{
										textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
										boxShadow: plan.badge === "BEST" ? 
											"0 4px 15px -2px rgba(59, 130, 246, 0.5)" : 
											"0 4px 12px -2px rgba(59, 130, 246, 0.3)"
									}}
								>
									{plan.badge === "BEST" && (
										<svg className="w-5 h-5 mr-2 text-yellow-300 fill-current animate-spin-slow" viewBox="0 0 24 24">
											<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
										</svg>
									)}
									{plan.badge === "POPULAR" && (
										<svg className="w-4 h-4 mr-2 text-white fill-current" viewBox="0 0 24 24">
											<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
										</svg>
									)}
									{plan.badge}
								</div>
							)}
							<h3 className={`text-2xl font-extrabold mb-2 text-center tracking-tight mt-3 !font-poppins ${
								plan.badge === "BEST" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" : 
								plan.badge === "POPULAR" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400" : 
								"text-[#2196F3]"
							}`}>
								{plan.title}
							</h3>
							<div className="text-center">
								<img 
									src={`/${plan.title.toLowerCase()}.png`} 
									alt={`${plan.title} Plan - ${plan.price}`}
									className="h-20 mx-auto select-none pointer-events-none image-protected"
									style={{ objectFit: "contain", userSelect: "none" }}
									draggable="false"
								/>
							</div>
							<div className="w-full h-px bg-gray-100 mb-6"></div>
							<ul className="mb-6 w-full">
								{plan.features.map((f, i) => (
									<li
										key={i}
										className="text-md mb-4 flex items-start font-medium"
										style={{
											color: plan.badge ? "#374151" : "#4B5563"
										}}
									>
										<span className={`inline-flex w-5 h-5 rounded-full mr-3 mt-0.5 items-center justify-center ${
											plan.badge === "BEST" ? "bg-gradient-to-r from-blue-600 to-purple-500" :
											plan.badge === "POPULAR" ? "bg-gradient-to-r from-blue-500 to-cyan-400" :
											"bg-blue-400"
										}`}>
											<svg
												width="12"
												height="9"
												viewBox="0 0 12 9"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="translate-x-[1px] translate-y-0"
											>
												<path
													d="M1 4L4.5 7.5L11 1"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</span>
										{f}
									</li>
								))}
							</ul>
							<div className="mt-auto w-full">
								{idx === 0 ? (
									<WhiteButton
										disabled
										style={{
											opacity: "0.6",
											cursor: "not-allowed",
										}}
									>
										Current Plan
									</WhiteButton>
								) : idx === 2 ? (
									<div className="transition-transform hover:scale-105">
										<BrandButton 
											style={{
												background: "linear-gradient(90deg, #0D47A1 0%, #7E57C2 100%)",
												boxShadow: "0 8px 20px -4px rgba(59, 130, 246, 0.5)"
											}}
										>
											Choose Pro
										</BrandButton>
									</div>
								) : (
									<div className="transition-transform hover:scale-105">
										<BrandButton 
											style={{
												background: "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
												boxShadow: "0 8px 15px -4px rgba(59, 130, 246, 0.4)"
											}}
										>
											Choose Basic
										</BrandButton>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
