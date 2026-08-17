import { persistor } from "@/redux/store";

export async function persistAndGo(path: string) {
  await persistor.flush();
  window.location.assign(path);
}
