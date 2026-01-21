/**
 * Avatar Section Styles
 * Scoped styles for the Avatar customization and loadout UI.
 */

export const avatarStyles = `
    .avatar-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        padding: var(--spacing-sm);
        height: 100%;
        overflow-y: auto;
    }

    .avatar-main-layout {
        display: flex;
        gap: var(--spacing-lg);
        flex-wrap: wrap;
        margin-bottom: var(--spacing-lg);
        min-height: 200px;
    }

    .avatar-slots-column {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        width: 130px;
        flex-shrink: 0;
    }

    .avatar-preview-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .avatar-preview-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-height: 320px;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        position: relative;
        overflow: hidden;
        padding: var(--spacing-md);
    }

    .avatar-selection-area {
        margin-top: var(--spacing-sm);
    }

    .avatar-items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: var(--spacing-sm);
        max-height: 300px;
        overflow-y: auto;
        padding: var(--spacing-xs);
        scrollbar-width: thin;
    }

    .avatar-item-btn {
        cursor: pointer;
        padding: var(--spacing-sm);
        border-radius: var(--radius-md);
        background: var(--color-bg-tertiary);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        border: 2px solid transparent;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        min-height: 90px;
        justify-content: center;
        position: relative;
    }

    .avatar-item-btn:hover {
        background: var(--color-bg-hover);
        transform: translateY(-2px);
    }

    .avatar-item-btn.active {
        background: var(--color-bg-active);
        border-color: var(--color-primary);
        box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
    }

    .avatar-item-img {
        width: 56px;
        height: 56px;
        object-fit: contain;
        transform: scale(1.1);
    }

    .avatar-item-label {
        font-size: 10px;
        text-align: center;
        opacity: 0.8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        font-weight: 500;
    }

    .avatar-loadouts-area {
        margin-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        padding-top: var(--spacing-md);
    }

    .avatar-loadouts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: var(--spacing-sm);
        margin-top: var(--spacing-sm);
    }

    .loadout-card {
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        transition: all 0.2s ease;
        min-width: 160px;
    }

    .loadout-card:hover {
        border-color: var(--color-primary-soft);
        background: var(--color-bg-hover);
    }

    .loadout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .loadout-name {
        font-size: var(--font-size-md);
        font-weight: 600;
        color: var(--color-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
    }

    .loadout-actions {
        display: flex;
        gap: var(--spacing-xs);
    }

    .icon-btn {
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        opacity: 0.6;
        transition: opacity 0.2s ease;
    }

    .icon-btn:hover {
        opacity: 1;
        background: rgba(255,255,255,0.1);
    }

    .loadout-wear-btn {
        margin-top: var(--spacing-xs);
    }

    .avatar-action-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        margin-top: auto;
        padding-top: var(--spacing-md);
    }

    .loadout-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
    }

    .loadout-title {
        margin: 0;
        font-size: var(--font-size-md);
        font-weight: 600;
        color: var(--color-text);
    }

    .avatar-preview-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        max-width: 320px;
        max-height: 320px;
        pointer-events: none;
        object-fit: contain;
        transition: transform 0.2s ease-out;
    }

    .none-placeholder {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        opacity: 0.5;
    }

    /* Mini Preview Styles */
    .loadout-mini-preview {
        position: relative;
        width: 100%;
        height: 120px;
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-sm);
        overflow: hidden;
        margin-bottom: var(--spacing-xs);
        border: 1px solid var(--color-border-soft);
    }

    .loadout-mini-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        object-fit: contain;
    }

    /* Name Input Styles */
    .loadout-name-input {
        width: 100%;
    }

    .loadout-name-input .lg-input-wrap {
        border-bottom: 2px solid var(--color-primary-soft);
        border-radius: 0;
    }

    .loadout-name-input input {
        background: transparent !important;
        border: none !important;
        padding: 4px 0 !important;
        font-weight: 600 !important;
        color: var(--color-text) !important;
        font-size: var(--font-size-md) !important;
    }
`;
