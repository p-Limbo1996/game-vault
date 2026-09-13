import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, CreditCard, Truck, MapPin, ShieldCheck, Lock } from "lucide-react";
import VaultButton from "@/components/vault/VaultButton";
import GearLoader from "@/components/vault/GearLoader";
import { useVault } from "@/lib/vaultStore";
import { cn } from "@/lib/utils";

const steps = [
  { id: "address", label: "Address", icon: MapPin },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirm", label: "Confirmation", icon: ShieldCheck },
];

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useVault();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setDone(true);
        clearCart();
        setTimeout(() => navigate("/"), 2600);
      }, 1800);
    }
  };

  if (done) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }} className="flex flex-col items-center">
          <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }} className="h-32 w-32 rounded-full bg-gold/20 blur-2xl absolute" />
          <ShieldCheck className="h-24 w-24 text-gold glow-gold relative" strokeWidth={1.2} />
          <h2 className="font-heading font-black text-3xl text-gold-gradient mt-6 tracking-widest">ACQUISITION COMPLETE</h2>
          <p className="text-titanium mt-2">Vault delivery in progress. Redirecting to terminal...</p>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0 && !processing) {
    return (
      <div className="py-32 text-center text-titanium">Cart empty. <button onClick={() => navigate("/store")} className="text-gold hover:underline">Browse arsenal</button></div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 lg:px-12 py-10">
      <button onClick={() => step > 0 ? setStep(step - 1) : navigate("/cart")} className="inline-flex items-center gap-2 text-titanium hover:text-gold mb-6 font-heading text-xs tracking-wider">
        <ChevronLeft className="h-4 w-4" /> BACK
      </button>

      <h1 className="font-heading font-bold text-4xl text-foreground">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-between mt-8 mb-10 max-w-2xl">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = i === step;
          const complete = i < step;
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-2">
                <div className={cn("relative h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all",
                  active ? "border-gold glow-gold bg-gold/10" : complete ? "border-success bg-success/10" : "border-white/15")}>
                  {complete ? <Check className="h-5 w-5 text-success" /> : <Icon className={cn("h-5 w-5", active ? "text-gold" : "text-titanium")} />}
                </div>
                <span className={cn("font-heading text-[9px] tracking-wider", active ? "text-gold" : "text-titanium")}>{s.label.toUpperCase()}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-[2px] flex-1 mx-2 transition-colors", complete ? "bg-success" : "bg-white/10")} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="rounded-[24px] vault-metal p-6 min-h-[300px]">
          {processing ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <GearLoader size={80} label="PROCESSING SECURE TRANSACTION" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                {step === 0 && <AddressForm />}
                {step === 1 && <ShippingForm />}
                {step === 2 && <PaymentForm />}
                {step === 3 && <ConfirmSummary cart={cart} total={total} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="h-fit rounded-[24px] vault-metal p-6">
          <span className="font-heading text-[10px] tracking-[0.25em] text-titanium">ORDER TOTAL</span>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-titanium">Items</span><span className="font-num">{cart.length}</span></div>
            <div className="flex justify-between"><span className="text-titanium">Subtotal</span><span className="font-num">${cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-titanium">Tax</span><span className="font-num">${tax.toFixed(2)}</span></div>
            <div className="h-px bg-white/[0.06] my-2" />
            <div className="flex justify-between"><span className="font-heading text-sm">TOTAL</span><span className="font-num font-black text-xl text-gold">${total.toFixed(2)}</span></div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-titanium/70">
            <Lock className="h-3.5 w-3.5 text-success" />
            <span className="font-heading text-[8px] tracking-wider">END-TO-END ENCRYPTED</span>
          </div>
        </div>
      </div>

      {!processing && (
        <VaultButton size="lg" onClick={next} className="w-full mt-6">
          {step === steps.length - 1 ? "Confirm & Complete Acquisition" : "Continue"} →
        </VaultButton>
      )}
    </div>
  );
}

function Field({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="font-heading text-[9px] tracking-[0.2em] text-titanium/70">{label.toUpperCase()}</label>
      <input type={type} placeholder={placeholder} className="mt-1.5 w-full h-12 px-4 rounded-[14px] vault-glass border border-white/[0.08] bg-transparent text-sm text-foreground placeholder:text-titanium/50 focus:border-gold/40 focus:outline-none transition-colors" />
    </div>
  );
}

function AddressForm() {
  return (
    <div className="space-y-4">
      <h2 className="font-heading font-semibold text-lg text-foreground">Delivery Address</h2>
      <Field label="Full Name" placeholder="Operator callsign" />
      <Field label="Email" placeholder="operator@vaultos.io" type="email" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="City" placeholder="Neo District" />
        <Field label="Postal Code" placeholder="00000" />
      </div>
      <Field label="Full Address" placeholder="Sector, block, unit number" />
    </div>
  );
}

function ShippingForm() {
  const options = [
    { name: "Instant Vault Delivery", desc: "Digital assets delivered to your vault instantly", price: "FREE", badge: "RECOMMENDED" },
    { name: "Express Courier", desc: "Physical items in 1-2 business days", price: "$14.99" },
    { name: "Standard", desc: "3-5 business days", price: "$5.99" },
  ];
  const [sel, setSel] = useState(0);
  return (
    <div className="space-y-3">
      <h2 className="font-heading font-semibold text-lg text-foreground mb-2">Shipping Method</h2>
      {options.map((o, i) => (
        <button key={i} onClick={() => setSel(i)} className={cn("w-full text-left rounded-[16px] border p-4 transition-all",
          sel === i ? "border-gold/40 bg-gold/10 glow-gold" : "border-white/[0.08] hover:border-white/20")}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm text-foreground">{o.name}</span>
                {o.badge && <span className="font-heading text-[8px] tracking-wider text-gold bg-gold/15 px-2 py-0.5 rounded">{o.badge}</span>}
              </div>
              <p className="text-titanium text-xs mt-1">{o.desc}</p>
            </div>
            <span className={cn("font-num font-bold", o.price === "FREE" ? "text-success" : "text-foreground")}>{o.price}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="space-y-4">
      <h2 className="font-heading font-semibold text-lg text-foreground">Payment Method</h2>
      <div className="grid grid-cols-3 gap-2">
        {["VAULT CREDITS", "CREDIT CARD", "CRYPTO"].map((m, i) => (
          <button key={m} className={cn("h-14 rounded-[14px] border font-heading text-[10px] tracking-wider transition-all",
            i === 0 ? "border-gold/40 bg-gold/10 text-gold" : "border-white/10 text-titanium hover:text-foreground")}>{m}</button>
        ))}
      </div>
      <Field label="Card Number" placeholder="•••• •••• •••• ••••" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Expiry" placeholder="MM / YY" />
        <Field label="CVV" placeholder="•••" />
      </div>
    </div>
  );
}

function ConfirmSummary({ cart, total }) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading font-semibold text-lg text-foreground mb-2">Confirm Your Acquisition</h2>
      {cart.map(i => (
        <div key={i.id} className="flex items-center gap-3 rounded-[14px] vault-glass p-3">
          <div className="h-12 w-12 rounded-[10px] overflow-hidden"><img src={i.cover_image} className="h-full w-full object-cover" alt="" /></div>
          <div className="flex-1"><p className="font-heading text-sm text-foreground">{i.title}</p><p className="text-titanium text-xs">Qty: {i.qty}</p></div>
          <span className="font-num font-bold text-gold">${(i.price * i.qty).toFixed(2)}</span>
        </div>
      ))}
      <div className="flex justify-between pt-3 border-t border-white/[0.06]">
        <span className="font-heading text-sm">GRAND TOTAL</span>
        <span className="font-num font-black text-xl text-gold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}