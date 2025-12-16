// src/core/state.ts
import { pageWindow } from "../utils/pageContext";

export const NativeWS = pageWindow.WebSocket;
export const NativeWorker = pageWindow.Worker;

// Sockets created in the page
export const sockets: WebSocket[] = [];

// Page socket kept (if found)
export let quinoaWS: WebSocket | null = null;
export function setQWS(ws: WebSocket, why: string) {
  if (!quinoaWS) {
    quinoaWS = ws;
  }
}

// Flag: WS detected inside an instrumented worker
export let workerFound = false;
export function setWorkerFound(v: boolean) {
  workerFound = !!v;
}

// Small Set compatible with older browsers
type SimpleSet<T> = Set<T> & {
  _a?: T[];
  add?(v: T): any;
  delete?(v: T): any;
  forEach?(fn: (v: T) => void): any;
};

export const Workers: SimpleSet<Worker> = (typeof Set !== "undefined")
  ? new Set<Worker>() as SimpleSet<Worker>
  : {
      _a: [],
      add(w: Worker) { (this._a as Worker[]).push(w); },
      delete(w: Worker) {
        const i = (this._a as Worker[]).indexOf(w);
        if (i >= 0) (this._a as Worker[]).splice(i, 1);
      },
      forEach(fn: (w: Worker)=>void) { for (let i=0;i<(this._a as Worker[]).length;i++) fn((this._a as Worker[])[i]); }
    } as any;

export function label(rs: number | undefined) {
  return ['CONNECTING','OPEN','CLOSING','CLOSED'][rs ?? -1] || 'none';
}
