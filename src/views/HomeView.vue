<script setup lang="ts">
import { mdiMessageBadgeOutline } from "@mdi/js";
import { ref } from "vue";

import DialogCard from "@/components/DialogCard/DialogCard.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

const msg = `
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
  Dignissimos eius dolores omnis animi similique necessitatibus, 
  provident totam, eum velit, eos ad delectus vero sint earum impedit amet. 
  Accusantium, facere sed.
`;

const dialog = ref(false);
</script>

<template>
  <BaseLayout
    title="Overview"
    class="tw-space-y-4"
  >
    <!-- <template #title>
      <div>Custom Title</div>
    </template> -->
    <template #actions>
      <v-btn
        icon
        @click="() => (dialog = true)"
      >
        <v-icon :icon="mdiMessageBadgeOutline"></v-icon>
      </v-btn>
    </template>

    <p v-text="msg"></p>

    <div class="tw-space-x-2">
      <v-btn>Button</v-btn>
      <v-btn-base>Button Base</v-btn-base>
    </div>

    <v-dialog v-model="dialog">
      <DialogCard
        :visible="dialog"
        title="Title can be really long like this one and it should be fit!"
        @close="() => (dialog = false)"
      >
        <!-- <template #title>
          <div>Custom Title</div>
        </template> -->
        <p
          v-for="i in 10"
          :key="i"
        >
          {{ msg }}
        </p>
        <template #actions>
          <v-btn @click="() => (dialog = false)">Button</v-btn>
        </template>
      </DialogCard>
    </v-dialog>
  </BaseLayout>
</template>
