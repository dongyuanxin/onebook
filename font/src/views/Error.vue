<template>
  <div class="error">
    <div class="dynamic-letter__container">
      <dynamic-letter :letters="letters" font-size="1em" shadow-height="6px" line-height="1em" opacity="1"></dynamic-letter>
      <br>
      <div class="how-to">
        Automatically return to home page after {{ timeLeft }} seconds.
      </div>
    </div>
  </div>
</template>
<script>
import DynamicLetter from "@/components/DynamicLetter";
export default {
  data() {
    return {
      letters: [
        { char: "4", color: "#222" },
        { char: "0", color: "#222" },
        { char: "4", color: "#222" }
      ],
      timeLeft: 10,
      timer: null
    };
  },
  mounted() {
    this.countTime(); // 启动倒计时
  },
  methods: {
    countTime() {
      if (this.timeLeft <= 0) {
        clearTimeout(this.timer);
        this.$router.push({ name: "home" });
      } else {
        this.timer = setTimeout(() => {
          this.timeLeft = this.timeLeft - 1;
          this.countTime();
        }, 1000);
      }
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  components: {
    DynamicLetter
  }
};
</script>
<style scoped>
.error {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-size: 110px;
}
.dynamic-letter__container {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.error .how-to {
  font-family: "Opens Sans", sans-serif;
  font-weight: 300;
  font-size: 16px;
  letter-spacing: 4px;
  margin-top: 10px;
  color: #555;
}
@media (max-width: 500px) {
  .error {
    font-size: 70px;
  }
  .error .how-to {
    font-size: 10px;
  }
}
</style>

