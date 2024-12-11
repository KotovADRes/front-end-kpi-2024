'use client';

import React, { Component } from 'react';
import ToggleList from './ToggleList';
import ImageGallery from './ImageGallery';
import ImageControls from './ImageControls';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [{ id: 1, scale: 1 }],
        };
    }

    addImage = () => {
        this.setState((prevState) => ({
            images: [...prevState.images, { id: prevState.images.length + 1, scale: 1 }],
        }));
    };

    zoomIn = () => {
        this.setState((prevState) => {
            const images = [...prevState.images];
            if (images.length) {
                const last = images[images.length - 1];
                const newScale = Math.min(last.scale + 0.1, 2);
                images[images.length - 1] = { ...last, scale: newScale };
            }
            return { images };
        });
    };

    zoomOut = () => {
        this.setState((prevState) => {
            const images = [...prevState.images];
            if (images.length) {
                const last = images[images.length - 1];
                const newScale = Math.max(last.scale - 0.1, 1);
                images[images.length - 1] = { ...last, scale: newScale };
            }
            return { images };
        });
    };

    deleteImage = () => {
        this.setState((prevState) => ({
            images: prevState.images.length > 1 ? prevState.images.slice(0, -1) : prevState.images,
        }));
    };

    render() {
        const { images } = this.state;
        const hasImages = images.length > 0;
        const lastImageScale = hasImages ? images[images.length - 1].scale : 1;
        const canDelete = images.length > 1;
        const canZoomIn = hasImages && lastImageScale < 2;
        const canZoomOut = hasImages && lastImageScale > 1;

        return (
            <main>
                <ToggleList
                    title="Хоббі"
                    items={["Web-розробка", "Комп'ютерні ігри", "Нейромережі"]}
                    reverseColors={false}
                />

                <ToggleList
                    title="Улюбленні LLM"
                    items={["ChatGPT-4o", "Meta Llama 3.1", "Command R+"]}
                    reverseColors={true}
                />

                <ImageGallery images={images} />

                <ImageControls
                    onAdd={this.addImage}
                    onZoomIn={this.zoomIn}
                    onZoomOut={this.zoomOut}
                    onDelete={this.deleteImage}
                    canDelete={canDelete}
                    canZoomIn={canZoomIn}
                    canZoomOut={canZoomOut}
                />
            </main>
        );
    }
}