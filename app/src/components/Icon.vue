<template>
<div class="wrapper">
  <a :class="{'link':true, 'clickable': isClickable}" v-if="link" :href="link" :style="{
    '--width': width,
    '--height': height,
    '--image-url': unescape(url),
    '--radius': borderRadius
  }" target="_blank"></a>

  <img :class="{'icon':true, 'clickable': isClickable}" v-else :src="url" :width="width" :height="height" :alt="alt">
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue';

import unescape from 'lodash/unescape';

export default defineComponent({
  name: 'Icon',
  props: {
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: 'Icon\'s Alternate Text'
    },
    width: {
      type: String,
      required: true,
      default: '24px'
    },
    height: {
      type: String,
      required: true,
      default: '24px'
    },
    link: {
      type: String,
      required: false,
      default: null
    },
    borderRadius: {
      type: String,
      required: false,
      default: '1em'
    },
    isClickable: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  methods: {
    unescape
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;

  @include border-radius(--radius);

  .link {
    @include background-image(--image-url, --width, --height);
  }

  .icon {
    @include flex(column)
  }
}

.clickable {
  @include clickable;
}
</style>
