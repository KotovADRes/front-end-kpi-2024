'use client';

export default function Image({ src, alt, scale }) {
    return (
        <div style={{ overflow: 'hidden' }}>
            <img
                src={src}
                alt={alt}
                style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 0.2s',
                    height: 'auto',
                }}
            />
        </div>
    );
}