import type { QuinoaRpc } from '@/common/games/Quinoa/rpc';
import { post } from '@/utils';

export async function quinoaRpc(rpc: QuinoaRpc): Promise<void> {
  await post('/games/quinoa/rpc', rpc);
}
