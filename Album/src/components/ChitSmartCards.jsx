import { chitSmartPlans } from "../pages/data/chitSmartPlans";
import React from "react";
import { Share2 } from "lucide-react";

export default function ChitSmartCards() {

    const handleShare = (plan) => {
        const shareData = {
            title: `Chit Smart - ${plan.value}`,
            text: `Chit Smart Plan\n\nValue: ${plan.value}\n${plan.daily}\n${plan.instalment}\nMembers: ${plan.members}`,
            url: window.location.href,
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            navigator.clipboard.writeText(
                `${shareData.title}\n${shareData.text}\n${shareData.url}`
            );
            alert("Link copied to clipboard");
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chitSmartPlans.map((plan) => (
                <div
                    key={plan.id}
                    className="relative bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition mb-5"
                >
                    <button
                        onClick={() => handleShare(plan)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:bg-orange-100 transition"
                        title="Share this plan"
                    >
                        <Share2 size={16} className="text-orange-500" />
                    </button>
                    <div className="bg-orange-400 text-white text-center py-4 font-bold">
                        CHIT SMART
                    </div>

                    <div className="p-6 text-center">
                        <div className="text-2xl font-bold text-orange-500">
                            {plan.value}
                        </div>

                        <p className="mt-2 text-gray-600">{plan.daily}</p>
                        <p className="text-gray-600">{plan.instalment}</p>

                        <p className="mt-2 text-sm text-gray-500">
                            Members {plan.members}
                        </p>

                        <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
                            Enroll Now
                        </button>

                        {/* <button
                            onClick={() =>
                                navigator.share?.({
                                    title: "Chit Smart Plan",
                                    text: "Check out this Chit Smart plan",
                                    url: window.location.href,
                                })
                            }
                            className="mt-2 text-sm text-sky-600 underline"
                        >
                            Share Plan
                        </button> */}
                    </div>
                </div>
            ))}
        </div>
    );
}
