<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <!-- HEADER -->
      <div class="modal-header">
        <div>
          <div class="modal-eyebrow">Secure Payment</div>
          <div class="modal-title">Complete Your Booking</div>
        </div>
        <button class="close-btn" @click="$emit('close')">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- BOOKING SUMMARY -->
      <div class="summary-box">
        <div class="summary-row">
          <span class="summary-lbl">Property</span>
          <span class="summary-val">{{ bookingName }}</span>
        </div>
        <div class="summary-row">
          <span class="summary-lbl">Reference</span>
          <span class="summary-val" style="color: #c9a84c"
            >BH-{{ String(booking?.id || 0).padStart(6, "0") }}</span
          >
        </div>
        <div
          class="summary-row"
          style="
            border-top: 0.5px solid rgba(255, 255, 255, 0.08);
            padding-top: 10px;
            margin-top: 4px;
          "
        >
          <span class="summary-lbl">Total Amount</span>
          <span class="summary-total">${{ booking?.total_price }}</span>
        </div>
      </div>

      <!-- STEPS -->
      <div v-if="step === 'method'">
        <div class="section-title">Select Payment Method</div>
        <div class="methods-grid">
          <button
            v-for="m in methods"
            :key="m.id"
            @click="selectedMethod = m"
            :class="[
              'method-btn',
              selectedMethod?.id === m.id ? 'method-btn-active' : '',
            ]"
            :style="
              selectedMethod?.id === m.id
                ? `border-color:#${m.color};box-shadow:0 0 0 1px #${m.color}22`
                : ''
            "
          >
            <div
              class="method-logo"
              :style="`background:#${m.color}22;border:1px solid #${m.color}44`"
            >
              <svg
                v-if="m.id === 'mbank'"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="3"
                  :stroke="`#${m.color}`"
                  stroke-width="2"
                />
                <path d="M2 10h20" :stroke="`#${m.color}`" stroke-width="2" />
                <rect
                  x="5"
                  y="14"
                  width="4"
                  height="2"
                  rx="1"
                  :fill="`#${m.color}`"
                />
              </svg>
              <svg
                v-else-if="m.id === 'elcart'"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="3"
                  :stroke="`#${m.color}`"
                  stroke-width="2"
                />
                <circle
                  cx="9"
                  cy="12"
                  r="3"
                  :stroke="`#${m.color}`"
                  stroke-width="1.5"
                />
                <circle
                  cx="15"
                  cy="12"
                  r="3"
                  :stroke="`#${m.color}`"
                  stroke-width="1.5"
                />
              </svg>
              <svg
                v-else
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  :stroke="`#${m.color}`"
                  stroke-width="2"
                />
                <polyline
                  points="9,22 9,12 15,12 15,22"
                  :stroke="`#${m.color}`"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div class="method-info">
              <div class="method-name">{{ m.name }}</div>
              <div class="method-desc">{{ m.description }}</div>
            </div>
            <div
              v-if="selectedMethod?.id === m.id"
              class="method-check"
              :style="`background:#${m.color}`"
            >
              <svg
                width="10"
                height="10"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </button>
        </div>

        <div class="security-note">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            />
          </svg>
          Payments are processed securely. This is a demo simulation.
        </div>

        <button
          class="pay-btn"
          :disabled="!selectedMethod"
          @click="processPayment"
          :style="
            selectedMethod
              ? `background:linear-gradient(135deg,#${selectedMethod.color},#${selectedMethod.color}99)`
              : ''
          "
        >
          Pay ${{ booking?.total_price }} via
          {{ selectedMethod?.name || "..." }}
        </button>
      </div>

      <!-- PROCESSING -->
      <div v-if="step === 'processing'" class="processing-wrap">
        <div
          class="processing-spinner"
          :style="`border-top-color:#${selectedMethod?.color || 'C9A84C'}`"
        ></div>
        <div class="processing-title">Processing Payment</div>
        <div class="processing-sub">
          Connecting to {{ selectedMethod?.name }}...
        </div>
        <div class="processing-steps">
          <div
            v-for="(s, i) in processingSteps"
            :key="i"
            :class="['proc-step', i <= currentStep ? 'proc-step-done' : '']"
          >
            <div class="proc-dot"></div>
            <span>{{ s }}</span>
          </div>
        </div>
      </div>

      <!-- SUCCESS -->
      <div v-if="step === 'success'" class="result-wrap">
        <div class="success-icon">
          <svg
            width="32"
            height="32"
            fill="none"
            stroke="#22C55E"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="result-title" style="color: #22c55e">
          Payment Successful!
        </div>
        <div class="result-sub">Your booking has been confirmed</div>
        <div class="receipt-box">
          <div class="receipt-row">
            <span>Transaction ID</span
            ><span
              style="color: #c9a84c; font-family: monospace; font-size: 11px"
              >{{ transactionId }}</span
            >
          </div>
          <div class="receipt-row">
            <span>Method</span><span>{{ selectedMethod?.name }}</span>
          </div>
          <div class="receipt-row">
            <span>Amount</span
            ><span style="color: #22c55e; font-weight: 700"
              >${{ booking?.total_price }}</span
            >
          </div>
          <div class="receipt-row">
            <span>Status</span><span style="color: #22c55e">Confirmed</span>
          </div>
        </div>
        <button
          class="pay-btn"
          style="background: linear-gradient(135deg, #22c55e, #16a34a)"
          @click="
            $emit('success');
            $emit('close');
          "
        >
          Done
        </button>
      </div>

      <!-- FAILED -->
      <div v-if="step === 'failed'" class="result-wrap">
        <div class="failed-icon">
          <svg
            width="32"
            height="32"
            fill="none"
            stroke="#EF4444"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div class="result-title" style="color: #ef4444">Payment Failed</div>
        <div class="result-sub">Please try again or use a different method</div>
        <button
          class="pay-btn"
          style="
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #fca5a5;
          "
          @click="step = 'method'"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../api";

const props = defineProps({
  show: { type: Boolean, default: false },
  booking: { type: Object, default: null },
});
const emit = defineEmits(["close", "success"]);

const step = ref("method");
const methods = ref([]);
const selectedMethod = ref(null);
const transactionId = ref("");
const currentStep = ref(-1);

const processingSteps = [
  "Connecting to bank...",
  "Verifying transaction...",
  "Processing payment...",
  "Confirming booking...",
];

const bookingName = computed(() => {
  if (!props.booking) return "";
  return (
    props.booking.hotel_name ||
    props.booking.restaurant_name ||
    props.booking.event_name ||
    `Booking #${props.booking.id}`
  );
});

onMounted(async () => {
  try {
    const res = await api.get("/bookings/payment/methods/");
    methods.value = res.data.methods;
  } catch (e) {
    methods.value = [
      {
        id: "mbank",
        name: "Mbank",
        color: "E31E24",
        description: "Mbank — largest bank in Kyrgyzstan",
      },
      {
        id: "elcart",
        name: "Elcart",
        color: "0066CC",
        description: "National payment system",
      },
      {
        id: "optima",
        name: "Optima Bank",
        color: "FF6B00",
        description: "Pay with Optima Bank card",
      },
    ];
  }
});

const processPayment = async () => {
  step.value = "processing";
  currentStep.value = -1;

  // animate steps
  for (let i = 0; i < processingSteps.length; i++) {
    await new Promise((r) => setTimeout(r, 700));
    currentStep.value = i;
  }

  try {
    const initRes = await api.post("/bookings/payment/initiate/", {
      booking_id: props.booking.id,
      method: selectedMethod.value.id,
    });
    transactionId.value = initRes.data.transaction_id;

    const confirmRes = await api.post("/bookings/payment/confirm/", {
      booking_id: props.booking.id,
      transaction_id: transactionId.value,
    });

    step.value = confirmRes.data.success ? "success" : "failed";
  } catch (e) {
    step.value = "failed";
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap");

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}
.modal {
  background: #0d0d17;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.modal-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 4px;
  font-family: "DM Sans", sans-serif;
}
.modal-title {
  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
}
.close-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.summary-box {
  background: rgba(255, 255, 255, 0.03);
  border: 0.5px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 20px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}
.summary-lbl {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
}
.summary-val {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  font-family: "DM Sans", sans-serif;
}
.summary-total {
  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #c9a84c;
}

.section-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 12px;
  font-family: "DM Sans", sans-serif;
}
.methods-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.method-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  position: relative;
}
.method-btn:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}
.method-btn-active {
  background: rgba(255, 255, 255, 0.04);
}
.method-logo {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.method-info {
  flex: 1;
}
.method-name {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  font-family: "DM Sans", sans-serif;
  margin-bottom: 2px;
}
.method-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
}
.method-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.security-note {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.2);
  font-family: "DM Sans", sans-serif;
  margin-bottom: 16px;
}

.pay-btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: opacity 0.2s;
  background: linear-gradient(135deg, #c9a84c, #e8c96d);
  color: #000;
}
.pay-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.pay-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.processing-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
.processing-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.processing-title {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
}
.processing-sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
  margin-bottom: 20px;
}
.processing-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.proc-step {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.25);
  font-family: "DM Sans", sans-serif;
  transition: color 0.3s;
}
.proc-step-done {
  color: rgba(255, 255, 255, 0.7);
}
.proc-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: background 0.3s;
  flex-shrink: 0;
}
.proc-step-done .proc-dot {
  background: #22c55e;
}

.result-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}
.success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.failed-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.result-title {
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 6px;
}
.result-sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
  margin-bottom: 20px;
}
.receipt-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 0.5px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 20px;
}
.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 12px;
  font-family: "DM Sans", sans-serif;
  color: rgba(255, 255, 255, 0.4);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.04);
}
.receipt-row:last-child {
  border-bottom: none;
}
.receipt-row span:last-child {
  color: #fff;
  font-weight: 600;
}
</style>
