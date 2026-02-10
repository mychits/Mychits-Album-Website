import React from "react";
import {
  Smartphone,
  Eye,
  CreditCard,
  FileCheck,
  Globe,
  FileSignature,
  User,
  Bell,
  Headset,
} from "lucide-react";

export default function WhyChits() {
  // Configuration for colors
  const colorMap = {
    emerald: {
      border: "border-emerald-500",
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  };

  // Data array for the 9 features
  const features = [
    {
      icon: <Smartphone size={32} />,
      title: "Chit Kart App",
      description: "Your All-in-One Chit Fund App. Manage your account, track payments, bids, and balances in real-time on Android & iOS.",
      color: "emerald",
    },
    {
      icon: <Eye size={32} />,
      title: "100% Transparency",
      description: "Total control with clear access to all records. My Chits ensures no hidden charges—what you see is exactly what you get.",
      color: "blue",
    },
    {
      icon: <CreditCard size={32} />,
      title: "Multiple Payment Options",
      description: "Pay via UPI, Net Banking, or offline modes. All digital transactions are encrypted and secure for your convenience.",
      color: "purple",
    },
    {
      icon: <FileCheck size={32} />,
      title: "Fully Compliant",
      description: "My Chits strictly operates under the Chit Funds Act and Karnataka Chit Fund Rules of 1984. Credible and reliable.",
      color: "emerald",
    },
    {
      icon: <Globe size={32} />,
      title: "End-to-End Online",
      description: "From joining to bidding and receiving funds, the entire journey is digital, paperless, and instant.",
      color: "blue",
    },
    {
      icon: <FileSignature size={32} />,
      title: "Secure E-Agreements",
      description: "Legally valid, digitally signed agreements stored securely. Access or download them anytime from the app.",
      color: "purple",
    },
    {
      icon: <User size={32} />,
      title: "Relationship Manager",
      description: "A dedicated point of contact for every subscriber to assist with planning, queries, and payments.",
      color: "emerald",
    },
    {
      icon: <Bell size={32} />,
      title: "Never Miss Due Dates",
      description: "Stay updated with automated SMS alerts, app notifications, and email reminders for timely payments.",
      color: "blue",
    },
    {
      icon: <Headset size={32} />,
      title: "Responsive Support",
      description: "Multi-lingual support available across Karnataka via app, call, or WhatsApp for quick resolutions.",
      color: "purple",
    },
  ];

  return (
    <section className="py-20 px-6 bg-sky-50">
      <div className="max-w-7xl mx-auto">
        {/* ===== Heading ===== */}
        <div className="text-center mb-16">
          <p className="text-blue-600 uppercase tracking-widest font-semibold mb-3">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Why Choose <span className="text-blue-700">My Chits</span>?
          </h2>
          <div className="mx-auto mt-4 w-20 h-1 bg-orange-400 rounded-full"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            A trusted platform combining traditional reliability with modern digital convenience, fully compliant and secure.
          </p>
        </div>

        {/* ===== Feature Cards Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              colorMap={colorMap}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Reusable Card Component ===== */
function FeatureCard({ icon, title, description, color, colorMap }) {
  const styles = colorMap[color];

  return (
    <div
      className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 ${styles.border} h-full flex flex-col`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${styles.bg} ${styles.text} shrink-0`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {title}
      </h3>

      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}