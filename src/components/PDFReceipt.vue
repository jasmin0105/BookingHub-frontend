<template>
  <button
    @click="generatePDF"
    :disabled="loading"
    class="flex items-center gap-2 px-4 py-2 bg-[#111118] border border-white/10 text-gray-300 hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.3)] rounded-xl text-sm font-medium transition-all disabled:opacity-50"
  >
    <svg
      v-if="!loading"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    {{ loading ? "Generating..." : "Download PDF" }}
  </button>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  booking: { type: Object, required: true },
  userName: { type: String, default: "Guest" },
});

const loading = ref(false);

const generatePDF = async () => {
  loading.value = true;
  try {
    const b = props.booking;
    const itemName =
      b.hotel_name || b.restaurant_name || b.event_name || `Booking #${b.id}`;
    const type = b.booking_type || "reservation";
    const now = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const bookingRef = `BH-${String(b.id).padStart(6, "0")}`;

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f8f8f8; padding: 40px; color: #1a1a1a; }
  .receipt { background: white; max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #0A0A0F, #1A1A24); padding: 40px; color: white; position: relative; }
  .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #C9A84C, #E8C96D, #C9A84C); }
  .logo { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .logo-icon { width: 44px; height: 44px; background: linear-gradient(135deg, #C9A84C, #E8C96D); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; color: #0A0A0F; }
  .logo-name { font-size: 22px; font-weight: 900; color: white; }
  .header h1 { font-size: 28px; font-weight: 900; margin-bottom: 6px; }
  .header .ref { color: #C9A84C; font-size: 14px; font-weight: 600; letter-spacing: 2px; }
  .badge { display: inline-block; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3); color: #C9A84C; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-top: 12px; text-transform: uppercase; }
  .body { padding: 36px 40px; }
  .section { margin-bottom: 28px; }
  .section-title { font-size: 10px; font-weight: 700; color: #999; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f9f9f9; }
  .row:last-child { border-bottom: none; }
  .row .label { color: #666; font-size: 13px; }
  .row .value { font-weight: 600; font-size: 13px; color: #1a1a1a; }
  .total-box { background: linear-gradient(135deg, #0A0A0F, #1A1A24); border-radius: 12px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
  .total-box .label { color: rgba(255,255,255,0.6); font-size: 13px; }
  .total-box .value { color: #C9A84C; font-size: 28px; font-weight: 900; }
  .footer { background: #f8f8f8; padding: 24px 40px; text-align: center; border-top: 1px solid #eee; }
  .footer p { color: #999; font-size: 12px; line-height: 1.8; }
  .footer .university { color: #C9A84C; font-weight: 600; }
  .status { display: inline-flex; align-items: center; gap: 6px; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
</style>
</head>
<body>
<div class="receipt">
  <div class="header">
    <div class="logo">
      <div class="logo-icon">B</div>
      <span class="logo-name">BookingHub</span>
    </div>
    <h1>Booking Confirmation</h1>
    <div class="ref">${bookingRef}</div>
    <div class="badge">✓ Confirmed</div>
  </div>
  <div class="body">
    <div class="section">
      <div class="section-title">Guest Information</div>
      <div class="row"><span class="label">Guest Name</span><span class="value">${
        props.userName
      }</span></div>
      <div class="row"><span class="label">Booking Date</span><span class="value">${now}</span></div>
      <div class="row"><span class="label">Status</span><span class="value"><span class="status"><span class="status-dot"></span>Confirmed</span></span></div>
    </div>
    <div class="section">
      <div class="section-title">Reservation Details</div>
      <div class="row"><span class="label">Property</span><span class="value">${itemName}</span></div>
      <div class="row"><span class="label">Type</span><span class="value">${
        type.charAt(0).toUpperCase() + type.slice(1)
      }</span></div>
      ${
        b.check_in
          ? `<div class="row"><span class="label">Check-in</span><span class="value">${new Date(
              b.check_in
            ).toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}</span></div>`
          : ""
      }
      ${
        b.check_out
          ? `<div class="row"><span class="label">Check-out</span><span class="value">${new Date(
              b.check_out
            ).toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}</span></div>`
          : ""
      }
      <div class="row"><span class="label">Guests</span><span class="value">${
        b.guests
      } ${b.guests === 1 ? "person" : "people"}</span></div>
      <div class="row"><span class="label">Booking Reference</span><span class="value">${bookingRef}</span></div>
    </div>
    <div class="total-box">
      <span class="label">Total Amount</span>
      <span class="value">$${parseFloat(b.total_price).toFixed(2)}</span>
    </div>
  </div>
  <div class="footer">
    <p>Thank you for choosing BookingHub. Please present this confirmation upon arrival.</p>
    <p>For support: support@bookinghub.com</p>
    <p class="university">Diploma Project · Yusupova Zhasmin · COM-22 · Ala-Too International University · 2025</p>
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.onload = () => {
        setTimeout(() => {
          win.print();
          URL.revokeObjectURL(url);
        }, 500);
      };
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
