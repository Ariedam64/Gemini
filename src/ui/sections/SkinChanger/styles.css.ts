export const skinChangerCss = `
.skin-grid {
  display: grid;
  gap: 12px;
}

.capture-controls{
  display:grid;
  gap:10px;
}

.capture-row{
  display:flex;
  gap:8px;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
}

.capture-actions{
  display:flex;
  gap:8px;
  align-items:center;
}

.capture-grid{
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap:12px;
}

.cap-card{
  display:grid;
  grid-template-columns: 64px 1fr;
  gap:12px;
  align-items:start;
}

.cap-preview{
  width:64px;
  height:64px;
  border-radius:14px;
  background: var(--soft);
  border: 1px solid var(--border);
  display:grid;
  place-items:center;
  overflow:hidden;
}

.cap-preview canvas{ width:100%; height:100%; display:block; }

.cap-meta{
  display:grid;
  gap:6px;
  min-width:0;
}

.cap-key{
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size:12px;
  opacity:.85;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.cap-sub{
  font-size:12px;
  opacity:.75;
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 12px;
}

.skin-card {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 12px;
  align-items: start;
}

.skin-preview {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  background: var(--soft);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.skin-preview canvas{
  display:block;
  width: 100%;
  height: 100%;
}

.skin-right {
  display: grid;
  gap: 8px;
}

.skin-title {
  font-weight: 650;
  line-height: 1.1;
}

.skin-sub {
  font-size: 12px;
  opacity: 0.75;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skin-controls {
  display: grid;
  gap: 10px;
}

.skin-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.hint {
  font-size: 12px;
  opacity: 0.75;
  line-height: 1.3;
}
`;
