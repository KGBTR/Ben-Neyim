<template>
<Search />
</template>

<script lang="ts">
import {
  defineComponent
} from "vue";

import Search from "@/components/Search.vue"

export default defineComponent({
  name: "Home",
  components: {
    Search
  }
});
</script>
