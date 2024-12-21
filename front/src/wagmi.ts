import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const neox = {
  id: 12_227_332,
  name: 'neox-t4',
  nativeCurrency: { name: 'Gas', symbol: 'GAS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://neoxt4seed1.ngd.network'] },
  },
}

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    neox,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [neox] : []),
  ],
  ssr: true,
});