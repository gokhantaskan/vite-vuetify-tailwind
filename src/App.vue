<script setup lang="ts">
import "@/plugins/onboard";

import { useOnboard } from "@web3-onboard/vue";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

import ConnectWallet from "@/components/ConnectWallet/ConnectWallet.vue";
import NetworkDialog from "@/components/NetworkDialog/NetworkDialog.vue";

import { useWeb3Provider } from "./composables/useWeb3Provider";
import { useAppStore } from "./stores/app";
import { useBalancesStore } from "./stores/balances";

const { connectWallet, alreadyConnectedWallets } = useOnboard();

const { web3Provider } = useWeb3Provider();
const { address, chainId } = storeToRefs(useAppStore());
const { getEthBalance, resetEthBalance } = useBalancesStore();

const drawer = ref<boolean>(false);
const listItems = ref([
  {
    title: "Home",
    to: { name: "Home" },
  },
  {
    title: "About",
    to: { name: "About" },
  },
]);

onMounted(async () => {
  if (
    JSON.parse(localStorage.getItem("alreadyConnectedWallets") || "[]").length
  ) {
    await connectWallet({
      autoSelect: {
        label: alreadyConnectedWallets.value[0],
        disableModals: true,
      },
    });
  }
});

watch([address, chainId], async ([address, chainId], [_address, _chainId]) => {
  const chainChanged = chainId !== _chainId && typeof chainId === "number";
  const addressChanged = address !== _address && typeof address === "string";

  if (web3Provider.value && (addressChanged || chainChanged)) {
    getEthBalance(web3Provider.value, address);
  } else {
    resetEthBalance();
  }
});
</script>

<template>
  <v-app>
    <v-app-bar
      :elevation="2"
      :style="{ zIndex: 80 }"
    >
      <v-app-bar-nav-icon
        @click="() => (drawer = !drawer)"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
      <v-spacer></v-spacer>
      <div class="tw-mr-[10px] tw-space-x-2 md:tw-space-x-4">
        <NetworkDialog />
        <ConnectWallet />
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      :style="{ zIndex: 79 }"
    >
      <v-list
        density="compact"
        nav
      >
        <template
          v-for="(item, i) in listItems"
          :key="i"
        >
          <v-list-item
            :title="item.title"
            :to="item.to"
          ></v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main :scrollable="true">
      <router-view />
    </v-main>
  </v-app>
</template>
