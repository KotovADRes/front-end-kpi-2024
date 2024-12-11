'use client';

export default function ImageGallery({ images }) {
    return (
        <div>
            {images.map((img) => (
                <div key={img.id} style={{ overflow: 'hidden' }}>
                    <img
                        src="Mys-Fontan-aerial-2.jpg"
                        alt="Одеса з висоти"
                        style={{
                            transform: `scale(${img.scale})`,
                            transition: 'transform 0.2s',
                            height: 'auto',
                        }}
                    />
                </div>
            ))}
        </div>
    );
}