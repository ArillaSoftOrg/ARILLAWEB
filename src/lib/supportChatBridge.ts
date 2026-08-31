// Lets the mobile navbar's support icon and the floating SupportChatWidget
// share one open/close state without a React context — the widget only
// mounts on some pages, so there is no common ancestor to host a provider.
type OpenListener = (isOpen: boolean) => void;
type OpenRequestListener = () => void;

let isOpen = false;
const openListeners = new Set<OpenListener>();
const openRequestListeners = new Set<OpenRequestListener>();

export function getSupportChatIsOpen() {
  return isOpen;
}

export function reportSupportChatOpen(next: boolean) {
  isOpen = next;
  openListeners.forEach((listener) => listener(next));
}

export function subscribeSupportChatIsOpen(listener: OpenListener) {
  openListeners.add(listener);
  return () => {
    openListeners.delete(listener);
  };
}

// Called by triggers (e.g. the mobile navbar icon) that don't own the panel
// state themselves — the widget listens and opens itself in response.
export function requestSupportChatOpen() {
  openRequestListeners.forEach((listener) => listener());
}

export function subscribeSupportChatOpenRequest(listener: OpenRequestListener) {
  openRequestListeners.add(listener);
  return () => {
    openRequestListeners.delete(listener);
  };
}
