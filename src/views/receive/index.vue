<template>
  <ReceiveOne v-if="receiveType == 1" />
  <ReceiveTwo v-else />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ReceiveOne from './ReceiveOne.vue';
import ReceiveTwo from './ReceiveTwo.vue';

export default defineComponent({
  name: 'ReceivePage',
  components: { ReceiveOne, ReceiveTwo },
  setup() {
    const route = useRoute();
    // 1:爱奇艺，2：天翼
    const receiveType = ref(1) as any;
    onMounted(() => {
      if (route.query.type) {
        receiveType.value = route.query.type;
      }
    });
    return { receiveType };
  },
});
</script>
