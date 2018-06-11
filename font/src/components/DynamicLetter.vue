<template>
  <span class="dynamic">
    <span class="letter" v-for="( item , index ) in letters" :key="index" :style="{height : lineHeight , 'line-height' : lineHeight }">
      <div class="character" :style="{color : item.color , 'font-size' : fontSize , opacity : opacity }">
        {{ item.char }}
      </div>
      <span v-if="showShadow" :style="{height : shadowHeight}"></span>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    // 字母数据
    letters: {
      type: Array,
      required: true,
      validator: val => {
        if (val.length > 24) {
          console.warn(
            "Letters' length should be less than 25 because of Js can't Rendor Css Pseudo-class "
          );
          return false;
        } else {
          return true;
        }
      }
    },
    // 字符透明度
    opacity: {
      type: String,
      default: "1.0"
    },
    // 是否展示阴影动画
    showShadow: {
      type: Boolean,
      default: true
    },
    // 阴影高度
    shadowHeight: {
      type: String,
      default: "8px"
    },
    // 行间距
    lineHeight: {
      type: String,
      default: "50px"
    },
    // 字体大小
    fontSize: {
      type: String,
      default: "70px"
    }
  },
  data() {
    return {
      name: "dynamic-letter"
    };
  }
};
</script>
<style lang="scss" scoped>
$transition-time: 0.4s !default;
$character-num: 24 !default;
$base-animation-delay: 0.33333s !default;
@import url("https://fonts.googleapis.com/css?family=Fredoka+One|Open+Sans:300");
@keyframes wave {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes shadow {
  0% {
    width: 0;
    height: 0;
  }
  50% {
    width: 100%;
    height: 100%;
  }
  100% {
    width: 0;
    height: 0;
  }
}

.letter {
  position: relative;
  text-align: center;
  display: inline-block;
  transition: all #{$transition-time};
  .character {
    transition: color #{$transition-time};
    animation: wave 1.2s linear infinite;
    animation-delay: 0.33333s;
  }
  span {
    position: absolute;
    bottom: -12px;
    display: block;
    width: 100%;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.25);
      animation: shadow 1.2s linear infinite;
    }
  }
}

@for $i from 1 to ($character-num + 1) {
  .letter {
    &:nth-child(#{$i}) {
      span::before,
      .character {
        animation-delay: $base-animation-delay * $i;
      }
    }
  }
}
</style>
