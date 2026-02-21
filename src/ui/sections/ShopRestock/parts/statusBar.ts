import { element } from "../../../styles/helpers";
import { Button } from "../../../components/Button/Button";
import { EVENTS as CORE_EVENTS } from "../../../../utils/storage";
import { MGShopRestock } from "../../../../features/shopRestock";

export interface StatusBarPart {
    root: HTMLElement;
    destroy(): void;
}

const REFRESH_COOLDOWN_MS = 60_000;

function formatSyncAge(ts: number): string {
    const diff = Date.now() - ts;
    if (diff < 60000) return "just now";
    const min = Math.floor(diff / 60000);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    return `${hr}h ago`;
}

export function createStatusBar(): StatusBarPart {
    const root = element("div", { className: "restock-status-bar" });

    // Left: Refresh Button
    const left = element("div", { className: "restock-status-left" });
    const refreshBtn = Button({
        label: "Refresh",
        size: "sm",
        variant: "default",
        onClick: () => void handleRefresh(),
    });

    left.append(refreshBtn);

    // Right: Last Updated
    const right = element("div", { className: "restock-status-right" });

    let refreshTimer: number | null = null;
    let lastUpdatedTs: number | null = null;
    let lastRefreshAt = 0;

    function updateButton(): void {
        const now = Date.now();
        const remaining = Math.max(0, lastRefreshAt + REFRESH_COOLDOWN_MS - now);
        if (remaining <= 0) {
            refreshBtn.setDisabled(false);
            refreshBtn.setLabel("Refresh");
            return;
        }
        refreshBtn.setDisabled(true);
        const seconds = Math.ceil(remaining / 1000);
        refreshBtn.setLabel(`Refresh (${seconds}s)`);
    }

    async function handleRefresh(): Promise<void> {
        const now = Date.now();
        if (now - lastRefreshAt < REFRESH_COOLDOWN_MS) return;
        lastRefreshAt = now;
        refreshBtn.setLoading(true);
        refreshBtn.setDisabled(true);
        updateButton();
        try {
            await MGShopRestock.syncCommunityData(true);
        } finally {
            refreshBtn.setLoading(false);
            updateButton();
        }
    }

    function update() {
        updateTimeText();
    }

    function updateTimeText() {
        if (!lastUpdatedTs) {
            right.textContent = "Last active: -";
            right.title = "Not synced yet";
            return;
        }
        const date = new Date(lastUpdatedTs);
        right.textContent = `Last active: ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        right.title = `Synced ${formatSyncAge(lastUpdatedTs)}`;
    }

    const handleMeta = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail?.lastUpdated) {
            lastUpdatedTs = detail.lastUpdated;
            update();
        }
    };

    window.addEventListener(CORE_EVENTS.SHOP_RESTOCK_META_UPDATED, handleMeta as EventListener);

    // Initial check
    update();
    updateButton();

    refreshTimer = window.setInterval(() => {
        update();
        updateButton();
    }, 5000);

    root.append(left, right);

    return {
        root,
        destroy() {
            if (refreshTimer) window.clearInterval(refreshTimer);
            window.removeEventListener(CORE_EVENTS.SHOP_RESTOCK_META_UPDATED, handleMeta as EventListener);
        }
    };
}
