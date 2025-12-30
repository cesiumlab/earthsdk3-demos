<template>
  <div v-if="visible" class="ny-overlay">
    <div class="newyear-banner">
      <div class="ny-text">
        感谢 2025 的陪伴，元旦快乐，2026 见
      </div>
      <div class="ny-fireworks">
        <canvas ref="canvasEl"></canvas>
      </div>
      <button class="ny-close" @click="visible = false">收到了</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvasEl = ref(null)
const visible = ref(true)

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return

  const parent = canvas.parentElement
  if (!parent) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = 0
  let height = 0
  let frameId = 0
  let lastSpawn = 0

  const dpr = window.devicePixelRatio || 1

  const resize = () => {
    const rect = parent.getBoundingClientRect()
    width = rect.width || 220
    height = rect.height || 130

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resize()

  window.addEventListener('resize', resize)

  const rockets = []
  const particles = []

  const spawnRocket = () => {
    const x = width * (0.25 + Math.random() * 0.5)
    const startY = height + 10
    const targetY = height * (0.25 + Math.random() * 0.35)
    const depth = Math.random() * 0.8 - 0.3 // -0.3 ~ 0.5

    rockets.push({
      x,
      y: startY,
      targetY,
      vy: -(2.4 + Math.random() * 1.6),
      colorHue: 30 + Math.random() * 300,
      depth,
      exploded: false
    })
  }

  const explode = (r) => {
    const count = 60 + Math.floor(Math.random() * 50)
    const baseDepth = r.depth

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.25
      const speed = 1.4 + Math.random() * 1.8
      const depth = baseDepth + (Math.random() * 0.8 - 0.4)

      particles.push({
        x: r.x,
        y: r.y,
        vx: Math.cos(angle) * speed * (1 + Math.random() * 0.4),
        vy: Math.sin(angle) * speed * (1 + Math.random() * 0.3),
        size: 1.4 + Math.random() * 1.6,
        life: 1,
        alpha: 1,
        hue: r.colorHue + (Math.random() * 30 - 15),
        depth
      })
    }
  }

  const update = (time) => {
    if (!lastSpawn) lastSpawn = time
    const dt = 16 // 约等于一帧，简单处理即可

    if (time - lastSpawn > 650 + Math.random() * 650) {
      spawnRocket()
      lastSpawn = time
    }

    // 更新火箭
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i]
      r.y += r.vy
      r.vy += 0.02 // 轻微“重力”，看起来更真实

      if (!r.exploded && r.y <= r.targetY) {
        r.exploded = true
        explode(r)
        rockets.splice(i, 1)
      } else if (r.y < -20) {
        rockets.splice(i, 1)
      }
    }

    // 更新粒子
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy

      // 模拟 3D 下沉感：稍大的 depth 会有更强的重力
      const gravity = 0.035 + (p.depth * 0.02)
      p.vy += gravity

      // 空气阻力
      p.vx *= 0.985
      p.vy *= 0.985

      p.life -= 0.015
      p.alpha = Math.max(0, p.life)

      if (p.alpha <= 0 || p.y > height + 20) {
        particles.splice(i, 1)
      }
    }
  }

  const draw = () => {
    // 轻微拖影，让尾巴更真实
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(2, 6, 23, 0.35)'
    ctx.fillRect(0, 0, width, height)

    // 画火箭尾焰
    ctx.globalCompositeOperation = 'lighter'
    rockets.forEach(r => {
      const perspective = 1 + r.depth * 0.7
      const x = r.x
      const y = r.y * perspective
      const size = 2 * perspective

      const grd = ctx.createRadialGradient(x, y, 0, x, y, size * 4)
      grd.addColorStop(0, `rgba(255,255,255,0.95)`)
      grd.addColorStop(0.3, `hsla(${r.colorHue}, 100%, 65%, 0.9)`)
      grd.addColorStop(1, `hsla(${r.colorHue}, 100%, 50%, 0.05)`)

      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(x, y, size * 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // 画爆炸粒子
    particles.forEach(p => {
      const perspective = 1 + p.depth * 0.7
      const x = p.x
      const y = p.y * perspective
      const size = p.size * perspective
      const alpha = p.alpha * (0.3 + perspective * 0.7)

      const grd = ctx.createRadialGradient(x, y, 0, x, y, size * 4)
      grd.addColorStop(0, `rgba(255,255,255,${alpha})`)
      grd.addColorStop(0.3, `hsla(${p.hue}, 100%, 70%, ${alpha})`)
      grd.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`)

      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(x, y, size * 3, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const loop = (time) => {
    update(time)
    draw()
    frameId = requestAnimationFrame(loop)
  }

  frameId = requestAnimationFrame(loop)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.ny-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85));
  z-index: 80;
}

.newyear-banner {
  padding: 16px 22px 18px;
  border-radius: 18px;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.05), rgba(5, 7, 15, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.75);
  color: #fdfdfd;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: nyGlow 4s ease-in-out infinite alternate;
}

.ny-text {
  background: linear-gradient(90deg, #ffd35a, #ff8a5c, #7aa2ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
  letter-spacing: 0.4px;
  white-space: nowrap;
}

.ny-fireworks {
  position: relative;
  width: 220px;
  height: 130px;
  pointer-events: none;
  border-radius: 12px;
  overflow: hidden;
  background: radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.14), rgba(0, 0, 0, 0.95));
}

.ny-fireworks canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.ny-close {
  margin-top: 4px;
  padding: 4px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(15, 23, 42, 0.9);
  color: #e5edff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.ny-close:hover {
  background: rgba(59, 130, 246, 0.9);
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.8);
}

@keyframes nyGlow {
  0% {
    box-shadow: 0 16px 34px rgba(255, 211, 90, 0.55);
  }
  100% {
    box-shadow: 0 22px 48px rgba(122, 162, 255, 0.7);
  }
}
</style>
