<template>
  <div class="min-h-screen bg-[#07070C]" v-if="!loading">
    <div class="dash-header">
      <div class="dash-inner">
        <div>
          <div class="eyebrow">Business Owner</div>
          <h1 class="dash-title">My Dashboard</h1>
          <div class="dash-sub">Welcome back, <span style="color:#C9A84C">{{ user?.username }}</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <RouterLink to="/hotels" class="add-btn">+ Add Listing</RouterLink>
          <div class="live">● Live Data</div>
        </div>
      </div>
    </div>
    <div class="dash-body">
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(59,130,246,0.1)">🏨</div>
          <div class="kpi-val">{{ d.summary.total_listings }}</div>
          <div class="kpi-lbl">Total Listings</div>
          <div class="kpi-sub">{{ d.summary.total_hotels }}H · {{ d.summary.total_rests }}R · {{ d.summary.total_events }}E</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(201,168,76,0.1)">💰</div>
          <div class="kpi-val" style="color:#C9A84C">${{ fmt(d.summary.total_revenue) }}</div>
          <div class="kpi-lbl">Total Revenue</div>
          <div class="kpi-sub">from confirmed bookings</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(34,197,94,0.1)">📋</div>
          <div class="kpi-val">{{ d.summary.total_bookings }}</div>
          <div class="kpi-lbl">Total Bookings</div>
          <div class="kpi-sub">{{ d.summary.confirmed }} confirmed</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(168,85,247,0.1)">📈</div>
          <div class="kpi-val" style="color:#A78BFA">{{ d.summary.conversion_rate }}%</div>
          <div class="kpi-lbl">Conversion Rate</div>
          <div class="kpi-sub">confirmed / total</div>
        </div>
      </div>
      <div class="status-row">
        <div class="si"><span class="dot" style="background:#22C55E"></span><span class="slbl">Confirmed</span><span class="sval">{{ d.summary.confirmed }}</span></div>
        <div class="sdiv"></div>
        <div class="si"><span class="dot" style="background:#EAB308"></span><span class="slbl">Pending</span><span class="sval">{{ d.summary.pending }}</span></div>
        <div class="sdiv"></div>
        <div class="si"><span class="dot" style="background:#EF4444"></span><span class="slbl">Cancelled</span><span class="sval">{{ d.summary.cancelled }}</span></div>
        <div class="sdiv"></div>
        <div class="si"><span class="dot" style="background:#C9A84C"></span><span class="slbl">Lost Revenue</span><span class="sval" style="color:#EF4444">${{ fmt(d.summary.cancelled_revenue) }}</span></div>
      </div>
      <div class="charts-row">
        <div class="chart-card" style="flex:1.4">
          <div class="chart-head">
            <div><div class="eyebrow">Analytics</div><div class="chart-title">Bookings — Last 6 Months</div></div>
            <div style="display:flex;gap:4px">
              <button @click="mode='bookings'" :class="['ctog', mode==='bookings'?'ctog-on':'']">Bookings</button>
              <button @click="mode='revenue'" :class="['ctog', mode==='revenue'?'ctog-on':'']">Revenue</button>
            </div>
          </div>
          <div class="bars">
            <div v-for="m in d.monthly" :key="m.month" class="bar-col">
              <div class="bar-outer">
                <div class="bar-fill" :style="{ height: pct(m)+'%', background: mode==='revenue' ? 'linear-gradient(180deg,#E8C96D,#C9A84C)' : 'linear-gradient(180deg,#93C5FD,#3B82F6)' }"></div>
              </div>
              <div class="bar-num">{{ mode==='bookings' ? m.bookings : '$'+fmt(m.revenue) }}</div>
              <div class="bar-lbl">{{ m.month }}</div>
            </div>
          </div>
        </div>
        <div class="chart-card" style="flex:0.8">
          <div class="eyebrow">Breakdown</div>
          <div class="chart-title" style="margin-bottom:20px">Booking Status</div>
          <div style="display:flex;justify-content:center;margin-bottom:16px">
            <svg viewBox="0 0 120 120" width="120" height="120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1a2e" stroke-width="20"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#22C55E" stroke-width="20" :stroke-dasharray="`${confPct*3.14} 314`" stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#EAB308" stroke-width="20" :stroke-dasharray="`${pendPct*3.14} 314`" :stroke-dashoffset="`${-confPct*3.14}`" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#EF4444" stroke-width="20" :stroke-dasharray="`${cancPct*3.14} 314`" :stroke-dashoffset="`${-(confPct+pendPct)*3.14}`" transform="rotate(-90 60 60)"/>
              <text x="60" y="55" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold" font-family="Arial">{{ d.summary.total_bookings }}</text>
              <text x="60" y="70" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="8" font-family="Arial">Total</text>
            </svg>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div class="leg"><span class="legdot" style="background:#22C55E"></span>Confirmed {{ confPct }}%</div>
            <div class="leg"><span class="legdot" style="background:#EAB308"></span>Pending {{ pendPct }}%</div>
            <div class="leg"><span class="legdot" style="background:#EF4444"></span>Cancelled {{ cancPct }}%</div>
          </div>
        </div>
      </div>
      <div class="bottom-row">
        <div class="bot-card">
          <div style="margin-bottom:16px"><div class="eyebrow">Performance</div><div class="chart-title">Top Listings</div></div>
          <div style="display:flex;gap:6px;margin-bottom:14px">
            <button @click="tab='hotels'" :class="['ltab', tab==='hotels'?'ltab-on':'']">Hotels ({{ d.top_hotels.length }})</button>
            <button @click="tab='restaurants'" :class="['ltab', tab==='restaurants'?'ltab-on':'']">Restaurants ({{ d.top_restaurants.length }})</button>
            <button @click="tab='events'" :class="['ltab', tab==='events'?'ltab-on':'']">Events ({{ d.top_events.length }})</button>
          </div>
          <div v-if="curList.length===0" class="empty">No listings yet. <RouterLink to="/hotels" style="color:#C9A84C">Add one →</RouterLink></div>
          <div v-for="(item,i) in curList" :key="item.id" class="lrow">
            <div class="rank">#{{ i+1 }}</div>
            <div style="flex:1"><div class="lname">{{ item.name }}</div><div class="lcity">{{ item.city }}</div></div>
            <div style="display:flex;gap:16px">
              <div style="text-align:right"><div class="lsval">{{ item.bookings }}</div><div class="lslbl">Bookings</div></div>
              <div style="text-align:right"><div class="lsval" style="color:#C9A84C">${{ fmt(item.revenue) }}</div><div class="lslbl">Revenue</div></div>
              <div v-if="item.rating!==undefined" style="text-align:right"><div class="lsval" style="color:#FDE68A">★{{ item.rating }}</div><div class="lslbl">Rating</div></div>
            </div>
          </div>
        </div>
        <div class="bot-card">
          <div style="margin-bottom:16px"><div class="eyebrow">Latest Activity</div><div class="chart-title">Recent Bookings</div></div>
          <div v-if="d.recent_bookings.length===0" class="empty">No bookings yet.</div>
          <div v-for="b in d.recent_bookings" :key="b.id" class="brow">
            <div :class="['bicon', `bi-${b.type}`]">{{ {hotel:'🏨',restaurant:'🍽',event:'🎭'}[b.type] }}</div>
            <div style="flex:1;min-width:0">
              <div class="bname">{{ b.name }}</div>
              <div class="bmeta"><span>{{ b.guest }}</span><span>{{ b.guests }} guests</span><span>{{ b.created }}</span></div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span :class="['spill', `sp-${b.status}`]">{{ b.status }}</span>
              <span style="font-size:13px;font-weight:700;color:#C9A84C">${{ b.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else style="min-height:100vh;background:#07070C;display:flex;align-items:center;justify-content:center">
    <div style="text-align:center"><div class="spin"></div><div style="color:rgba(255,255,255,0.3);font-size:13px;margin-top:16px">Loading...</div></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../api'
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const loading = ref(true)
const mode = ref('bookings')
const tab = ref('hotels')
const d = ref({ summary:{total_listings:0,total_hotels:0,total_rests:0,total_events:0,total_bookings:0,confirmed:0,pending:0,cancelled:0,total_revenue:0,cancelled_revenue:0,conversion_rate:0}, monthly:[], top_hotels:[], top_restaurants:[], top_events:[], recent_bookings:[] })
const confPct = computed(() => d.value.summary.total_bookings>0 ? Math.round(d.value.summary.confirmed/d.value.summary.total_bookings*100) : 0)
const pendPct = computed(() => d.value.summary.total_bookings>0 ? Math.round(d.value.summary.pending/d.value.summary.total_bookings*100) : 0)
const cancPct = computed(() => d.value.summary.total_bookings>0 ? Math.round(d.value.summary.cancelled/d.value.summary.total_bookings*100) : 0)
const curList = computed(() => tab.value==='hotels' ? d.value.top_hotels : tab.value==='restaurants' ? d.value.top_restaurants : d.value.top_events)
const fmt = n => { if (!n && n!==0) return '0'; if (n>=1000) return (n/1000).toFixed(1)+'k'; return parseFloat(n).toFixed(0) }
const pct = m => { const f=mode.value==='bookings'?'bookings':'revenue'; const max=Math.max(...d.value.monthly.map(x=>x[f]),1); return Math.max(4,(m[f]/max)*100) }
onMounted(async () => { try { const res=await api.get('/bookings/dashboard/'); d.value=res.data } catch(e){console.error(e)} finally{loading.value=false} })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
.dash-header{background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.06);padding:28px 32px}
.dash-inner{display:flex;align-items:center;justify-content:space-between;max-width:1400px;margin:0 auto}
.eyebrow{font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#C9A84C;margin-bottom:4px;font-family:'DM Sans',sans-serif}
.dash-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:#fff;margin-bottom:4px}
.dash-sub{font-size:13px;color:rgba(255,255,255,0.35);font-family:'DM Sans',sans-serif}
.add-btn{padding:10px 20px;background:linear-gradient(135deg,#C9A84C,#E8C96D);color:#000;font-weight:700;font-size:13px;border-radius:10px;text-decoration:none;font-family:'DM Sans',sans-serif}
.live{font-size:11px;color:#22C55E;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);padding:6px 12px;border-radius:8px}
.dash-body{max-width:1400px;margin:0 auto;padding:28px 32px;display:flex;flex-direction:column;gap:20px}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.kpi-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:4px}
.kpi-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:8px}
.kpi-val{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:#fff;line-height:1}
.kpi-lbl{font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;font-family:'DM Sans',sans-serif}
.kpi-sub{font-size:11px;color:rgba(255,255,255,0.2);font-family:'DM Sans',sans-serif}
.status-row{display:flex;align-items:center;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:16px 24px}
.si{display:flex;align-items:center;gap:8px;flex:1}
.dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.slbl{font-size:12px;color:rgba(255,255,255,0.35);font-family:'DM Sans',sans-serif}
.sval{font-size:16px;font-weight:700;color:#fff;font-family:'DM Sans',sans-serif;margin-left:auto;margin-right:16px}
.sdiv{width:1px;height:32px;background:rgba(255,255,255,0.07);margin:0 8px}
.charts-row{display:flex;gap:14px}
.chart-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:22px}
.chart-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
.chart-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#fff}
.ctog{padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(255,255,255,0.35);transition:all .2s}
.ctog-on{background:rgba(201,168,76,0.1);border-color:rgba(201,168,76,0.3);color:#C9A84C}
.bars{display:flex;align-items:flex-end;gap:10px;height:140px}
.bar-col{flex:1;display:flex;flex-direction:column;align-items:center;height:100%}
.bar-outer{flex:1;width:100%;display:flex;align-items:flex-end}
.bar-fill{width:100%;border-radius:5px 5px 0 0;min-height:4px;transition:height .5s}
.bar-num{font-size:10px;font-weight:700;color:rgba(255,255,255,0.5);margin-top:5px}
.bar-lbl{font-size:10px;color:rgba(255,255,255,0.2)}
.leg{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,0.5)}
.legdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.bottom-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.bot-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:22px}
.ltab{padding:5px 12px;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.07);background:transparent;color:rgba(255,255,255,0.35);transition:all .2s}
.ltab-on{background:rgba(201,168,76,0.1);border-color:rgba(201,168,76,0.3);color:#C9A84C}
.lrow{display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);margin-bottom:8px;background:rgba(255,255,255,0.02)}
.rank{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:900;color:rgba(255,255,255,0.15);min-width:28px}
.lname{font-size:13px;font-weight:700;color:#fff;margin-bottom:2px}
.lcity{font-size:11px;color:rgba(255,255,255,0.3)}
.lsval{font-size:13px;font-weight:700;color:#fff}
.lslbl{font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.25)}
.brow{display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);margin-bottom:8px;background:rgba(255,255,255,0.02)}
.bicon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.bi-hotel{background:rgba(59,130,246,0.1)} .bi-restaurant{background:rgba(249,115,22,0.1)} .bi-event{background:rgba(168,85,247,0.1)}
.bname{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bmeta{display:flex;gap:8px;font-size:10px;color:rgba(255,255,255,0.3)}
.spill{padding:3px 8px;border-radius:6px;font-size:10px;font-weight:700;text-transform:capitalize}
.sp-confirmed{background:rgba(34,197,94,0.1);color:#86EFAC;border:1px solid rgba(34,197,94,0.2)}
.sp-pending{background:rgba(234,179,8,0.1);color:#FDE68A;border:1px solid rgba(234,179,8,0.2)}
.sp-cancelled{background:rgba(239,68,68,0.1);color:#FCA5A5;border:1px solid rgba(239,68,68,0.2)}
.empty{font-size:13px;color:rgba(255,255,255,0.2);padding:20px 0;text-align:center}
.spin{width:40px;height:40px;border:2px solid rgba(201,168,76,0.2);border-top-color:#C9A84C;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto}
@keyframes spin{to{transform:rotate(360deg)}}
</style>