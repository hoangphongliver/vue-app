<template>
  <div class="app-select-desktop">
    <div class="app-select-desktop__input">
      <input
        v-model="selectItem"
        type="text"
        readonly
        :placeholder="value"
        @click="onShowListItem"
        @focus="onShowListItem"
        @blur="onHideListItem"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
      />
      <span
        @click="onShowListItem"
        :class="
          `icon-Arrow-xSmall-Up ${
            isShowListItem ? 'rotate-arrow-up' : 'rotate-arrow-down'
          }`
        "
      />
    </div>
    <ul
      v-if="isShowListItem"
      class="app-select-desktop__list-item"
      ref="listItem"
    >
      <li
        v-for="(option, index) in listOptions"
        :key="option.value"
        class="app-select-desktop__list-item__item"
        :class="{
          'app-select-desktop__list-item--active': currentItem === index,
        }"
        @mouseover="onMouseoverItem(index)"
        @mouseout="onMouseoutItem(index)"
        @click="onClickItem(index)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppSelectDesktop",
  props: {
    listOptions: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 1,
    },
    isDisable: {
      type: Boolean,
    },
  },
  data() {
    return {
      selectItem: "",
      isShowListItem: false,
      currentItem: 0,
      isMouseover: false,
      optionValue: this.value,
      scorllToItem: 0,
      isScrollToDone: false,
    };
  },
  watch: {
    listOptions(listOptions) {
      this.getDefaultValue(listOptions);
    },
    isShowListItem(isShow) {
      if (!isShow) {
        this.isMouseover = false;
      }
    },
    value(value) {
      this.optionValue = value;
      this.getDefaultValue(this.listOptions);
    },
  },
  mounted() {
    this.getDefaultValue(this.listOptions);
    this.getOptionIndex();
    document.addEventListener("click", this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    onShowListItem() {
      if (!this.isDisable) {
        this.isShowListItem = true;
        this.getOptionIndex();
        setTimeout(() => {
          if (38 * (this.currentItem + 1) > 200) {
            this.$refs["listItem"].scrollTo({
              top: 38 * this.currentItem,
              left: 0,
            });
          }
          this.isScrollToDone = true;
        }, 10);
      }
    },

    onHideListItem() {
      this.scorllToItem = 0;
      if (!this.isMouseover) {
        this.isShowListItem = false;
      }
    },

    onArrowDown(e) {
      e.preventDefault();
      this.currentItem += 1;
      if (this.currentItem >= this.listOptions.length) {
        this.currentItem = this.listOptions.length - 1;
      }

      if (38 * (this.currentItem + 1) > 200) {
        this.$refs["listItem"].scrollTo({
          top: 38 * this.currentItem,
          left: 0,
          behavior: "smooth",
        });
      }
    },

    onMouseoverItem(index) {
      if (this.isScrollToDone) {
        this.currentItem = index;
        this.isMouseover = true;
      }
    },

    onMouseoutItem() {
      this.isMouseover = false;
    },

    onClickItem(index) {
      this.currentItem = index;
      this.onEmitSelectValue();
    },

    onArrowUp(e) {
      this.scorllToItem = 0;
      e.preventDefault();
      this.currentItem -= 1;
      if (this.currentItem <= 0) {
        this.currentItem = 0;
      }

      this.$refs["listItem"].scrollTo({
        top: 38 * this.currentItem,
        left: 0,
      });
    },

    onEnter() {
      this.onEmitSelectValue();
    },

    getDefaultValue(listOptions) {
      this.selectItem =
        listOptions.find((item) => item.value === this.optionValue) &&
        listOptions.find((item) => item.value === this.optionValue).text;
    },

    onEmitSelectValue() {
      this.selectItem = this.listOptions[this.currentItem].text;
      this.optionValue = this.listOptions[this.currentItem].value;
      this.$emit("input", this.optionValue);
      this.isShowListItem = false;
      this.getOptionIndex();
    },

    getOptionIndex() {
      this.listOptions.forEach((option, optionIndex) => {
        if (option.value == this.optionValue) {
          this.currentItem = optionIndex;
        }
      });
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isShowListItem = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-select-desktop {
  position: relative;
  width: 100%;
  &__input {
    input {
      width: 100%;
      height: 42px;
      padding: 0 15px;
      outline: none;
      font-size: 15px;
      border: 1px solid #d1d1d1;
      cursor: pointer;
      border-radius: 3px;
      background: white;
    }

    span {
      position: absolute;
      right: 7px;
      top: 16px;
      font-size: 11px;
      color: gray;
    }

    .rotate-arrow-up {
      transform: rotate(360deg);
      transition: 0.2s;
    }

    .rotate-arrow-down {
      transform: rotate(180deg);
      transition: 0.2s;
    }
  }
  &__list-item {
    position: absolute;
    width: 100%;
    left: 0;
    background: white;
    z-index: 3;
    margin-bottom: 20px;
    box-shadow: 2px 3px 14px 0 rgba(74, 74, 74, 0.25);
    max-height: 200px;
    overflow-y: scroll;
    @include scrollbar;

    &__item {
      padding: 8px 15px;
      font-size: 15px;
      cursor: pointer;
    }

    &--active {
      background: lightgray;
    }
  }
}
</style>
