import { element } from '../../styles/helpers';
import { Card } from '../../components/Card/Card';

interface LogEntry {
    type: string;
    direction: 'in' | 'out';
    timestamp: number;
    payload: any;
    summary: string;
}

const MAX_LOGS = 100;
const logs: LogEntry[] = [];
let onLogUpdate: (() => void) | null = null;

export function WSLogger(): HTMLElement {
    const container = element('div', {
        className: 'ws-logger',
        style: 'display: flex; flex-direction: column; gap: 8px; font-family: monospace; font-size: 11px; height: 100%; overflow: hidden;'
    });

    const header = element('div', {
        style: 'display: flex; justify-content: space-between; align-items: center; padding: 0 4px;'
    });
    header.appendChild(element('span', { textContent: 'Live Traffic (Last 100)', style: 'opacity: 0.6;' }));
    const clearBtn = element('button', {
        textContent: 'Clear',
        style: 'background: none; border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; padding: 2px 8px; border-radius: 4px; font-size: 10px;',
        onclick: () => {
            logs.length = 0;
            renderLogs();
        }
    });
    header.appendChild(clearBtn);
    container.appendChild(header);

    const scrollArea = element('div', {
        style: 'flex: 1; overflow-y: auto; background: #000; padding: 4px; border-radius: 4px; border: 1px solid var(--border-color); display: flex; flex-direction: column;'
    });

    const inspectorArea = element('div', {
        style: 'height: 150px; border-top: 1px solid var(--border-color); overflow: auto; background: rgba(0,0,0,0.5); padding: 8px; display: none;'
    });
    const inspectorContent = element('pre', {
        style: 'margin: 0; color: var(--color-primary); font-size: 10px;'
    });
    inspectorArea.appendChild(inspectorContent);

    const renderLogs = () => {
        scrollArea.innerHTML = '';
        logs.slice().reverse().forEach(log => {
            const row = element('div', {
                className: 'ws-log-row',
                style: `padding: 4px; border-bottom: 1px solid #111; cursor: pointer; color: ${log.direction === 'in' ? '#4CAF50' : '#2196F3'}; display: flex; gap: 8px;`
            });

            const time = new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            row.appendChild(element('span', { textContent: time, style: 'opacity: 0.4; flex-shrink: 0;' }));
            row.appendChild(element('strong', { textContent: log.direction.toUpperCase(), style: 'width: 25px; flex-shrink: 0;' }));
            row.appendChild(element('span', { textContent: log.type, style: 'font-weight: bold; flex-shrink: 0;' }));
            row.appendChild(element('span', { textContent: log.summary, style: 'opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' }));

            row.addEventListener('click', () => {
                const rows = scrollArea.querySelectorAll('.ws-log-row');
                rows.forEach(r => (r as HTMLElement).style.background = '');
                row.style.background = 'rgba(255,255,255,0.1)';

                inspectorArea.style.display = 'block';
                inspectorContent.textContent = JSON.stringify(log.payload, null, 2);
            });

            scrollArea.appendChild(row);
        });
    };

    onLogUpdate = renderLogs;
    container.appendChild(scrollArea);
    container.appendChild(inspectorArea);
    renderLogs();

    return container;
}

// Hook into WebSocket API to populate logs
export function pushWSLog(direction: 'in' | 'out', type: string, payload: any) {
    let summary = '';

    // Smart summary extraction
    if (payload && typeof payload === 'object') {
        // Special handling for PartialState
        if (type === 'PartialState') {
            const op = payload.op || '';
            const path = payload.path || '';
            let valStr = '';
            if ('value' in payload) {
                const v = payload.value;
                valStr = typeof v === 'object' ? `{${Object.keys(v || {}).slice(0, 2).join(',')}}` : String(v);
            }
            if (op || path) {
                summary = `PartialState : ${op} ${path} ${valStr}`.trim();
            } else {
                const keys = Object.keys(payload).filter(k => k !== 'type');
                if (keys.length > 0) summary = `PartialState - {${keys.join(', ')}}`;
            }
        }

        if (!summary && payload.event) summary += `${payload.event} `;
        if (!summary && payload.op) summary += `op:${payload.op} `;

        if (!summary && payload.data) {
            const keys = Object.keys(payload.data);
            if (keys.length > 0) summary += `{${keys.slice(0, 3).join(',')}${keys.length > 3 ? '...' : ''}}`;
        } else if (!summary && Array.isArray(payload)) {
            summary += `[${payload.length} items]`;
        }
    } else if (typeof payload === 'string') {
        summary = payload.slice(0, 50);
    }

    logs.push({
        direction,
        type: String(type),
        timestamp: Date.now(),
        payload,
        summary: summary.trim() || '-'
    });

    if (logs.length > MAX_LOGS) logs.shift();
    if (onLogUpdate) onLogUpdate();
}
