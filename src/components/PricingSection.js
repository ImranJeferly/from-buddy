"use client";

import React from "react";
import BrandButton from "./BrandButton";
import WhiteButton from "./WhiteButton";
import { useAuth } from "@/lib/AuthContext";

// Stripe payment links - replace with your actual Stripe payment links
const STRIPE_PAYMENT_LINKS = {
  basic: "https://buy.stripe.com/dRmfZhaPf4j67Tpg8AafS03",
  pro: "https://buy.stripe.com/aFa3cv8H74j64HdcWoafS05"
};

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
		price: "$14.99/month", // Keep for alt text
		originalPrice: "$29/month",
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
	const { currentUser, userData } = useAuth();

	const handlePlanSelect = async (planType) => {
		// Check if user is logged in
		if (!currentUser) {
			// Redirect to login if not authenticated
			window.location.href = '/login';
			return;
		}

		// Record payment attempt in Firebase
		try {
			await fetch('/api/payment/initiate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: currentUser.uid,
					planType: planType,
					userEmail: currentUser.email
				}),
			});
		} catch (error) {
			console.error('Error recording payment attempt:', error);
		}

		// Redirect directly to Stripe payment link with user info
		// Pass userId, planType, and email as URL parameters
		const paymentUrl = `${STRIPE_PAYMENT_LINKS[planType]}?client_reference_id=${encodeURIComponent(currentUser.uid)}&prefilled_email=${encodeURIComponent(currentUser.email)}&custom_fields[0][key]=planType&custom_fields[0][text][value]=${planType}`;
		
		console.log('Redirecting to payment URL:', paymentUrl);
		console.log('User ID:', currentUser.uid, 'Plan Type:', planType);
		
		window.location.href = paymentUrl;
	};

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
							<div className="text-center mb-2 relative">
								<div className={`text-5xl font-extrabold mb-1 relative ${
									plan.badge === "BEST" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" : 
									plan.badge === "POPULAR" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400" : 
									"text-gray-700"
								}`}>
									{plan.title === "Free" ? "$0" : plan.title === "Basic" ? "$9" : "$14.99"}
									
									{plan.title === "Pro" && plan.originalPrice && (
										<div className="absolute -top-3 -right-8 transform rotate-12">
											<div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
												<div className="text-center">
													<div className="text-[10px] leading-none">SAVE</div>
													<div className="text-sm leading-none">$14</div>
												</div>
											</div>
										</div>
									)}
								</div>
								
								{plan.title === "Pro" && plan.originalPrice && (
									<div className="text-sm text-gray-400 line-through mb-1">
										was $29/month
									</div>
								)}
								
								<div className={`text-sm font-medium ${
									plan.badge === "BEST" ? "text-purple-600" : 
									plan.badge === "POPULAR" ? "text-blue-500" : 
									"text-gray-500"
								}`}>
									{plan.title === "Free" ? "Forever" : "per month"}
								</div>
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
								{(() => {
									const userPlan = userData?.planType || 'free';
									const planName = plan.title.toLowerCase();
									
									// Free plan - always disabled
									if (idx === 0) {
										return (
											<WhiteButton
												disabled
												style={{
													opacity: "0.6",
													cursor: "not-allowed",
												}}
											>
												{userPlan === 'free' ? 'Current Plan' : 'Free Plan'}
											</WhiteButton>
										);
									}
									
									// Basic plan (idx === 1)
									if (idx === 1) {
										const isCurrentPlan = userPlan === 'basic';
										const isUpgraded = userPlan === 'pro';
										
										if (isCurrentPlan) {
											return (
												<WhiteButton
													disabled
													style={{
														opacity: "0.6",
														cursor: "not-allowed",
													}}
												>
													Current Plan
												</WhiteButton>
											);
										} else if (isUpgraded) {
											return (
												<WhiteButton
													disabled
													style={{
														opacity: "0.6",
														cursor: "not-allowed",
													}}
												>
													Downgrade Not Available
												</WhiteButton>
											);
										} else {
											return (
												<div className="transition-transform hover:scale-105">
													<BrandButton 
														onClick={() => handlePlanSelect('basic')}
														style={{
															background: "linear-gradient(90deg, #2196F3 0%, #00BCD4 100%)",
															boxShadow: "0 8px 15px -4px rgba(59, 130, 246, 0.4)"
														}}
													>
														Choose Basic
													</BrandButton>
												</div>
											);
										}
									}
									
									// Pro plan (idx === 2)
									if (idx === 2) {
										const isCurrentPlan = userPlan === 'pro';
										
										if (isCurrentPlan) {
											return (
												<WhiteButton
													disabled
													style={{
														opacity: "0.6",
														cursor: "not-allowed",
													}}
												>
													Current Plan
												</WhiteButton>
											);
										} else {
											return (
												<div className="transition-transform hover:scale-105">
													<BrandButton 
														onClick={() => handlePlanSelect('pro')}
														style={{
															background: "linear-gradient(90deg, #0D47A1 0%, #7E57C2 100%)",
															boxShadow: "0 8px 20px -4px rgba(59, 130, 246, 0.5)"
														}}
													>
														Choose Pro
													</BrandButton>
												</div>
											);
										}
									}
								})()}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
