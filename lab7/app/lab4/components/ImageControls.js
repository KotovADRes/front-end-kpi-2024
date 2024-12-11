'use client';

export default function ImageControls({ onAdd, onZoomIn, onZoomOut, onDelete, canDelete, canZoomIn, canZoomOut }) {
    return (
        <div>
            <button onClick={onAdd}>Додати</button>
            <button onClick={onZoomIn} disabled={!canZoomIn}>Збільшити</button>
            <button onClick={onZoomOut} disabled={!canZoomOut}>Зменшити</button>
            <button onClick={onDelete} disabled={!canDelete}>Видалити</button>
        </div>
    );
}